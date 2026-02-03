import Header from './header'
import Footer from './footer'
import { Analytics } from '@vercel/analytics/react'
import { useRouter } from 'next/router'

const BasicLayout = ({ children }: { children: any }) => {
  const router = useRouter()
  const isHome = router.pathname === '/'

  return (
    <div className={isHome ? 'relative min-h-screen bg-black text-white' : ''}>
      <Header />
      {isHome ? (
        children
      ) : (
        <div className="py-16 flex justify-center min-h-screen bg-gray-50 px-2">
          <div className="max-w-5xl w-screen">
            {children}
            <Footer />
          </div>
        </div>
      )}
      <Analytics />
    </div>
  )
}

export default BasicLayout