import '@/styles/globals.css'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Spinner} from "flowbite-react";

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleRouteChange = () => setLoading(true)
    const handleRouteComplete = () => setLoading(false)

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [])

  return (
      <>
        {loading &&
            <Spinner />
        }
        <Component {...pageProps} />
      </>
  )
}
