import Header from './header'
import Footer from './footer'
import { Analytics } from "@vercel/analytics/react"

const BasicLayout = ({ children }: {children: any}) => {
    return (
      <div>
        <Header />
        <div className="py-16 flex justify-center min-h-screen bg-gray-50 px-2">
            <div className=" max-w-5xl w-screen ">
                {children}
            </div>
            <Footer />
        </div>
        <Analytics />
      </div>
    )
  }
  
export default BasicLayout