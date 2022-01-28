import { NextPage } from 'next'
import Header from './header'

const BasicLayout: any = ({ children }: {children: any}) => {
    return (
      <div>
        <Header>
        </Header>
        <p className="text-3xl font-bold underline">
            Hello world!
        </p>
        {children}
      </div>
    )
  }
  
export default BasicLayout