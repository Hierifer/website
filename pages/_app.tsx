import '../styles/globals.css'
import { AppProps } from 'next/app'
import "@arco-design/web-react/dist/css/arco.css";
import Basiclayout from './layouts/index'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Basiclayout>
      <Component {...pageProps} />
    </Basiclayout>
  )
}

export default MyApp
