import type { NextPage } from "next"
import Link from "next/link"
import PageLayout from "../../components/PageLayout"
import styles from "../../styles/Statistics.module.css"

const posts: any[] = [
    { slug: "chapter1", title: "The geometry of probability" },
    { slug: "chapter2", title: "Infinite possible outcomes" },
    { slug: "chapter3", title: "The gaussian distribution" },
    { slug: "chapter4", title: "Inferential statistics" },
]

const Home: NextPage = () => {
    return (
        <PageLayout title="Baida | A Primer on Statistics">
            <h1 className={styles.title}>A Primer on Statistics</h1>
            <div className={styles.introduction}>
                <p>
                    This course is meant to give you a{" "}
                    <b>high level introduction</b> to the world of statistics,
                    without requiring any prior knowledge besides basic math.
                    Each chapter has several <b>interactive visualizations</b>{" "}
                    of the new concepts to allow you to get your hands dirty.
                </p>
                <p>
                    The topics are presented with a good degree of mathematical
                    rigor, but to ease the reading I have almost entirely
                    avoided formal proofs. I have favored a wide ranging
                    overview of what can be done with statistics rather than
                    diving really deep into a single topic, which of course I
                    encourage you to do if you find this subject interesting.
                </p>
            </div>
            <table className={styles.contentList}>
                <colgroup>
                    <col style={{ width: "95px" }} />
                    <col style={{ width: "auto" }} />
                </colgroup>
                <tbody>
                    <tr className={styles.header}>
                        <td className={styles.headerTitle}>CHAPTERS</td>
                        <td className={styles.headerLine}>
                            <span></span>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <div className={styles.posts}>
                                {posts.map((post: any) => (
                                    <p key={post.slug} className={styles.post}>
                                        <Link href={`/statistics/${post.slug}`}>
                                            <a className={styles.postTitle}>
                                                {post.title}
                                            </a>
                                        </Link>
                                    </p>
                                ))}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </PageLayout>
    )
}

export default Home
