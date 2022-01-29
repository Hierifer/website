import { NextPage } from 'next'
import { Divider } from '@arco-design/web-react';

const Home: NextPage = () => {
    return (
      <div>
        <div className="text-xl mb-4 font-bold leading-6">
          关于 NEO-HEX 研究所
        </div>

        <div className="font-light leading-8">
          NEO-HEX 研究所是由一群爱好开源和分享的小伙伴们组成的兴趣小组。我们致力于为生活创造一些乐趣和改变。其内容形式包括（但不限于）博客文章，项目代码分享，游戏 Demo。通过
          这些形式我们会讨论「自然语言处理」，「计算机图形学」，「产品设计」等多领域的知识和想法，也会讨论一些人生哲学的问题和小说。总而言之，这是一个内容繁杂的内容平台。希望
          「有缘人」们能在这里激起有趣的想法，并和我们交流。
        </div>

        <Divider />
      </div>
    )
  }
  
  export default Home
  