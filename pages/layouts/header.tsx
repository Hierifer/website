import { NextPage } from 'next'
import { Icon } from '@arco-design/web-react'
import { useRouter } from 'next/router'


const Header: NextPage = () => {
    const router = useRouter()
    const Iconfont = Icon.addFromIconFontCn({src: '//at.alicdn.com/t/font_3166624_wqrg04cgej.js'});
    const menuItemClass = 'font-semibold cursor-pointer text-gray-50 hover:text-gray-300'
    return (
        <div className="h-12 p-4 w-screen bg-blue-800 bg-opacity-80 backdrop-blur-sm fixed top-0 left-0 z-50 flex justify-center items-center">
            <div className="max-w-5xl w-screen flex items-center">
                <a className="cursor-pointer mr-12" onClick={() => router.push("/", undefined, { shallow: true })}>
                    <Iconfont className="text-2xl translate-y-0.5" type="icon-nh-logo" />
                </a>

                <div className="w-48 flex justify-between items-center ">
                    <a className={menuItemClass} onClick={() => router.push('/articles', undefined, { shallow: true })}>
                        博客
                    </a>
                    <a className={menuItemClass} onClick={() => router.push('/projects', undefined, { shallow: true })}>
                        项目
                    </a>
                    <a className={menuItemClass} onClick={() => router.push('/about', undefined, { shallow: true })}>
                        关于
                    </a>
                </div>
            </div>
        </div>
    )
}

  
export default Header