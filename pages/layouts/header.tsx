import { NextPage } from 'next'
import { Icon } from '@arco-design/web-react'
import { useRouter } from 'next/router'

const baseMenuClass = 'font-semibold cursor-pointer transition-colors'
interface HeaderProps {}

const Header: NextPage<HeaderProps> = () => {
    const router = useRouter()
    const Iconfont = Icon.addFromIconFontCn({ src: '//at.alicdn.com/t/font_3166624_wqrg04cgej.js' })

    return (
        <div className="fixed top-0 left-0 z-50 flex w-screen justify-center bg-transparent px-6 py-4">
            <div className="flex w-screen max-w-5xl items-center justify-between">
                <a className="cursor-pointer" onClick={() => router.push('/', undefined, { shallow: true })}>
                    <Iconfont className="text-2xl text-white" type="icon-nh-logo" />
                </a>

                <div className="flex items-center space-x-8">
                    <a className={`${baseMenuClass} text-gray-100 hover:text-gray-300`} onClick={() => router.push('/articles', undefined, { shallow: true })}>
                        博客
                    </a>
                    <a className={`${baseMenuClass} text-gray-100 hover:text-gray-300`} onClick={() => router.push('/projects', undefined, { shallow: true })}>
                        项目
                    </a>
                    <a className={`${baseMenuClass} text-gray-100 hover:text-gray-300`} onClick={() => router.push('/about', undefined, { shallow: true })}>
                        关于
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Header