import { NextPage } from 'next'
import { List, Avatar } from '@arco-design/web-react';
import { Input } from '@arco-design/web-react';

const Articles: NextPage = () => {
  const InputSearch = Input.Search;

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
          dataSource={new Array(10000).fill(null).map((_, index) => {
            const prefix = `0000${index}`.slice(-5);
            return {
              title: 'Beijing Bytedance Technology Co., Ltd.',
              description: `(${prefix}) Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.`,
            };
          })}
          render={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                avatar={
                  <Avatar shape='square'>
                    A
                  </Avatar>
                }
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    )
  }
  
  export default Articles
  