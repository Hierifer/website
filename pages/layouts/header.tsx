import { NextPage } from 'next'
import { IconRightCircle } from "@arco-design/web-react/icon"
import { useRouter } from 'next/router'
import { Menu } from '@arco-design/web-react';


const Header: NextPage = () => {
    const router = useRouter()
    const MenuItem = Menu.Item

    return (
        <div className="h-12 w-screen bg-grey-1 bg-opacity-80 backdrop-blur-sm fixed top-0 left-0 z-50 flex justify-center items-center">
            <div className="max-w-5xl w-screen flex justify-between items-center">
                <div>
                    <IconRightCircle />
                </div>

                <div className="w-48 flex justify-between items-center">
                    {/* <Menu className="h-12 bg-grey-1" mode='horizontal' defaultSelectedKeys={['1']}>
                        <MenuItem key='0'>Home</MenuItem>
                        <MenuItem key='1'>Solution</MenuItem>
                        <MenuItem key='2'>Cloud Service</MenuItem>
                    </Menu> */}
                    <a className="cursor-pointer" onClick={() => router.push('/articles', undefined, { shallow: true })}>
                        文章
                    </a>
                    <a className="cursor-pointer" onClick={() => router.push('/projects', undefined, { shallow: true })}>
                        项目
                    </a>
                    <a className="cursor-pointer" onClick={() => router.push('/about', undefined, { shallow: true })}>
                        关于
                    </a>
                </div>
            </div>
        </div>
    )
}

  
export default Header