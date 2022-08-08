import type { NextPage } from "next"
import Link from "next/link"
import PageLayout from "../../components/PageLayout"
import styles from "../../styles/DistributedAlgorithms.module.css"

const posts: any[] = [
    { slug: "leader-election", title: "Leader Election" },
    { slug: "gossip", title: "Gossip Protocols" },
]

const Home: NextPage = () => {
    return (
        <PageLayout title="Baida | Distributed Algorithms">
            <h1 className={styles.title}>
                An Interactive Exploration of Distributed Algorithms
            </h1>
            <div className={styles.introduction}>
                <p>
                    In this collection you will find explanations and{" "}
                    <b>simulations</b> of several algorithms in the distributed
                    computing field. The goal of this project is giving you a
                    tool to play with these algorithms <b>hands on</b>, for this
                    reason I have focused on giving you a practical
                    understanding while ignoring some of the rigorous theory.
                </p>
            </div>
            <div className={styles.postList}>
                {posts.map((post: any) => (
                    <p key={post.slug} className={styles.post}>
                        <Link href={`/distributed-algorithms/${post.slug}`}>
                            <a className={styles.postTitle}>{post.title}</a>
                        </Link>
                    </p>
                ))}
            </div>
        </PageLayout>
    )
}

export default Home
