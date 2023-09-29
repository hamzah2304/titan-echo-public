import '../styles/globals.css'
import '../styles/nonreact.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}