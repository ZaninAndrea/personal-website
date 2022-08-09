import React from "react"
const mathjs = require("mathjs")

class Image1 extends React.Component {
    state = {
        show160: false,
        show180: false,
    }

    componentDidMount() {
        this.show160Label = document.getElementById("label-160")
        this.show180Label = document.getElementById("label-180")

        this.show160Label.onmouseenter = () => {
            this.show160Label.classList.add("label-highlighted")
            this.setState({ show160: true })
        }
        this.show160Label.onmouseleave = () => {
            this.show160Label.classList.remove("label-highlighted")
            this.setState({ show160: false })
        }

        this.show180Label.onmouseenter = () => {
            this.show180Label.classList.add("label-highlighted")
            this.setState({ show180: true })
        }
        this.show180Label.onmouseleave = () => {
            this.show180Label.classList.remove("label-highlighted")
            this.setState({ show180: false })
        }
    }

    render() {
        return (
            <svg
                viewBox="-15 -25 320 90"
                style={{
                    margin: "16px auto",
                    display: "block",
                    maxHeight: "130px",
                }}
            >
                <rect
                    x="0"
                    y="0"
                    width="300"
                    height="50"
                    style={{
                        fill: "var(--gray)",
                    }}
                />

                <rect
                    x="-5"
                    y="-5"
                    width="130"
                    height="60"
                    style={{
                        stroke: "var(--primary-color)",
                        strokeWidth: "2",
                        fillOpacity: "0",
                    }}
                />
                <rect
                    x="-10"
                    y="-10"
                    width="220"
                    height="70"
                    style={{
                        stroke: "var(--blue)",
                        strokeWidth: "2",
                        fillOpacity: "0",
                    }}
                />

                <text
                    x="40"
                    y="-15"
                    fontSize="12"
                    style={{ fill: "var(--primary-color)" }}
                >
                    {"< 1.60m"}
                </text>
                <text
                    x="120"
                    y="-15"
                    fontSize="12"
                    style={{ fill: "var(--blue)" }}
                >
                    {"< 1.80m"}
                </text>

                {this.state.show160 && (
                    <rect
                        x="0"
                        y="0"
                        width="125"
                        height="50"
                        style={{
                            fill: "var(--primary-color)",
                        }}
                    />
                )}
                {this.state.show180 && (
                    <rect
                        x="0"
                        y="0"
                        width="210"
                        height="50"
                        style={{
                            fill: "var(--blue)",
                        }}
                    />
                )}
            </svg>
        )
    }
}

function plotFunction({
    xStart,
    xEnd,
    yStart,
    yEnd,
    N,
    f,
    MIN_X,
    MAX_X,
    MAX_Y,
}) {
    if (!N) N = 100
    let points = []

    for (let i = 0; i <= N; i++) {
        const x = (MAX_X - MIN_X) * (i / N) + MIN_X
        const y = f(x)
        points.push({ x, y })
    }

    const X_DELTA = MAX_X - MIN_X

    const Y_DELTA = MAX_Y ? MAX_Y : Math.max(...points.map((p) => p.y)) - 0
    points = points.map(({ x, y }) => ({
        x: xStart + (xEnd - xStart) * ((x - MIN_X) / X_DELTA),
        y: yStart + (yEnd - yStart) * (1 - (y - 0) / Y_DELTA),
    }))

    let d = `M ${points[0].x},${points[0].y}`
    points.shift()
    for (let point of points) {
        d += ` L ${point.x},${point.y}`
    }

    return d
}

function gaussianPath({
    xStart,
    xEnd,
    yStart,
    yEnd,
    N,
    sigma,
    mu,
    closed,
    MAX_Y,
}) {
    console.log(mu, sigma)
    if (sigma === undefined) sigma = 5
    if (mu === undefined) mu = 0
    if (closed === undefined) closed = true
    const sigma2 = sigma * sigma
    const normalizationFactor = 1 / (sigma * Math.sqrt(2 * Math.PI))

    const f = (x) =>
        normalizationFactor * Math.exp((-0.5 * (x - mu) * (x - mu)) / sigma2)
    return (
        plotFunction({
            xStart,
            xEnd,
            yStart,
            yEnd,
            N,
            MIN_X: -10,
            MAX_X: 10,
            MAX_Y,
            f,
        }) + (closed ? " Z" : "")
    )
}

