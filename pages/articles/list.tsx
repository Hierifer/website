import { NextPage } from 'next'
import fs from 'fs';
import matter from 'gray-matter';
import { List, Avatar } from '@arco-design/web-react';
import { Input } from '@arco-design/web-react';
import { useRouter } from 'next/router'

export async function getStaticProps() {
  const files = fs.readdirSync('contents');
  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`contents/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
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
  const posts : any[] = props.posts
    return (
      <div>
        <div className="mb-4">
          <div className="mb-2">
            文章搜素
          </div>
          
          <InputSearch
            allowClear
            placeholder='Enter keyword to search'
          />
        </div>
        <List 
          virtualListProps={{
            height: 560,
          }}
          dataSource={posts}
          render={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                avatar={
                  <Avatar shape='square'>
                    A
                  </Avatar>
                }
                title={JSON.stringify(item)}
              />
            </List.Item>
          )} 
          />
        
      </div>
    )
  }
  
  export default Articles
  