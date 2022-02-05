import { NextPage } from 'next'
import fs from 'fs';
import matter from 'gray-matter';
import { List, Avatar } from '@arco-design/web-react';
import { Input } from '@arco-design/web-react';
import {useState} from 'react';
import { useRouter } from 'next/router'

const AUTHORS_DB: {
  [key: string]: any;
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
    const { data, content } = matter(fs.readFileSync(`contents/${path}`, 'utf-8'));
    let uid: string = data.uid || ''
    const userMeta = AUTHORS_DB[uid]

    return {
      fileName,
      title: data.title || fileName,
      slug: data.slug || fileName,
      author: userMeta.name || '未署名',
      icon: userMeta.icon || '',
      ctime: data.ctime || 0,
      content,
      path
    };
  });

  return {
    props: {
      posts,
    },
  };
}

const Articles: NextPage = (props: any) => {
  const InputSearch = Input.Search;
  const [search, setSearch] = useState('')
  const posts : any[] = props.posts

  const displayList: () => any[] = () => {
    return search === ''? posts : posts.filter((post) => post.slug === search).sort((i1, i2) => i1.ctime - i2.ctime)
  }
    return (
      <div>
        <div className="mb-4 bg-white p-4">
          <div className="mb-4 font-bold text-gray-600">
            文章搜素
          </div>
          
          <InputSearch
            allowClear
            className="mb-4"
            onChange={setSearch}
            placeholder='Enter keyword to search'
          />

          <List 
            virtualListProps={{
              height: 560,
            }}
            dataSource={displayList()}
            render={(item, index) => (
              <List.Item key={index}>
                <div className="flex items-center">
                  <Avatar shape='square' size={44} className="mr-4">
                    文章
                  </Avatar>
                  <div>
                    <div className="mb-2">
                      <a target="_blank" href={`./articles/${item.slug || item.fileName}`} className="hover:text-blue-700 text-lg">{item.title}</a>
                    </div>
                    
                    <div className="flex text-sm ">
                      <div className="flex mr-2">
                        <Avatar size={22} className="mr-1"><img alt='avatar' src={item.icon} /></Avatar>
                        <span className="text-gray-700">{item.author}</span>
                      </div>
                      {
                        (() => {
                          return item.ctime? (<span className="text-gray-500">创建于 {new Date(item.ctime).toDateString()}</span>) : (<></>)
                        })()
                      }
                    </div>
                  </div>
                </div>
              </List.Item>
             )} 
            />
        </div>
      </div>
    )
  }
  
  export default Articles