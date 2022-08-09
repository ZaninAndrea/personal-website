import React from "react"
import TeX from "@matejmazur/react-katex"
import { plotFunction, gaussianPath } from "./utils"
const mathjs = require("mathjs")

class Image1 extends React.Component {
    render() {
        return (
            <svg
                viewBox="0 0 310 60"
                style={{
                    margin: "16px auto",
                    display: "block",
                    maxHeight: "150px",
                }}
            >
                <line
                    x1="155"
                    x2="155"
                    y1="0"
                    y2="60"
                    strokeWidth="0.5"
                    stroke="var(--gray)"
                />
                <line
                    x1="5"
                    x2="305"
                    y1="55"
                    y2="55"
                    strokeWidth="0.5"
                    stroke="var(--gray)"
                />
                <path
                    d={gaussianPath({
                        xStart: 5,
                        xEnd: 305,
                        yStart: 5,
                        yEnd: 55,
                        sigma: 3,
                        mu: 0,
                        closed: false,
                        MAX_Y: 0.15,
                        N: 1000,
                    })}
                    style={{
                        stroke: "var(--primary-color)",
                        fill: "transparent",
                    }}
                />
            </svg>
        )
    }
}

class Playground1 extends React.Component {
    state = {
        mean1: -3,
        variance1: 2,
        mean2: 3,
        variance2: 2,
    }

    render() {
        return (
            <div
                style={{
                    margin: "16px auto",
                    display: "block",
                    maxHeight: "230px",
                    gridTemplateRows: "128px auto",
                }}
            >
                <div style={{ maxWidth: "fit-content", margin: "auto" }}>
                    Mean 1:{" "}
                    <input
                        type="number"
                        value={this.state.mean1}
                        onChange={(e, value) =>
                            this.setState({ mean1: parseFloat(e.target.value) })
                        }
                        min={-10}
                        max={10}
                    ></input>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Variance 1:{" "}
                    <input
                        type="number"
                        value={this.state.variance1}
                        onChange={(e, value) =>
                            this.setState({
                                variance1: parseFloat(e.target.value),
                            })
                        }
                        min={1}
                        max={50}
                    ></input>
                    <br />
                    Mean 2:{" "}
                    <input
                        type="number"
                        value={this.state.mean2}
                        onChange={(e, value) =>
                            this.setState({ mean2: parseFloat(e.target.value) })
                        }
                        min={-10}
                        max={10}
                    ></input>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Variance 2:{" "}
                    <input
                        type="number"
                        value={this.state.variance2}
                        onChange={(e, value) =>
                            this.setState({
                                variance2: parseFloat(e.target.value),
                            })
                        }
                        min={1}
                        max={50}
                    ></input>
                </div>
                <svg
                    viewBox="0 0 310 60"
                    style={{
                        margin: "16px auto",
                        display: "block",
                        maxHeight: "150px",
                    }}
                >
                    <line
                        x1="155"
                        x2="155"
                        y1="0"
                        y2="60"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <line
                        x1="5"
                        x2="305"
                        y1="55"
                        y2="55"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <path
                        d={gaussianPath({
                            xStart: 5,
                            xEnd: 305,
                            yStart: 5,
                            yEnd: 55,
                            sigma: Math.sqrt(this.state.variance1),
                            mu: this.state.mean1,
                            closed: false,
                            MAX_Y: 0.5,
                            N: 1000,
                        })}
                        style={{
                            stroke: "var(--gray)",
                            fill: "transparent",
                        }}
                    />
                    <path
                        d={gaussianPath({
                            xStart: 5,
                            xEnd: 305,
                            yStart: 5,
                            yEnd: 55,
                            sigma: Math.sqrt(this.state.variance2),
                            mu: this.state.mean2,
                            closed: false,
                            MAX_Y: 0.5,
                            N: 1000,
                        })}
                        style={{
                            stroke: "var(--gray)",
                            fill: "transparent",
                        }}
                    />
                    <path
                        d={gaussianPath({
                            xStart: 5,
                            xEnd: 305,
                            yStart: 5,
                            yEnd: 55,
                            sigma: Math.sqrt(
                                this.state.variance1 + this.state.variance2
                            ),
                            mu: this.state.mean1 + this.state.mean2,
                            closed: false,
                            MAX_Y: 0.5,
                            N: 1000,
                        })}
                        style={{
                            stroke: "var(--primary-color)",
                            fill: "transparent",
                        }}
                    />
                </svg>
            </div>
        )
    }
}

