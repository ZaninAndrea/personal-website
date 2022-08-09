import React from "react"

class Image1 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            highlightedIds: [],
        }
    }

    componentDidMount() {
        this.rectangleLabel = document.getElementById("label-rectangle")
        this.squareLabel = document.getElementById("label-square")
        this.square6Label = document.getElementById("label-square6")
        this.evenSquaresLabel = document.getElementById("label-even-squares")

        this.rectangleLabel.onmouseenter = () => {
            this.rectangleLabel.classList.add("label-highlighted")
            this.setState({ highlightedIds: [0, 1, 2, 3, 4, 5] })
        }
        this.rectangleLabel.onmouseleave = () => {
            this.rectangleLabel.classList.remove("label-highlighted")
            this.setState({ highlightedIds: [] })
        }

        this.evenSquaresLabel.onmouseenter = () => {
            this.evenSquaresLabel.classList.add("label-highlighted")
            this.setState({ highlightedIds: [1, 3, 5] })
        }
        this.evenSquaresLabel.onmouseleave = () => {
            this.evenSquaresLabel.classList.remove("label-highlighted")
            this.setState({ highlightedIds: [] })
        }

        this.square6Label.onmouseenter = () => {
            this.square6Label.classList.add("label-highlighted")
            this.setState({ highlightedIds: [5] })
        }
        this.square6Label.onmouseleave = () => {
            this.square6Label.classList.remove("label-highlighted")
            this.setState({ highlightedIds: [] })
        }

        this.squareLabel.onmouseenter = () => {
            this.squareLabel.classList.add("label-highlighted")
            this.setState({ highlightedIds: [0] })
            this.carouselInterval = setInterval(
                () =>
                    this.setState(({ highlightedIds }) => ({
                        highlightedIds: [(highlightedIds[0] + 1) % 6],
                    })),
                500
            )
        }
        this.squareLabel.onmouseleave = () => {
            this.squareLabel.classList.remove("label-highlighted")
            this.setState({ highlightedIds: [] })
            clearInterval(this.carouselInterval)
        }
    }

    render() {
        return (
            <svg
                viewBox="0 0 300 50"
                style={{
                    margin: "16px auto",
                    display: "block",
                    maxHeight: "100px",
                }}
            >
                {[0, 1, 2, 3, 4, 5].map((id) => (
                    <rect
                        key={id}
                        x={id * 50}
                        y="1"
                        width="49"
                        height="49"
                        style={
                            this.state.highlightedIds.indexOf(id) !== -1
                                ? {
                                      fill: "var(--primary-color)",
                                      transition: "fill 0.2s ease",
                                  }
                                : {
                                      fill: "var(--gray)",
                                      transition: "fill 0.2s ease",
                                  }
                        }
                    />
                ))}
            </svg>
        )
    }
}

function Image2() {
    return (
        <svg
            viewBox="0 -4 304 60"
            style={{
                margin: "16px auto",
                display: "block",
                maxHeight: "100px",
            }}
        >
            {[0, 1, 2, 3, 4, 5].map((id) => (
                <rect
                    key={id}
                    x={id * 50}
                    y="1"
                    width="49"
                    height="49"
                    style={{ fill: "var(--gray)" }}
                />
            ))}
        </svg>
    )
}

