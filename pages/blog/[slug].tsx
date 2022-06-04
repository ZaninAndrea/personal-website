import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../../styles/Home.module.css"
import { getAllPostsWithSlug, getPost } from "../../lib/graphcms"

type PostProps = {
    preview: boolean
    post: any
}

const Post: NextPage<PostProps> = ({ post }) => {
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
                <h1 className={styles.title}>{post.title}</h1>

                <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
            </main>
        </div>
    )
}

export async function getStaticProps({
    params,
    preview = false,
}: {
    params: any
    preview?: boolean
}) {
    const post = await getPost(params.slug, preview)

    return {
        props: {
            preview,
            post,
        },
    }
}

export async function getStaticPaths() {
    const posts = await getAllPostsWithSlug()
    return {
        paths: posts.map(({ slug }: any) => ({
            params: { slug },
        })),
        fallback: "blocking",
    }
}

export default Post
