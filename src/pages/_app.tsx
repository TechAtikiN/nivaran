// named imports
import type { AppProps } from 'next/app'
import { ThirdwebProvider } from '@thirdweb-dev/react'
// style imports
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const activeChain = 'mumbai'
  return (
    <ThirdwebProvider
      clientId={process.env.THIRDWEB_CLIENT_ID}
      activeChain={activeChain}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}
