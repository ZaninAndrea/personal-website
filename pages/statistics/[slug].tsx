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
    chapter1: "The geometry of probability",
    chapter2: "Infinite possible outcomes",
    chapter3: "The gaussian distribution",
    chapter4: "Inferential statistics",
}

const AlgorithmPage: NextPage<PostProps> = ({ source, slug }) => {
    return (
        <PageLayout
            title={"Baida | " + titleMap[slug]}
            headerTitle="A Primer on Statistics"
            headerTitleURL="/statistics"
        >
            <h1 className={styles.articleTitle}>{titleMap[slug]}</h1>
            <Markdown source={source} className={styles.articleBody} />
        </PageLayout>
    )
}

export async function getStaticProps({ params }: { params: any }) {
    const source: string = await fs.readFileSync(
        "./resources/statistics/" + params.slug + ".md",
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
    fs.readdirSync("./resources/statistics/").forEach((file) => {
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
