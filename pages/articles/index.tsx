import { NextPage } from 'next'
import fs from 'fs';
import matter from 'gray-matter';
import { List, Avatar, Image, Icon } from '@arco-design/web-react';
import { Input } from '@arco-design/web-react';
import {useState, useMemo, Fragment} from 'react';
import { useRouter } from 'next/router'


interface TAuthor {
  icon: string
  name: string
}

export const AUTHORS_DB: {
  [key: string]: TAuthor;
} = {
  'hh': {
    icon: 'https://avatars.githubusercontent.com/u/10717978?s=40&v=4',
    name: 'Hierifer Hu'
  },
  '': {
    icon: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
    name: '未署名'
  }
}

export async function getStaticProps() {
  const files = fs.readdirSync('contents');
  const posts = files.map((path) => {
    const fileName = path.replace('.md', '');
    const { data } = matter(fs.readFileSync(`contents/${path}`, 'utf-8'));
    let uid: string = data.uid || ''
    const userMeta = AUTHORS_DB[uid]

    return {
      fileName,
      title: data.title || fileName,
      slug: data.slug || fileName,
      author: userMeta.name || '未署名',
      icon: userMeta.icon || '',
      ctime: data.ctime || 0,
      cover: data.cover || '',
      coverReal: '',
      path
    };
  });

  return {
    props: {
      posts,
    },
  };
}

interface IMDFile{
  fileName: string
  title: string
  slug: string
  author: string
  icon: string
  ctime: number
  content: string
  path: string
  cover: string
  coverReal: string
}

const Articles: NextPage = (props:any) => {
  const InputSearch = Input.Search;

  const [search, setSearch] = useState('')

  const posts : IMDFile[] = props.posts || []

  const displayList = useMemo(() => {
    return search === ''? 
      posts.sort((i1, i2) => 
        new Date(i2.ctime).getTime() - new Date(i1.ctime).getTime()
      ) : posts.filter((post) => {
          return post.title.search(new RegExp(search, "i")) > -1
        })
        .sort((i1, i2) => new Date(i2.ctime).getTime() - new Date(i1.ctime).getTime()
      )
  },[search, posts])

  const total = useMemo(() => {
    return displayList.length
  },[])

  const RenderCover = (cover: IMDFile['cover'], index: number) => {
    // 简化的封面渲染，这里暂时不处理动态 import 的复杂逻辑，仅保留结构
    // 实际项目中建议将图片放入 public 目录引用
    return (
      <div className="mr-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
        <Iconfont type="icon-article" /> 
      </div>
    )
  }

  const Iconfont = Icon.addFromIconFontCn({ src: '//at.alicdn.com/t/font_3166624_wqrg04cgej.js' })

  return (
    <div className="min-h-[80vh] w-full px-4">
      {/* Search Header */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900">博客文章</h1>
        <p className="mb-8 text-gray-500">探索技术、设计与创意的交汇点</p>
        
        <div className="relative">
          <InputSearch
            allowClear
            size="large"
            className="w-full shadow-sm transition-shadow hover:shadow-md"
            onChange={setSearch}
            placeholder='搜索文章标题...'
            style={{ borderRadius: '8px', padding: '0 12px' }}
          />
          <div className="mt-3 text-right text-xs text-gray-400">
            共 <span className="font-medium text-blue-600">{total}</span> 篇内容
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="grid gap-6">
        {displayList.map((item, index) => (
          <div 
            key={index}
            className="group relative flex cursor-pointer items-start rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg"
            onClick={() => window.location.href = `./articles/${item.slug || item.fileName}`}
          >
            {/* Cover Placeholder or Image */}
            <div className="hidden sm:block">
               {RenderCover(item.cover, index)}
            </div>

            <div className="flex-1">
              <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-blue-600">
                {item.title}
              </h3>
              
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Avatar size={24}>
                    <img alt='avatar' src={item.icon} />
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">{item.author}</span>
                </div>
                
                {item.ctime && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                    <span className="text-sm text-gray-500">
                      {new Date(item.ctime).toLocaleDateString()}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Arrow Icon */}
            <div className="ml-4 flex h-full items-center text-gray-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-500">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}

        {displayList.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            没有找到相关文章
          </div>
        )}
      </div>
    </div>
  )
}
  
  export default Articles