function normCDF(x, mean, standardDeviation) {
    return (1 - mathjs.erf((mean - x) / (Math.sqrt(2) * standardDeviation))) / 2
}

class Image2 extends React.Component {
    render() {
        return (
            <svg
                viewBox="-420 -20 760 90"
                style={{
                    margin: "16px auto",
                    display: "block",
                    maxHeight: "150px",
                    maxWidth: "100%",
                }}
            >
                <rect
                    x="-400"
                    y="0"
                    width="300"
                    height="42"
                    style={{
                        fill: "var(--gray)",
                    }}
                />
                {[-10, -6, -2, 2, 6, 10].map((i) => (
                    <>
                        <rect
                            x={normCDF(i, 0, 5) * 300 - 401}
                            y="47"
                            width="1"
                            height="5"
                        ></rect>
                        <text
                            x={normCDF(i, 0, 5) * 300 - 410}
                            y="60"
                            fontSize="8"
                        >
                            {170 + i * 5} cm
                        </text>
                    </>
                ))}

                <path
                    d={gaussianPath({
                        xStart: 0,
                        xEnd: 300,
                        yStart: 0,
                        yEnd: 50,
                    })}
                    style={{ fill: "var(--gray)" }}
                />
                {[0, 2, 4, 6, 8, 10].map((i) => (
                    <>
                        <rect x={i * 30 - 1} y="47" width="1" height="5"></rect>
                        <text x={i * 30 - 10} y="60" fontSize="8">
                            {120 + i * 10} cm
                        </text>
                    </>
                ))}
            </svg>
        )
    }
}

class Image3 extends React.Component {
    render() {
        return (
            <svg
                viewBox="-340 -5 680 75"
                style={{
                    margin: "16px auto",
                    display: "block",
                    maxHeight: "150px",
                }}
            >
                <path
                    d={gaussianPath({
                        xStart: -320,
                        xEnd: -20,
                        yStart: 0,
                        yEnd: 50,
                        sigma: 1,
                        MAX_Y: 0.4,
                        closed: false,
                    })}
                    style={{
                        fill: "transparent",
                        stroke: "var(--primary-color)",
                        strokeWidth: "2",
                    }}
                />
                <text
                    x={-170}
                    y="65"
                    fontSize="12"
                    style={{ fill: "var(--text-color)" }}
                    textAnchor="middle"
                >
                    Low Variance
                </text>

                <path
                    d={gaussianPath({
                        xStart: 20,
                        xEnd: 320,
                        yStart: 0,
                        yEnd: 50,
                        MAX_Y: 0.4,
                        sigma: 3,
                        closed: false,
                    })}
                    style={{
                        fill: "transparent",
                        stroke: "var(--primary-color)",
                        strokeWidth: "2",
                    }}
                />
                <text
                    x={170}
                    y="65"
                    fontSize="12"
                    style={{ fill: "var(--text-color)" }}
                    textAnchor="middle"
                >
                    High Variance
                </text>
            </svg>
        )
    }
}

class Playground1 extends React.Component {
    state = {
        mean: 1,
        variance: 1,
    }

