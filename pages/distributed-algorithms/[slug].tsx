import type { NextPage } from "next"
import Markdown from "../../components/Markdown"
import PageLayout from "../../components/PageLayout"
import styles from "../../styles/DistributedAlgorithmArticle.module.css"
import fs from "fs"

type PostProps = {
    source: string
    slug: string
}

const titleMap: { [slug: string]: string } = {
    "leader-election": "Leader Election",
    gossip: "Gossip Protocols",
}

const AlgorithmPage: NextPage<PostProps> = ({ source, slug }) => {
    return (
        <PageLayout
            title={"Baida | " + titleMap[slug]}
            headerTitle="An Exploration of Distributed Algorithms"
            headerTitleURL="/distributed-algorithms"
        >
            <h1 className={styles.articleTitle}>{titleMap[slug]}</h1>
            <Markdown source={source} className={styles.articleBody} />
        </PageLayout>
    )
}

export async function getStaticProps({ params }: { params: any }) {
    const source: string = await fs.readFileSync(
        "./resources/distributed-algorithms/" + params.slug + ".md",
        "utf8"
    )

    return {
        props: {
            source,
            slug: params.slug,
        },
    }
}

export async function getStaticPaths() {
    const posts: string[] = []
    fs.readdirSync("./resources/distributed-algorithms/").forEach((file) => {
        posts.push(file.slice(0, file.length - 3))
    })

    return {
        paths: posts.map((post) => ({
            params: { slug: post },
        })),
        fallback: false,
    }
}

export default AlgorithmPage
