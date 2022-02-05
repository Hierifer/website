import { NextPage } from 'next'
import { Divider } from '@arco-design/web-react';
import { Card, Avatar, Typography } from '@arco-design/web-react';

const Home: NextPage = () => {
    return (
      <div>
        <div className="text-xl my-6 font-bold leading-6">
          关于 NEO-HEX
        </div>

        <div className="font-light leading-8">
          NEO-HEX 是由一群爱好创造和分享的人组成的兴趣小组。我们致力于为生活创造一些乐趣和改变，会分享一些博客文章，项目代码分享，游戏 Demo。通过
          这些方式，我们会讨论各种各样的话题。欢迎大家和我们交流。
        </div>

        <Divider />

        <Card
          hoverable
          className='card-with-icon-hover w-full max-w-xs'
        >
          <Avatar />
        </Card>
      </div>
    )
  }
  
  export default Home
  