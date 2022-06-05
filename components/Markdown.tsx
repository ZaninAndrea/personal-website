import React from "react"
import type { FC } from "react"
import MarkdownIt from "markdown-it"
import MarkdownKatex from "../lib/markdown-it-katex"
import MarkdownMark from "markdown-it-mark"
import MarkdownContainer from "markdown-it-container"
// import HtmlToReact from "html-to-react"

// const HtmlToReactParser = HtmlToReact.Parser()

// const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React)
// const MarkdownComponents: any = {}

type MarkdownProps = {
    source: string
}

const Markdown: FC<MarkdownProps> = ({ source }) => {
    const mdRendered = new MarkdownIt({
        html: true,
    })
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

    // const processingInstructions = [
    //     {
    //         shouldProcessNode: (node: any) => {
    //             return (
    //                 node.name === "p" &&
    //                 node.children.length === 1 &&
    //                 node.children[0].name &&
    //                 node.children[0].name.startsWith("react-")
    //             )
    //         },
    //         processNode: (node: any, children: any) => {
    //             const Component =
    //                 MarkdownComponents[
    //                     node.children[0].name.slice("react-".length)
    //                 ]

    //             return (
    //                 <Component
    //                     {...node.children[0].attribs}
    //                     markdownChildren={node.children[0].children}
    //                 />
    //             )
    //         },
    //     },
    //     {
    //         shouldProcessNode: function (node: any) {
    //             return true
    //         },
    //         processNode: processNodeDefinitions.processDefaultNode,
    //     },
    // ]

    // const reactMD = HtmlToReactParser.parseWithInstructions(
    //     result,
    //     () => true,
    //     processingInstructions
    // )

    return (
        <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: result }}
        ></div>
    )
}

export default Markdown
