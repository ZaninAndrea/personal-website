import Head from "next/head"
import styles from "../styles/Page.module.css"
import Link from "next/link"
import type { FC, PropsWithChildren } from "react"
import Header from "./Header"

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
            <Header />

            <main className={styles.main}>{children}</main>
        </div>
    )
}

export default PageLayout
