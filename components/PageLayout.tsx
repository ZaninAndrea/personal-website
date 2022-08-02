import Head from "next/head"
import styles from "../styles/Page.module.css"
import Link from "next/link"
import type { FC, PropsWithChildren } from "react"
import Header from "./Header"
import Script from "next/script"

type PageLayoutProps = PropsWithChildren<{
    title: string
}>

const PageLayout: FC<PageLayoutProps> = ({ children, title }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <meta
                    name="description"
                    content="Personal website of Andrea Zanin"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-E16B5L01EZ"
            ></Script>
            <Script>
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-E16B5L01EZ');`}
            </Script>
            <Header />

            <main className={styles.main}>{children}</main>
        </div>
    )
}

export default PageLayout
