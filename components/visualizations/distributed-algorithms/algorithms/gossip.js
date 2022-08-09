import styles from "../components/Graph.module.css"

export default function newNode(
    position,
    getId,
    initialContent,
    initialTimestamp
) {
    const epochTimestamp = +new Date()
    const DELTA = 3000
    const id = getId()
    const initialTimer = DELTA - Math.random() * 2000
    return {
        id,
        ui: {
            position,
            timerColor: "var(--green)",
            timerSize: initialTimer / DELTA,
        },
        data: {
            timer: initialTimer,
            timestamp: initialTimestamp,
            content: initialContent,
        },
        getTitle: function () {
            return this.id
        },
        getLabel: function (forceUpdate) {
            return (
                <table>
                    <tbody>
                        <tr key="timestamp">
                            <td key="label">Timestamp</td>
                            <td key="value">{this.data.timestamp}</td>
                        </tr>
                        <tr key="content">
                            <td key="label">Content</td>
                            <td key="value">
                                <input
                                    className={styles["node-field"]}
                                    value={this.data.content}
                                    onChange={(e) => {
                                        this.data.content = e.target.value
                                        this.data.timestamp =
                                            +new Date() - epochTimestamp
                                        forceUpdate()
                                    }}
                                ></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        },
        receivePacket: function (data, actions) {
            if (data.timestamp > this.data.timestamp) {
                this.data.timestamp = data.timestamp
                this.data.content = data.content
            }
        },
        loop: function (actions, timeStep, nodes, edges) {
            this.data.timer -= timeStep
            this.ui.timerSize = this.data.timer / DELTA

            if (this.data.timer <= 0) {
                this.data.timer = DELTA
                const adjacentEdges = edges.filter(
                    (e) => e.source === this.id || e.target === this.id
                )
                if (adjacentEdges.length === 0) return

                const peerEdge =
                    adjacentEdges[
                        Math.floor(Math.random() * adjacentEdges.length)
                    ]
                const peerId =
                    peerEdge.source === this.id
                        ? peerEdge.target
                        : peerEdge.source
                actions.send(
                    {
                        timestamp: this.data.timestamp,
                        content: this.data.content,
                    },
                    peerId,
                    "var(--green)",
                    "Content update"
                )
            }
        },
    }
}
