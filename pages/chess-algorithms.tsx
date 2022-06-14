import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { getLatestPosts } from "../lib/graphcms"
import PageLayout from "../components/PageLayout"
import styles from "../styles/ChessAlgorithms.module.css"
import globalStyles from "../styles/Page.module.css"

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

const ChessAlgorithms: NextPage = ({ posts }: { posts?: any }) => {
    return (
        <PageLayout title="Baida | Chess Playing Algorithms">
            <h1 className={styles.title}>
                Algorithms and Data Structures to Play Chess
            </h1>
            <div className={styles.introduction}>
                <p>
                    There is a rich history of mathematicians and computer
                    scientists that have tackled the problem of designing an
                    algorithm to play chess; in my bachelor thesis I analyse and
                    explain the most successful techniques to <b>represent</b>{" "}
                    the chessboard, to <b>explore</b> the tree of the possible
                    moves and to <b>evaluate</b> a position.
                </p>
                <p>
                    If you are fluent in italian you can read my whole thesis
                    down below. I also programmed a simple modular chess AI that
                    showcases the various algorithms, you can go through the
                    code on GitHub.
                </p>
            </div>

            <div className={styles.buttons}>
                <a
                    href="/assets/tesi.pdf"
                    download="Algoritmi e Strutture Dati per il gioco degli scacchi.pdf"
                    className={globalStyles.button}
                >
                    <i
                        className="fa-regular fa-file-pdf"
                        style={{ paddingRight: "12px" }}
                    ></i>
                    Thesis
                </a>
                <a
                    href="https://github.com/ZaninAndrea/chess_engine"
                    target="_blank"
                    className={globalStyles.button}
                >
                    <i
                        className="fa-brands fa-github"
                        style={{ paddingRight: "12px" }}
                    ></i>
                    Repository
                </a>
            </div>
        </PageLayout>
    )
}

export async function getStaticProps({ preview = false }) {
    const posts = (await getLatestPosts(3, preview)) || []
    return {
        props: { posts, preview },
    }
}

export default ChessAlgorithms
