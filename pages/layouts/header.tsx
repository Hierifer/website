import { NextPage } from 'next'
import { Icon } from '@arco-design/web-react'
import { useRouter } from 'next/router'


const Header: NextPage = () => {
    const router = useRouter()
    const Iconfont = Icon.addFromIconFontCn({src: '//at.alicdn.com/t/font_3166624_wqrg04cgej.js'});
    const menuItemClass = 'font-semibold cursor-pointer text-gray-600 hover:text-sky-600'
    return (
        <div className="h-12 w-screen bg-grey-1 bg-opacity-80 backdrop-blur-sm fixed top-0 left-0 z-50 flex justify-center items-center">
            <div className="max-w-5xl w-screen flex justify-between items-center">
                <div>
                    <a className="cursor-pointer" onClick={() => router.push("/", undefined, { shallow: true })}>
                        <Iconfont style={{width:'1.8rem', height: '1.8rem'}} type="icon-nh-logo" />
                    </a>
                </div>

                <div className="w-48 flex justify-between items-center">
                    <a className={menuItemClass} onClick={() => router.push('/articles/list', undefined, { shallow: true })}>
                        文章
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