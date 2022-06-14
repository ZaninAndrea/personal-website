import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { getAllPosts } from "../../lib/graphcms"
import PageLayout from "../../components/PageLayout"
import styles from "../../styles/Articles.module.css"

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
        <PageLayout title="Baida | Articles">
            <div className={styles.postList}>
                {posts.map((post: any) => (
                    <p key={post.slug} className={styles.post}>
                        <span className={styles.postDate}>
                            {prettifyDate(post.date)}
                        </span>
                        <Link href={`/articles/${post.slug}`}>
                            <a className={styles.postTitle}>{post.title}</a>
                        </Link>
                    </p>
                ))}
            </div>
        </PageLayout>
    )
}

export async function getStaticProps({ preview = false }) {
    const posts = (await getAllPosts(preview)) || []
    return {
        props: { posts, preview },
    }
}

export default Home