class Playground2 extends React.Component {
    state = {
        mean: 0,
        variance: 2,
    }

    render() {
        return (
            <div
                style={{
                    margin: "16px auto",
                    display: "block",
                    maxHeight: "230px",
                    gridTemplateRows: "128px auto",
                }}
            >
                <div style={{ maxWidth: "fit-content", margin: "auto" }}>
                    <TeX math="\mu" />:{" "}
                    <input
                        type="number"
                        value={this.state.mean}
                        onChange={(e, value) =>
                            this.setState({ mean: parseFloat(e.target.value) })
                        }
                        min={-15}
                        max={15}
                    ></input>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <TeX math="\sigma^2" />:{" "}
                    <input
                        type="number"
                        value={this.state.variance}
                        onChange={(e, value) =>
                            this.setState({
                                variance: parseFloat(e.target.value),
                            })
                        }
                        min={1}
                        max={50}
                    ></input>
                </div>
                <svg
                    viewBox="0 0 310 60"
                    style={{
                        margin: "16px auto",
                        display: "block",
                        maxHeight: "150px",
                    }}
                >
                    <line
                        x1="155"
                        x2="155"
                        y1="0"
                        y2="60"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <line
                        x1="5"
                        x2="305"
                        y1="55"
                        y2="55"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <path
                        d={gaussianPath({
                            xStart: 5,
                            xEnd: 305,
                            yStart: 5,
                            yEnd: 55,
                            sigma: Math.sqrt(this.state.variance),
                            mu: this.state.mean,
                            closed: false,
                            MAX_Y: 0.4,
                            N: 1000,
                        })}
                        style={{
                            stroke: "var(--primary-color)",
                            fill: "transparent",
                        }}
                    />
                </svg>
            </div>
        )
    }
}

class Playground3 extends React.Component {
    state = {
        mean1: -3,
        variance1: 2,
        mean2: 3,
        variance2: 2,
    }

