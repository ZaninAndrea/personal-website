import type { NextPage } from "next"
import Markdown from "../../components/Markdown"
import PageLayout from "../../components/PageLayout"
import styles from "../../styles/DistributedAlgorithmArticle.module.css"
import fs from "fs"
import Visualizations from "../../components/distributed-algorithms/visualizations"

type PostProps = {
    source: string
    slug: string
}

const titleMap: { [slug: string]: string } = {
    "leader-election": "Leader Election",
    gossip: "Gossip Protocols",
}

const AlgorithmPage: NextPage<PostProps> = ({ source, slug }) => {
    const renderedBlocks = []
    let lastBlock = ""
    for (let line of source.split("\n")) {
        const blockMatched = line.match(/{{(.*)}}/)
        if (blockMatched) {
            renderedBlocks.push(
                <Markdown source={lastBlock} className={styles.articleBody} />
            )
            lastBlock = ""

            renderedBlocks.push(Visualizations[blockMatched[1]]())
        } else {
            lastBlock += "\n" + line
        }
    }

    if (lastBlock !== "") {
        renderedBlocks.push(
            <Markdown source={lastBlock} className={styles.articleBody} />
        )
    }

    return (
        <PageLayout title={"Baida | " + titleMap[slug]}>
            <h1 className={styles.articleTitle}>{titleMap[slug]}</h1>
            {renderedBlocks}
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
