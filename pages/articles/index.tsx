import { NextPage } from 'next'
import fs from 'fs';
import matter from 'gray-matter';
import { List, Avatar } from '@arco-design/web-react';
import { Input } from '@arco-design/web-react';
import {useState} from 'react';
import { useRouter } from 'next/router'

export async function getStaticProps() {
  const files = fs.readdirSync('contents');
  const posts = files.map((path) => {
    const fileName = path.replace('.md', '');
    const { data, content } = matter(fs.readFileSync(`contents/${path}`, 'utf-8'));
    let ctime;

    return {
      fileName,
      data,
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
    return search === ''? posts : posts.filter((post) => post.slug === search)
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
                <Avatar shape='square' className="mr-4">
                  A
                </Avatar>
                <a target="_blank" href={`./articles/${item.fileName}`} className="hover:text-blue-700">{item.fileName}</a>
              </List.Item>
             )} 
            />
        </div>
      </div>
    )
  }
  
  export default Articles