    render() {
        return (
            <div
                style={{
                    margin: "16px auto",
                    display: "block",
                    maxHeight: "230px",
                    gridTemplateRows: "128px auto",
                }}
            >
                <div style={{ maxWidth: "fit-content", margin: "auto" }}>
                    Mean 1:{" "}
                    <input
                        type="number"
                        value={this.state.mean1}
                        onChange={(e, value) =>
                            this.setState({ mean1: parseFloat(e.target.value) })
                        }
                        min={-10}
                        max={10}
                    ></input>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Variance 1:{" "}
                    <input
                        type="number"
                        value={this.state.variance1}
                        onChange={(e, value) =>
                            this.setState({
                                variance1: parseFloat(e.target.value),
                            })
                        }
                        min={1}
                        max={50}
                    ></input>
                    <br />
                    Mean 2:{" "}
                    <input
                        type="number"
                        value={this.state.mean2}
                        onChange={(e, value) =>
                            this.setState({ mean2: parseFloat(e.target.value) })
                        }
                        min={-10}
                        max={10}
                    ></input>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Variance 2:{" "}
                    <input
                        type="number"
                        value={this.state.variance2}
                        onChange={(e, value) =>
                            this.setState({
                                variance2: parseFloat(e.target.value),
                            })
                        }
                        min={1}
                        max={50}
                    ></input>
                </div>
                <svg
                    viewBox="0 0 310 60"
                    style={{
                        margin: "16px auto",
                        display: "block",
                        maxHeight: "150px",
                    }}
                >
                    <line
                        x1="155"
                        x2="155"
                        y1="0"
                        y2="60"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <line
                        x1="5"
                        x2="305"
                        y1="55"
                        y2="55"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <path
                        d={plotFunction({
                            xStart: 5,
                            xEnd: 305,
                            yStart: 5,
                            yEnd: 55,
                            f: (x) => {
                                const halfWidth = Math.sqrt(
                                    this.state.variance1
                                )

                                return Math.abs(x - this.state.mean1) <
                                    halfWidth
                                    ? 1 / (2 * halfWidth)
                                    : 0
                            },
                            MIN_X: -10,
                            MAX_X: 10,
                            MAX_Y: 0.5,
                            N: 2000,
                        })}
                        style={{
                            stroke: "var(--gray)",
                            fill: "transparent",
                        }}
                    />
                    <path
                        d={plotFunction({
                            xStart: 5,
                            xEnd: 305,
                            yStart: 5,
                            yEnd: 55,
                            f: (x) => {
                                const halfWidth = Math.sqrt(
                                    this.state.variance2
                                )

                                return Math.abs(x - this.state.mean2) <
                                    halfWidth
                                    ? 1 / (2 * halfWidth)
                                    : 0
                            },
                            MIN_X: -10,
                            MAX_X: 10,
                            MAX_Y: 0.5,
                            N: 2000,
                        })}
                        style={{
                            stroke: "var(--gray)",
                            fill: "transparent",
                        }}
                    />
                    <path
                        d={plotFunction({
                            xStart: 5,
                            xEnd: 305,
                            yStart: 5,
                            yEnd: 55,
                            f: (x) => {
                                const width1 =
                                    2 * Math.sqrt(this.state.variance1)
                                const width2 =
                                    2 * Math.sqrt(this.state.variance2)
                                const minwidth = Math.min(width1, width2)
                                const maxwidth = Math.min(width1, width2)

                                const a =
                                    this.state.mean1 +
                                    this.state.mean2 -
                                    (width1 + width2) / 2
                                const b =
                                    this.state.mean1 +
                                    this.state.mean2 +
                                    (width1 + width2) / 2
                                const c = a + minwidth
                                const d = b - minwidth
                                const maxP = 2 / (b - a - minwidth)

                                if (x < a) {
                                    return 0
                                } else if (x <= c) {
                                    return maxP + (maxP * (x - c)) / (c - a)
                                } else if (x <= d) {
                                    return maxP
                                } else if (x <= b) {
                                    return maxP - (maxP * (x - d)) / (b - d)
                                } else {
                                    return 0
                                }
                            },
                            MIN_X: -10,
                            MAX_X: 10,
                            MAX_Y: 1,
                            N: 2000,
                        })}
                        style={{
                            stroke: "var(--primary-color)",
                            fill: "transparent",
                        }}
                    />
                </svg>
            </div>
        )
    }
}

class Playground4 extends React.Component {
    state = {
        N: 1,
    }

