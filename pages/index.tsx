import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Link from "next/link"
import { getAllPostsForHome } from "../lib/graphcms"

const Home: NextPage = ({ posts }: { posts?: any }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Baida</title>
                <meta
                    name="description"
                    content="Personal website of Andrea Zanin"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <p className={styles.description}>
                    Hi, I&apos;m Andrea. I currently work at{" "}
                    <a href="https://igloo.ooo">Igloo</a> and write about math
                    and programming when inspiration strikes.
                </p>

                <h2 className={styles.title}>Posts</h2>
                {posts.map((post: any) => (
                    <p className={styles.description} key={post.slug}>
                        <Link href={`/blog/${post.slug}`}>
                            <a>{post.title}</a>
                        </Link>
                    </p>
                ))}
            </main>
        </div>
    )
}

export async function getStaticProps({ preview = false }) {
    const posts = (await getAllPostsForHome(preview)) || []
    console.log(posts)
    return {
        props: { posts, preview },
    }
}

export default Home
