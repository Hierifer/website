import { NextPage } from 'next'
const { Meta } = Card;
import { Card, Avatar, Typography } from '@arco-design/web-react';
import { IconThumbUp, IconShareInternal, IconMore } from '@arco-design/web-react/icon';
import { REPL_MODE_STRICT } from 'repl';

const USERS_JSON: {[key: string]: {icon: string, name: string}} = {
    'hh': {
        icon: 'https://avatars.githubusercontent.com/u/10717978?s=40&v=4',
        name: 'Hierifer Hu'
    },
}

const PROJECTS_JSON = [
    {
        name: '雷电 2077',
        desc: 'Tensorflow 加成下的雷电游戏',
        link: 'https://raiden2077.neo-hex.com',
        creator: 'hh',
    },
    {
        name: '视差展示页',
        desc: '有趣的时差展示',
        link: 'https://archive.neo-hex.com',
        creator: 'hh',
    }
]

const Project: NextPage = () => {
    return (
        <div className='grid gap-y-5 justify-self-center' style={{gridTemplateColumns: `repeat(auto-fill, minmax(20rem, 1fr))`}}>
            {
                PROJECTS_JSON.map((item, index) => {
                    return (
                        <Card
                            hoverable
                            className='card-with-icon-hover w-full max-w-xs'
                            key={index}
                            cover={
                                <div
                                    style={{
                                    height: 204,
                                    overflow: 'hidden',
                                    }}
                                >
                                    <a target="_blank" href={item.link}>
                                        <img
                                            style={{ width: '100%', transform: 'translateY(-20px)' }}
                                            alt='dessert'
                                            src='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp'
                                        />
                                    </a>
                                </div>
                            }
                            // actions={[
                            // <span className='icon-hover'>
                            //     <IconThumbUp />
                            // </span>,
                            // <span className='icon-hover'>
                            //     <IconShareInternal />
                            // </span>,
                            // <span className='icon-hover'>
                            //     <IconMore />
                            // </span>,
                            // ]}
                        >
                            <div>
                                <div className='font-bold'>
                                    {item.name}
                                </div>
                                <div className="text-gray300 h-10">
                                    {item.desc}
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', color: '#1D2129' }}>
                                        <Avatar size={24} style={{ marginRight: 8 }}>
                                        <img alt='avatar' src={USERS_JSON[item.creator].icon} />
                                        </Avatar>
                                        <Typography.Text>{USERS_JSON[item.creator].name}</Typography.Text>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )
                })
            }
        </div>
    )
}
  
export default Project