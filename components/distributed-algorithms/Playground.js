import React from "react"
import Graph from "./Graph"
import cloneDeep from "clone-deep"
import newNode from "./algorithms/election"

function updateSimulation({ packets, nodes, edges }, timeInterval, getId) {
    let newNodes = cloneDeep(nodes)
    let newEdges = cloneDeep(edges)
    let newPackets = cloneDeep(packets).map((p) => ({
        ...p,
        position: p.position + p.speed * timeInterval,
    }))

    function createActions(node) {
        return {
            broadcast: (data, color, title) => {
                for (let target of newNodes) {
                    if (target.id === node.id) continue

                    let forwardEdge = newEdges.filter(
                        (e) => e.target === target.id && e.source === node.id
                    )[0]
                    if (forwardEdge) {
                        newPackets.push({
                            edge: forwardEdge.id,
                            position: 0,
                            id: getId(),
                            speed: 0.0005,
                            data,
                            color,
                            title,
                        })
                        continue
                    }

                    let backwardEdge = newEdges.filter(
                        (e) => e.source === target.id && e.target === node.id
                    )[0]
                    if (backwardEdge) {
                        newPackets.push({
                            edge: backwardEdge.id,
                            position: 1,
                            id: getId(),
                            speed: -0.0005,
                            data,
                            color,
                            title,
                        })
                        continue
                    }
                }
            },
            send: (data, targetId, color, title) => {
                let forwardEdge = newEdges.filter(
                    (e) => e.target === targetId && e.source === node.id
                )[0]
                if (forwardEdge) {
                    newPackets.push({
                        edge: forwardEdge.id,
                        position: 0,
                        id: getId(),
                        speed: 0.0005,
                        data,
                        color,
                        title,
                    })
                    return
                }

                let backwardEdge = newEdges.filter(
                    (e) => e.source === targetId && e.target === node.id
                )[0]
                if (backwardEdge) {
                    newPackets.push({
                        edge: backwardEdge.id,
                        position: 1,
                        id: getId(),
                        speed: -0.0005,
                        data,
                        color,
                        title,
                    })
                    return
                }

                console.log(
                    "Connecting edge not found",
                    newEdges,
                    targetId,
                    node.id
                )
            },
        }
    }

    for (let i = newPackets.length - 1; i >= 0; i--) {
        const p = newPackets[i]
        if (p.position > 1) {
            const targetId = newEdges.filter((e) => e.id === p.edge)[0].target
            const target = newNodes.filter((n) => n.id === targetId)[0]
            target.receivePacket(p.data, createActions(target))
            newPackets.splice(i, 1)
        } else if (p.position < 0) {
            const targetId = newEdges.filter((e) => e.id === p.edge)[0].source
            const target = newNodes.filter((n) => n.id === targetId)[0]
            target.receivePacket(p.data, createActions(target))
            newPackets.splice(i, 1)
        }
    }

    for (let node of newNodes) {
        node.loop(createActions(node), timeInterval, nodes, edges)
    }

    return {
        nodes: newNodes,
        packets: newPackets,
        edges: newEdges,
    }
}

class DistributedPlayground extends React.Component {
    state = {
        nodes: [],
        edges: [],
        packets: [],
        playing: false,
    }

    counter = 0

    constructor(props) {
        super(props)

        this.state.nodes = props.initialNodes
        this.state.edges = props.initialEdges
        this.state.packets = props.initialPackets
    }

    getId = () => this.counter++
    resetId = () => {
        this.counter = 0
    }

    runSimulation = () => {
        const timeInterval = new Date() - this.lastExecution
        this.setState((oldState) =>
            updateSimulation(oldState, timeInterval, this.getId)
        )
        this.lastExecution = new Date()

        if (this.state.playing) {
            requestAnimationFrame(this.runSimulation)
        }
    }

    render() {
        return (
            <div
                className="distributed-playground"
                style={{ height: this.props.height }}
            >
                <Graph
                    title="Leader election"
                    nodes={this.state.nodes}
                    edges={this.state.edges}
                    packets={this.state.packets}
                    onNodesChange={(newNodes) =>
                        this.setState({ nodes: newNodes })
                    }
                    resetSimulation={() => {
                        this.resetId()
                        this.setState({
                            nodes: this.props.initialNodes,
                            edges: this.props.initialEdges,
                            packets: this.props.initialPackets,
                            playing: false,
                        })
                    }}
                    deleteNode={(id) =>
                        this.setState(({ nodes, edges, packets }) => {
                            const newNodes = nodes.filter(
                                (node) => node.id !== id
                            )
                            const nodeIds = newNodes.map((n) => n.id)
                            const newEdges = edges.filter(
                                (e) =>
                                    nodeIds.indexOf(e.source) !== -1 &&
                                    nodeIds.indexOf(e.target) !== -1
                            )
                            const edgeIds = newEdges.map((e) => e.id)
                            const newPackets = packets.filter(
                                (p) => edgeIds.indexOf(p.edge) !== -1
                            )

                            return {
                                nodes: newNodes,
                                edges: newEdges,
                                packets: newPackets,
                            }
                        })
                    }
                    deleteEdge={(id) =>
                        this.setState(({ nodes, edges, packets }) => {
                            const newEdges = edges.filter((e) => e.id !== id)
                            const edgeIds = newEdges.map((e) => e.id)
                            const newPackets = packets.filter(
                                (p) => edgeIds.indexOf(p.edge) !== -1
                            )

                            return {
                                edges: newEdges,
                                packets: newPackets,
                            }
                        })
                    }
                    deletePacket={(id) =>
                        this.setState(({ nodes, edges, packets }) => {
                            const newPackets = packets.filter(
                                (p) => p.id !== id
                            )

                            return {
                                packets: newPackets,
                            }
                        })
                    }
                    addEdge={(source, target) => {
                        const edgeExists =
                            this.state.edges.filter(
                                (e) =>
                                    e.source === source && e.target === target
                            ).length > 0

                        if (!edgeExists) {
                            this.setState(({ edges }) => {
                                return {
                                    edges: [
                                        ...edges,
                                        {
                                            source,
                                            target,
                                            id: this.getId(),
                                        },
                                    ],
                                }
                            })
                        }
                    }}
                    playing={this.state.playing}
                    onTogglePlaying={() => {
                        this.setState(
                            ({ playing }) => {
                                return { playing: !playing }
                            },
                            () => {
                                if (this.state.playing) {
                                    this.lastExecution = new Date()
                                    this.runSimulation()
                                }
                            }
                        )
                    }}
                />
            </div>
        )
    }
}

export default DistributedPlayground
