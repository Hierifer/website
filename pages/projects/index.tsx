import { NextPage } from 'next'
const { Meta } = Card;
import { Card } from '@arco-design/web-react';

<<<<<<< Updated upstream
const BasicLayout: NextPage = () => {
    return (
        <Card
            hoverable
            style={{ width: 360 }}
            cover={
            <div
                style={{
                height: 204,
                overflow: 'hidden',
                }}
            >
                <img
                style={{ width: '100%', transform: 'translateY(-20px)' }}
                alt='dessert'
                src='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp'
                />
            </div>
            }
        >
        <Meta
            title='Card Title'
            description={
                <>
                Card content <br /> Card content
                </>
=======
const USERS_JSON: {[key: string]: {icon: string, name: string}} = {
    'hh': {
        icon: 'https://avatars.githubusercontent.com/u/10717978?s=40&v=4',
        name: 'Hierifer Hu'
    },
}

const PROJECTS_JSON = [
    {
        name: 'H5 游戏',
        desc: '正在 build, 点击图片进入',
        link: 'https://games.neo-hex.com',
        creator: 'hh',
    },
    {
        name: '产品设计日志',
        desc: '',
        creator: 'hh',
    },
    {
        name: 'Element 12.5th',
        desc: '',
        creator: 'hh'
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
>>>>>>> Stashed changes
            }
        />
    </Card>
    )
}
  
export default BasicLayout