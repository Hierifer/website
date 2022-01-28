import { NextPage } from 'next'
import Header from './header'
import { OmitProps } from 'antd/lib/transfer/ListBody'

const BasicLayout: NextPage = ({ children }: {children: any}) => {
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