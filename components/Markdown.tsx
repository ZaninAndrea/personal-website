import React from "react"
import type { FC } from "react"
import MarkdownIt from "markdown-it"
import MarkdownKatex from "../lib/markdown-it-katex"
import MarkdownMark from "markdown-it-mark"
import MarkdownContainer from "markdown-it-container"
import MarkdownHighlight from "markdown-it-highlightjs"
import Visualizations from "./visualizations"

type MarkdownProps = {
    source: string
    className?: string
}

const MarkdownBlock: FC<MarkdownProps> = ({ source }) => {
    const mdRendered = new MarkdownIt({
        html: true,
    })
    mdRendered.use(MarkdownHighlight)
    mdRendered.use(MarkdownKatex, {
        throwOnError: false,
        errorColor: " #cc0000",
    })
    mdRendered.use(MarkdownContainer, "proof", {
        validate: function (params: any) {
            return params.trim().match(/^proof$/)
        },

        render: (tokens: any[], idx: number) => {
            var m = tokens[idx].info.trim().match(/^proof$/)

            if (tokens[idx].nesting === 1) {
                // opening tag
                return "<details><summary>Proof</summary>\n"
            } else {
                // closing tag
                return "</details>\n"
            }
        },
    })
    mdRendered.use(MarkdownMark)

    var result = mdRendered.render(source)

    return <div dangerouslySetInnerHTML={{ __html: result }}></div>
}

const Markdown: FC<MarkdownProps> = ({ source, className }) => {
    const renderedBlocks = []
    let lastBlock = ""
    for (let line of source.split("\n")) {
        const blockMatched = line.trim().match(/^{{(.*)}}$/)
        if (blockMatched) {
            renderedBlocks.push(<MarkdownBlock source={lastBlock} />)
            lastBlock = ""

            const Visualization = Visualizations[blockMatched[1]]
            renderedBlocks.push(<Visualization />)
        } else {
            lastBlock += "\n" + line
        }
    }

    if (lastBlock !== "") {
        renderedBlocks.push(<MarkdownBlock source={lastBlock} />)
    }

    return (
        <div
            className={
                className ? "markdown-body " + className : "markdown-body"
            }
        >
            {renderedBlocks}
        </div>
    )
}

export default Markdown
