import Head from "next/head"
import styles from "../styles/Page.module.css"
import Link from "next/link"
import type { FC, PropsWithChildren } from "react"
import Header from "./Header"
import Script from "next/script"

type PageLayoutProps = PropsWithChildren<{
    title: string
    headerTitle?: string
    headerTitleURL?: string
}>

const PageLayout: FC<PageLayoutProps> = ({
    children,
    title,
    headerTitleURL,
    headerTitle,
}) => {
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
                id="gtag-1"
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-E16B5L01EZ"
            ></Script>
            <Script id="gtag-2">
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-E16B5L01EZ');`}
            </Script>
            <Header titleName={headerTitle} titleLink={headerTitleURL} />

            <main className={styles.main}>{children}</main>
        </div>
    )
}

export default PageLayout
