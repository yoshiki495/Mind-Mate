import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'

import '@vercel/examples-ui/globals.css'

function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <video
        className="h-full w-full object-cover"
        playsInline
        autoPlay
        muted
        loop>
        <source
          className=""
          src="videos/ocean-65560.mp4"
          type="video/mp4" />
      </video>
      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed">
        <Component {...pageProps} />
      </div>
      <Analytics />
    </>
  )
}

export default App
