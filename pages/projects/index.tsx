import { NextPage } from 'next'
const { Meta } = Card;
import { Card, Avatar, Typography } from '@arco-design/web-react';
import { IconThumbUp, IconShareInternal, IconMore } from '@arco-design/web-react/icon';

const Project: NextPage = () => {
    return (
        <div className='grid grid-cols-3 gap-y-5'>
            {
                [1,2,3,4,5].map((index) => {
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
                                <img
                                style={{ width: '100%', transform: 'translateY(-20px)' }}
                                alt='dessert'
                                src='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp'
                                />
                            </div>
                            }
                            actions={[
                            <span className='icon-hover'>
                                <IconThumbUp />
                            </span>,
                            <span className='icon-hover'>
                                <IconShareInternal />
                            </span>,
                            <span className='icon-hover'>
                                <IconMore />
                            </span>,
                            ]}
                        >
                            <Meta
                            avatar={
                                <div style={{ display: 'flex', alignItems: 'center', color: '#1D2129' }}>
                                <Avatar size={24} style={{ marginRight: 8 }}>
                                    A
                                </Avatar>
                                <Typography.Text>Username</Typography.Text>
                                </div>
                            }
                            title='Card Title'
                            description='This is the description'
                            />
                        </Card>
                    )
                })
            }
        </div>
    )
}
  
export default Project