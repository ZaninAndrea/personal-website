import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { getAllPostsForHome } from "../lib/graphcms"
import PageLayout from "../components/PageLayout"
import styles from "../styles/Home.module.css"

function prettifyDate(rawDate: string): string {
    const date = new Date(rawDate)

    const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ][date.getMonth()]

    return `${month} ${date.getFullYear()}`
}

const Home: NextPage = ({ posts }: { posts?: any }) => {
    return (
        <PageLayout title="Baida">
            <div className={styles.presentation}>
                Hi, I&apos;m{" "}
                <span className={styles.highlightedText}>Andrea</span>. I
                currently work at <a href="https://igloo.ooo">Igloo</a> and
                write about{" "}
                <span className={styles.highlightedText}>
                    math and programming
                </span>{" "}
                when inspiration strikes.
            </div>

            <table className={styles.contentList}>
                <colgroup>
                    <col style={{ width: "112px" }} />
                    <col style={{ width: "auto" }} />
                </colgroup>
                <tbody>
                    <tr className={styles.header}>
                        <td className={styles.headerTitle}>ARTICLES</td>
                        <td className={styles.headerLine}>
                            <span></span>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            {posts.map((post: any) => (
                                <p key={post.slug} className={styles.post}>
                                    <span className={styles.postDate}>
                                        {prettifyDate(post.date)}
                                    </span>
                                    <Link href={`/blog/${post.slug}`}>
                                        <a className={styles.postTitle}>
                                            {post.title}
                                        </a>
                                    </Link>
                                </p>
                            ))}
                        </td>
                    </tr>
                    <tr className={styles.header}>
                        <td className={styles.headerTitle}>DEEP DIVES</td>
                        <td className={styles.headerLine}>
                            <span></span>
                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td className={styles.headerLine}>
                            <p className={styles.deepDive}>
                                Mathematical Tools for Privacy and Trust
                            </p>
                            <p className={styles.deepDive}>
                                A Primer on Statistics
                            </p>
                            <p className={styles.deepDive}>
                                Algorithms and Data Structures for playing chess
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </PageLayout>
    )
}

export async function getStaticProps({ preview = false }) {
    const posts = (await getAllPostsForHome(preview)) || []
    return {
        props: { posts, preview },
    }
}

export default Home
