// named imports
import type { AppProps } from 'next/app'
import { ThirdwebProvider } from '@thirdweb-dev/react'
// style imports
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const activeChain = 'mumbai'
  return (
    <ThirdwebProvider
      clientId='c0ce66fc998d87b5b7fa1d703fc486bd'
      activeChain={activeChain}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}
