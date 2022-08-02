import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import PageLayout from "../components/PageLayout"
import styles from "../styles/QuantifiedMe.module.css"

type Paragraph = {
    content: string
    style?: string
}[]

function HighlightedParagraph({ content }: { content: Paragraph }) {
    let spans = []
    for (let block of content) {
        if (block.style === "line-break") spans.push(<br />)
        else
            spans.push(
                <span
                    className={
                        block.style === "highlight" ? styles.highlight : ""
                    }
                >
                    {block.content}
                </span>
            )
    }

    return <>{spans}</>
}

const QuantifiedMe: NextPage = ({
    healthParagraph,
}: {
    healthParagraph?: Paragraph
}) => {
    return (
        <PageLayout title="Baida | Quantified Me">
            <div className={styles.statsParagraph}>
                <HighlightedParagraph content={healthParagraph as Paragraph} />
            </div>
            <div className={styles.protectedLogIn}>
                <i className="fa-solid fa-lock" style={{ fontSize: "18px" }} />{" "}
                You don&apos;t have access to the protected content
            </div>
        </PageLayout>
    )
}

export async function getStaticProps(): Promise<{
    props: { healthParagraph: Paragraph }
}> {
    const healthParagraph = [
        { content: "In the last week I have totaled " },
        {
            content: "46.532",
            style: "highlight",
        },
        { content: " with a peak of " },
        {
            content: "12.324",
            style: "highlight",
        },
        { content: " steps on " },
        {
            content: "Friday",
            style: "highlight",
        },
        { content: ". I also trained " },
        {
            content: "2",
            style: "highlight",
        },
        { content: " times starting a " },
        {
            content: "new streak",
            style: "highlight",
        },
        { content: "." },
        { content: "", style: "line-break" },
        { content: "Last time I weighted myself I was " },
        {
            content: "68.3",
            style: "highlight",
        },
        { content: " kg." },
    ]

    return {
        props: { healthParagraph },
    }
}

export default QuantifiedMe
