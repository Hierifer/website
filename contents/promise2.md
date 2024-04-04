---
title: Promise 的理解
slug: promise2
uid: hh
ctime: 2024/02/02
---


## Promise 实质是一个 constructer 构建函数，通过 then 挂载回调函数在钩子内部

``` javascript
constructor(asyncFunc){
    status = 'pending'
        asyncFunc(onResolve, onReject) // 这里用户就可以手动挂载回调在异步函数上
    }
    onResolve(){
    status = 'onFullfill'
    queueMicroTask(thenFunction)
    }
    onReject(){
    status = 'onReject'
    queueMicroTask(catchFunction)
    }
    new Promise((resolve, reject) => {
    setTimeout(() => {
    resolve(0)
    },0)
})
```

### 整体而言
=>status='pending' -> asyncFunc -> setTimeout -> resolve(0) -> status= 'onFullfill' -> thenFunction
\
至此，异步问题通过上述代码已经解决，这其实是一个发布订阅模式，这种收集依赖 -> 触发通知 -> 取出依赖执行的方式，被广泛运用于发布订阅模式的实现。


### 手写一个 Promise
``` javascript
class MyPromise{
    constructor(asyncFunc){
        this.status = 'pending'
        this.value = undefined
        this.error = undefined
        this.succFuncQueue = []
        this.errFuncQueue = []

        let onResolve = (value) => {
            this.value = value
            this.status = 'onFullfill'
            queueMicrotask(() => {
                this.succFuncQueue.forEach((thenFunc) => {
                    thenFunc(value)
                })
            })
        }
        let onReject = (error) => {
            this.error = error
            this.status = 'onReject'
            this.errFuncQueue.forEach((thenFunc) => {
                queueMicrotask(() => {
                    thenFunc(error)
                })
            })
        }

        asyncFunc(onResolve, onReject)
    }
    then(onFullfill, onError){
        if(this.status === 'onFullfill'){
            onFullfill(this.value)
        }
        if(this.status === 'onReject'){
            onError(this.error)
        }
        if(this.status === 'pending'){
            this.succFuncQueue.push(onFullfill)
            this.errFuncQueue.push(onError)
        }

    }
    catch(onError){
        this.errFuncQueue.push(onError)
    }
}

// const promise = new Promise((resolve, reject) => {
//     resolve('成功');
// }).then((data) => {
//     console.log('success', data)
//     },(err) => {
//         console.log('faild', err)
//     }
// )

const promise = new Promise((resolve, reject) => {
    // 传入一个异步操作
        setTimeout(() => {
            resolve('成功');
        },1000);
    }).then(
        (data) => {
            console.log('success', data)
        },
        (err) => {
            console.log('faild', err)
        }
    )
```


### 实现锁的逻辑
``` javascript
let lock = false
let notify = () => {}

let gen = () => {
    return new Promise((resolve, reject) => {
        if(lock){
            notify = resolve
            console.log("locked here")
        } else {
            lock = true
            setTimeout(() => {
                lock = false
                resolve(1)
                notify(2)
            },3000)
        }
    })
}

gen().then((msg) => {
    console.log('lock')
    console.log(msg)
})
gen().then((msg) => {
    console.log('notify')
    console.log(msg)
})
```