    render() {
        const N = Math.floor((this.state.N * this.state.N) / 10 + this.state.N)
        const lambda = 5
        const p = Math.min(lambda / N, 0.9)

        const binomialF = (x) => {
            let res = 0
            let k = Math.floor(x)
            const ceil = Math.min(k, N)

            for (let i = 0; i <= ceil; i++) {
                res +=
                    mathjs.combinations(N, i) *
                    mathjs.pow(p, i) *
                    mathjs.pow(1 - p, N - i)
            }

            return res
        }

        return (
            <div
                style={{
                    margin: "16px auto",
                    display: "block",
                    maxHeight: "230px",
                    gridTemplateRows: "128px auto",
                }}
            >
                <div style={{ width: "fit-content", margin: "auto" }}>
                    N:{" "}
                    <input
                        type="number"
                        value={this.state.N}
                        onChange={(e, value) =>
                            this.setState({ N: parseFloat(e.target.value) })
                        }
                        min={1}
                        max={15}
                    ></input>
                </div>
                <svg
                    viewBox="0 0 310 60"
                    style={{
                        margin: "16px auto",
                        display: "block",
                        maxHeight: "150px",
                    }}
                >
                    <line
                        x1="5"
                        x2="5"
                        y1="0"
                        y2="60"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <line
                        x1="5"
                        x2="305"
                        y1="55"
                        y2="55"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <path
                        d={plotFunction({
                            xStart: 5,
                            xEnd: 305,
                            yStart: 5,
                            yEnd: 55,
                            f: binomialF,
                            MIN_X: 0,
                            MAX_X: 25,
                            MAX_Y: 1,
                            N: 1000,
                        })}
                        style={{
                            stroke: "var(--primary-color)",
                            fill: "transparent",
                        }}
                    />
                    <path
                        d={plotFunction({
                            xStart: 5,
                            xEnd: 305,
                            yStart: 5,
                            yEnd: 55,
                            f: (x) => {
                                let res = 0
                                let k = Math.floor(x)
                                const lambda = 5

                                for (let i = 0; i <= k; i++) {
                                    res +=
                                        mathjs.pow(lambda, i) /
                                        mathjs.factorial(i)
                                }
                                res *= mathjs.exp(-lambda)

                                return res
                            },
                            MIN_X: 0,
                            MAX_X: 25,
                            MAX_Y: 1,
                            N: 1000,
                        })}
                        style={{
                            stroke: "var(--blue)",
                            fill: "transparent",
                        }}
                    />
                </svg>
            </div>
        )
    }
}

class Playground5 extends React.Component {
    state = {
        N: 1,
    }

    render() {
        const N = this.state.N
        const p = 0.5
        const sigma = mathjs.sqrt(p * (1 - p))

        const binomialF = (x) => {
            let res = 0
            let k = Math.floor(x * sigma * mathjs.sqrt(N) + N * p)
            const ceil = Math.min(k, N)

            for (let i = 0; i <= ceil; i++) {
                res +=
                    mathjs.combinations(N, i) *
                    mathjs.pow(p, i) *
                    mathjs.pow(1 - p, N - i)
            }

            return res
        }

        return (
            <div
                style={{
                    margin: "16px auto",
                    display: "block",
                    maxHeight: "230px",
                    gridTemplateRows: "128px auto",
                }}
            >
                <div style={{ width: "fit-content", margin: "auto" }}>
                    N:{" "}
                    <input
                        type="number"
                        value={this.state.N}
                        onChange={(e, value) =>
                            this.setState({ N: parseFloat(e.target.value) })
                        }
                        min={1}
                        max={35}
                    ></input>
                </div>
                <svg
                    viewBox="0 0 310 60"
                    style={{
                        margin: "16px auto",
                        display: "block",
                        maxHeight: "150px",
                    }}
                >
                    <line
                        x1="155"
                        x2="155"
                        y1="0"
                        y2="60"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <line
                        x1="5"
                        x2="305"
                        y1="55"
                        y2="55"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <path
                        d={plotFunction({
                            xStart: 5,
                            xEnd: 305,
                            yStart: 5,
                            yEnd: 55,
                            f: binomialF,
                            MIN_X: -15,
                            MAX_X: 15,
                            MAX_Y: 1,
                            N: 1000,
                        })}
                        style={{
                            stroke: "var(--primary-color)",
                            fill: "transparent",
                        }}
                    />
                    <path
                        d={plotFunction({
                            xStart: 5,
                            xEnd: 305,
                            yStart: 5,
                            yEnd: 55,
                            f: (x) =>
                                0.5 * (1 + mathjs.erf(x / mathjs.sqrt(2))),
                            MIN_X: -15,
                            MAX_X: 15,
                            MAX_Y: 1,
                            N: 1000,
                        })}
                        style={{
                            stroke: "var(--blue)",
                            fill: "transparent",
                        }}
                    />
                </svg>
            </div>
        )
    }
}

export default {
    "statistics-chapter3-playground1": Playground1,
    "statistics-chapter3-image1": Image1,
    "statistics-chapter3-playground2": Playground2,
    "statistics-chapter3-playground3": Playground3,
    "statistics-chapter3-playground4": Playground4,
    "statistics-chapter3-playground5": Playground5,
}