    render() {
        return (
            <div
                style={{
                    margin: "16px auto",
                    display: "block",
                    maxHeight: "200px",
                    gridTemplateRows: "64px auto",
                }}
            >
                <div style={{ width: "fit-content", margin: "auto" }}>
                    Mean:{" "}
                    <input
                        type="number"
                        value={this.state.mean}
                        onChange={(e, value) =>
                            this.setState({ mean: e.target.value })
                        }
                        min={1}
                        max={10}
                    ></input>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Variance:{" "}
                    <input
                        type="number"
                        value={this.state.variance}
                        onChange={(e, value) =>
                            this.setState({ variance: e.target.value })
                        }
                        min={1}
                        max={10}
                    ></input>
                </div>
                <svg
                    viewBox="0 0 350 60"
                    style={{
                        margin: "16px auto",
                        display: "block",
                        maxHeight: "150px",
                    }}
                >
                    <line
                        x1="55"
                        x2="55"
                        y1="0"
                        y2="60"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <line
                        x1="5"
                        x2="105"
                        y1="55.5"
                        y2="55.5"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <path
                        d={gaussianPath({
                            xStart: 5,
                            xEnd: 105,
                            yStart: 5,
                            yEnd: 55,
                            sigma: Math.sqrt(this.state.variance),
                            mu: this.state.mean,
                            closed: false,
                            MAX_Y: 0.5,
                            N: 1000,
                        })}
                        style={{
                            stroke: "var(--primary-color)",
                            fill: "transparent",
                        }}
                    />

                    <line
                        x1="175"
                        x2="175"
                        y1="0"
                        y2="60"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <line
                        x1="125"
                        x2="225"
                        y1="55.5"
                        y2="55.5"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <path
                        d={plotFunction({
                            xStart: 125,
                            xEnd: 225,
                            yStart: 5,
                            yEnd: 55,
                            f: (x) => {
                                const halfWidth = Math.sqrt(
                                    3 * this.state.variance
                                )

                                return Math.abs(x - this.state.mean) < halfWidth
                                    ? 1 / (2 * halfWidth)
                                    : 0
                            },
                            MIN_X: -10,
                            MAX_X: 10,
                            MAX_Y: 0.5,
                            N: 1000,
                        })}
                        style={{
                            stroke: "var(--primary-color)",
                            fill: "transparent",
                        }}
                    />

                    <line
                        x1="245"
                        x2="245"
                        y1="0"
                        y2="60"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <line
                        x1="240"
                        x2="345"
                        y1="55.5"
                        y2="55.5"
                        strokeWidth="0.5"
                        stroke="var(--gray)"
                    />
                    <path
                        d={plotFunction({
                            xStart: 245,
                            xEnd: 345,
                            yStart: 5,
                            yEnd: 55,
                            f: (x) => {
                                const theta =
                                    this.state.variance / this.state.mean
                                const k =
                                    (this.state.mean * this.state.mean) /
                                    this.state.variance

                                console.log(theta, k)
                                const y =
                                    (1 /
                                        (mathjs.gamma(k) *
                                            Math.pow(theta, k))) *
                                    Math.pow(x, k - 1) *
                                    Math.exp(-x / theta)
                                return Math.abs(y) === Infinity ? 10000 : y
                            },
                            MIN_X: 0,
                            MAX_X: 20,
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

function plotMeasurements({
    xStart,
    xEnd,
    yStart,
    yEnd,
    xs,
    ys,
    MAX_X,
    MIN_X,
    MIN_Y,
    MAX_Y,
}) {
    if (xs.length === 0) return ""
    MIN_X = MIN_X === undefined ? Math.min(...xs) : MIN_X
    MIN_Y = MIN_Y === undefined ? Math.min(...ys) : MIN_Y
    MAX_X = MAX_X === undefined ? Math.max(...xs) : MAX_X
    MAX_Y = MAX_Y === undefined ? Math.max(...ys) : MAX_Y

    const X_DELTA = MAX_X - MIN_X
    const Y_DELTA = MAX_Y - MIN_Y

    let points = xs.map((_, i) => ({
        x: xStart + (xEnd - xStart) * ((xs[i] - MIN_X) / X_DELTA),
        y: yStart + (yEnd - yStart) * (1 - (ys[i] - MIN_Y) / Y_DELTA),
    }))

    let d = `M ${points[0].x},${points[0].y}`
    for (let point of points) {
        d += ` L ${point.x},${point.y}`
    }

    return d
}

class Playground2 extends React.Component {
    state = {
        flips: 0,
        heads: 0,
        averages: [],
    }

    flipNCoins = (N) => {
        this.setState(({ flips, heads, averages }) => {
            let newHeads = flips + N > 200 ? 0 : heads
            let newFlips = flips + N > 200 ? 0 : flips
            let newAverages = flips + N > 200 ? [] : [...averages]

            for (let i = 0; i < N; i++) {
                newHeads = Math.random() > 0.5 ? newHeads + 1 : newHeads
                newFlips++
                newAverages.push(newHeads / newFlips)
            }

            return {
                flips: newFlips,
                heads: newHeads,
                averages: newAverages,
            }
        })
    }

    render() {
        return (
            <div
                style={{
                    margin: "16px auto",
                    display: "block",
                    maxHeight: "200px",
                    gridTemplateRows: "64px auto",
                }}
            >
                <div style={{ width: "fit-content", margin: "auto" }}>
                    <button onClick={() => this.flipNCoins(1)}>
                        Flip a Coin
                    </button>
                    &nbsp;&nbsp;
                    <button onClick={() => this.flipNCoins(20)}>
                        Flip 20 coins
                    </button>
                    &nbsp;&nbsp;
                    <button onClick={() => this.flipNCoins(200)}>
                        Flip 200 coins
                    </button>
                    &nbsp;&nbsp;
                    <button
                        onClick={() =>
                            this.setState({ flips: 0, heads: 0, averages: [] })
                        }
                    >
                        Reset
                    </button>
                </div>
                <svg
                    viewBox="0 -15 350 90"
                    style={{
                        margin: "auto 16px",
                        display: "block",
                        maxHeight: "200px",
                    }}
                >
                    <line
                        x1="25"
                        x2="25"
                        y1="0"
                        y2="60"
                        strokeWidth="0.5"
                        stroke="var(--text-color)"
                    />
                    <line
                        x1="25"
                        x2="325"
                        y1="55"
                        y2="55"
                        strokeWidth="0.5"
                        stroke="var(--text-color)"
                    />
                    <line
                        x1="25"
                        x2="325"
                        y1="30"
                        y2="30"
                        strokeWidth="0.5"
                        stroke="var(--blue)"
                        strokeOpacity="0.7"
                    />
                    <text
                        x="23"
                        y="32"
                        textAnchor="end"
                        fontSize="6"
                        fill="var(--text-color)"
                        fontFamily={`"Open Sans", Arial, sans-serif`}
                    >
                        50%
                    </text>
                    <text
                        x="23"
                        y="57"
                        textAnchor="end"
                        fontSize="6"
                        fontFamily={`"Open Sans", Arial, sans-serif`}
                        fill="var(--text-color)"
                    >
                        0%
                    </text>
                    <text
                        x="23"
                        y="7"
                        textAnchor="end"
                        fontSize="6"
                        fill="var(--text-color)"
                        fontFamily={`"Open Sans", Arial, sans-serif`}
                    >
                        100%
                    </text>
                    <text
                        x="175"
                        y="-2"
                        textAnchor="middle"
                        fontSize="7"
                        fontFamily={`"Open Sans", Arial, sans-serif`}
                    >
                        Heads percentage after N coin tosses
                    </text>
                    <path
                        d={plotMeasurements({
                            xStart: 25,
                            xEnd: 325,
                            yStart: 5,
                            yEnd: 55,
                            xs: this.state.averages
                                .map((_, i) => i + 1)
                                .slice(0, 200),
                            ys: this.state.averages,
                            MIN_X: 0,
                            MAX_X: 200,
                            MIN_Y: 0,
                            MAX_Y: 1,
                        })}
                        style={{
                            stroke: "var(--primary-color)",
                            fill: "transparent",
                        }}
                    />
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <>
                            <line
                                x1={25 + i * 30}
                                x2={25 + i * 30}
                                y1={52}
                                y2={58}
                                strokeWidth="0.5"
                                stroke="var(--gray)"
                                strokeOpacity="0.7"
                            />
                            <text
                                x={25 + i * 30}
                                y="65"
                                textAnchor="middle"
                                fontSize="6"
                                fontFamily={`"Open Sans", Arial, sans-serif`}
                                fill="var(--text-color)"
                            >
                                {i * 20}
                            </text>
                        </>
                    ))}
                </svg>
            </div>
        )
    }
}

export default {
    "statistics-chapter2-image1": Image1,
    "statistics-chapter2-image2": Image2,
    "statistics-chapter2-image3": Image3,
    "statistics-chapter2-playground1": Playground1,
    "statistics-chapter2-playground2": Playground2,
}
