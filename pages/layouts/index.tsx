import { NextPage } from 'next'
import Header from './header'
import Footer from './footer'

const BasicLayout: any = ({ children }: {children: any}) => {
    return (
      <div>
        <Header />
        <div className="mt-16 flex justify-center">
            <div className=" max-w-5xl w-screen">
                {children}
            </div>
        </div>
        <Footer />
      </div>
    )
  }
  
export default BasicLayout