import { NextPage } from 'next'
import Header from './header'
import Footer from './footer'

const BasicLayout: any = ({ children }: {children: any}) => {
    return (
      <div>
        <Header />
        <div className="py-16 flex justify-center min-h-screen bg-gray-50">
            <div className=" max-w-5xl w-screen ">
                {children}
            </div>
            <Footer />
        </div>
      </div>
    )
  }
  
export default BasicLayout