class Image3 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            highlightedIds: [],
        }
    }

    componentDidMount() {
        this.even3Label = document.getElementById("label-even-roll3")
        this.remainingLabel = document.getElementById("label-remaining-area")
        this.eventSpaceLabel = document.getElementById("label-event-space-3")

        this.even3Label.onmouseenter = () => {
            this.even3Label.classList.add("label-highlighted")
            this.setState({ highlightedIds: [1, 3, 5] })
        }
        this.even3Label.onmouseleave = () => {
            this.even3Label.classList.remove("label-highlighted")
            this.setState({ highlightedIds: [] })
        }

        this.remainingLabel.onmouseenter = () => {
            this.remainingLabel.classList.add("label-highlighted")
            this.setState({ highlightedIds: [3, 5] })
        }
        this.remainingLabel.onmouseleave = () => {
            this.remainingLabel.classList.remove("label-highlighted")
            this.setState({ highlightedIds: [] })
        }

        this.eventSpaceLabel.onmouseenter = () => {
            this.eventSpaceLabel.classList.add("label-highlighted")
            this.setState({ highlightedIds: [3, 4, 5] })
        }
        this.eventSpaceLabel.onmouseleave = () => {
            this.eventSpaceLabel.classList.remove("label-highlighted")
            this.setState({ highlightedIds: [] })
        }
    }

    render() {
        return (
            <svg
                viewBox="0 -4 304 60"
                style={{
                    margin: "16px auto",
                    display: "block",
                    maxHeight: "100px",
                }}
            >
                {[0, 1, 2, 3, 4, 5].map((id) => (
                    <rect
                        key={id}
                        x={id * 50}
                        y="1"
                        width="49"
                        height="49"
                        style={
                            this.state.highlightedIds.indexOf(id) !== -1
                                ? {
                                      fill: "var(--primary-color)",
                                      transition: "fill 0.2s ease",
                                  }
                                : {
                                      fill: "var(--gray)",
                                      transition: "fill 0.2s ease",
                                  }
                        }
                    />
                ))}
                <rect
                    key="border"
                    x={147}
                    y={-2}
                    width="155"
                    height="55"
                    style={{
                        stroke: "var(--primary-color)",
                        strokeWidth: "4px",
                        fillOpacity: "0",
                    }}
                />
            </svg>
        )
    }
}

class Image4 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            highlightedIds: [],
        }
    }

    componentDidMount() {
        this.areaBLabel = document.getElementById("label-areaB")
        this.areaBALabel = document.getElementById("label-areaBA")
        this.areaBACLabel = document.getElementById("label-areaBAC")

        this.areaBLabel.onmouseenter = () => {
            this.areaBLabel.classList.add("label-highlighted")
            this.setState({ highlightedIds: [0, 1, 4, 5] })
        }
        this.areaBLabel.onmouseleave = () => {
            this.areaBLabel.classList.remove("label-highlighted")
            this.setState({ highlightedIds: [] })
        }

        this.areaBALabel.onmouseenter = () => {
            this.areaBALabel.classList.add("label-highlighted")
            this.setState({ highlightedIds: [5] })
        }
        this.areaBALabel.onmouseleave = () => {
            this.areaBALabel.classList.remove("label-highlighted")
            this.setState({ highlightedIds: [] })
        }

        this.areaBACLabel.onmouseenter = () => {
            this.areaBACLabel.classList.add("label-highlighted")
            this.setState({ highlightedIds: [0, 1, 4] })
        }
        this.areaBACLabel.onmouseleave = () => {
            this.areaBACLabel.classList.remove("label-highlighted")
            this.setState({ highlightedIds: [] })
        }
    }

    render() {
        return (
            <svg
                viewBox="0 0 200 200"
                style={{
                    margin: "16px auto",
                    display: "block",
                    maxHeight: "200px",
                }}
            >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                    (id) => (
                        <rect
                            key={id}
                            x={(id % 4) * 50}
                            y={Math.floor(id / 4) * 50}
                            width="44"
                            height="44"
                            style={
                                this.state.highlightedIds.indexOf(id) !== -1
                                    ? {
                                          fill: "var(--primary-color)",
                                          transition: "fill 0.2s ease",
                                      }
                                    : {
                                          fill: "var(--gray)",
                                          transition: "fill 0.2s ease",
                                      }
                            }
                        />
                    )
                )}
                <rect
                    key="border"
                    x={47}
                    y={47}
                    width="100"
                    height="100"
                    style={{
                        stroke: "var(--blue)",
                        strokeWidth: "3px",
                        fillOpacity: "0",
                    }}
                />
            </svg>
        )
    }
}

export default {
    "statistics-chapter1-image1": Image1,
    "statistics-chapter1-image2": Image2,
    "statistics-chapter1-image3": Image3,
    "statistics-chapter1-image4": Image4,
}
