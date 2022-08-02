import "../styles/globals.css"
import "../styles/highlightjs.css"
import "../components/distributed-algorithms/Graph.css"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
