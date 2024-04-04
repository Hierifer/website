---
title: Promise 的封装
slug: promise
uid: hh
ctime: 2024/02/02
---

## Promise 对异步的封装

### 实现发送缓存

``` javascript
let cache = {}
let waitingCallback = {}

function cfetch(url, data){
   return new Promise((res, rej) =>{
        setTimeout(() => {
            res(`fetch: ${url},${JSON.stringify(data)}`)
        } , 3000)
    })
}

function cachedFetch(url, data){  
    return new Promise((resolve, reject) => {
        let tmp = JSON.stringify(data)
        if(cache[`${url}${tmp}`] && cache[`${url}${tmp}`] !== 'pending'){
            resolve(cache[`${url}${tmp}`])
            return
        }
        if(cache[`${url}${tmp}`] === 'pending'){
            if(waitingCallback[`${url}${tmp}`]){ 
                waitingCallback[`${url}${tmp}`].push(resolve)
            } else {
                waitingCallback[`${url}${tmp}`] = [resolve]
            }
        } else {
            cache[`${url}${tmp}`] = 'pending'
            cfetch(url, data).then((res) => {
                cache[`${url}${tmp}`] = res
                resolve(cache[`${url}${tmp}`])   
                // boardcast
                if(waitingCallback[`${url}${tmp}`]){
                    waitingCallback[`${url}${tmp}`].forEach((fn) => {
                        fn(res)
                    })
                }
                     
            }).catch((e) => {
                reject(e)
            })
        }
    })
}
cachedFetch('baidu.com', {'d': 1, 'c': 2}).then((res) => {
    console.log("1")
    console.log(res)
})
cachedFetch('baidu.com', {'d': 1, 'c': 2}).then((res) => {
    console.log("2")
    console.log(res)
})

setTimeout(() => {
    cachedFetch('baidu.com', {'d': 1, 'c': 2}).then((res) => {
        console.log("3")
        console.log(res)
    })
},4000)
```


### 实现调度器

``` javascript
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

class Scheduler {
  constructor(limit) {
    this.limit = limit;
    this.ongoingCount = 0;
    this.allQue = [];
  }
  addTask(taskCreator) {
    return new Promise((resolve, reject) => {
      let tmp = () => {
        return taskCreator().then((res) => {
          // 当完成的时候，通知其他调度器执行下一个
          this.ongoingCount--;
          this._run();
          resolve(res);
        });
      }
    
      this.allQue.push(tmp);
      this._run();
    })
  }
  // 尝试执行等待的函数
  _run() {
    if (this.ongoingCount >= this.limit) {
      // wait
      return;
    } else {
      while (this.ongoingCount < this.limit && this.allQue.length > 0) {
        let fn = this.allQue.shift();
        fn();
        this.ongoingCount++;
      }
    }
  }
}

// 创建一个并发量上限为 2 的调度器
const scheduler = new Scheduler(2);

scheduler
  .addTask(() => {
    return sleep(1000).then(() => 1);
  })
  .then((res) => {
    // 预期结果为 1
    // 第 1 秒输出结果
    console.log(res);
  });

scheduler
  .addTask(() => {
    return sleep(3000).then(() => 2);
  })
  .then((res) => {
    // 预期结果为 2
    // 第 3 秒输出结果
    console.log(res);
  });

scheduler
  .addTask(() => {
    return sleep(2000).then(() => 3);
  })
  .then((res) => {
    // 预期结果为 3
    // 第 3 秒输出结果
    console.log(res);
  });
```

### 实现重发

``` javascript
function cfetch(url, data, countdown){
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            if(countdown < 2){
                console.log("resolve")
                resolve("Hello OK")
            } else {
                console.log("rejected")
                reject("Error: timeout")
            }
        } , 3000)
    })
}

// 实现重发
function resend(url, params){
    const helper = function(url, params, countdown){
        console.log("tryed", countdown)
        if(countdown < 0){
            return Promise.reject("timeout")
        }
        return new Promise((resolve, reject) => {
            cfetch(url, params, countdown).then((res) => {
                resolve(res)
            }).catch((e) => {
                setTimeout(()=>{
                    helper(url, params, countdown-1).then((res) => {
                        resolve(res)
                    }, (rej) => {
                        reject(rej)
                    })
                }, 500)
            })     
        })
    }
    return helper(url, params, 3)
}
resend('baidu.com', {'d': 1, 'c': 2}).then((res) => {
    console.log('cb', res)
}).catch((e) => {
    console.log('err', e)
})
```