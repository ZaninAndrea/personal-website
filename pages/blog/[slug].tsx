import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { getAllPostsWithSlug, getPost } from "../../lib/graphcms"
import Markdown from "../../components/Markdown"
import PageLayout from "../../components/PageLayout"

type PostProps = {
    preview: boolean
    post: any
}

const Post: NextPage<PostProps> = ({ post }) => {
    return (
        <PageLayout title={post.title}>
            <Markdown source={post.content} />
        </PageLayout>
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
