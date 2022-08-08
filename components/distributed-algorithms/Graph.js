import React from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import PanToolIcon from "@mui/icons-material/PanTool"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import RefreshIcon from "@mui/icons-material/Refresh"
import HelpIcon from "@mui/icons-material/Help"
import CloseIcon from "@mui/icons-material/Close"

export default class Graph extends React.Component {
    state = {
        draggingNode: null,
        offsetX: 0,
        offsetY: 0,
        activeTool: "pan",
        sourceNode: null,
        mouseX: 0,
        mouseY: 0,
        tutorialOpen: false,
    }

    render() {
        if (this.state.tutorialOpen) {
            return (
                <div className="playground-tutorial">
                    <div className="playground-tutorial-header">
                        <h3>Commands</h3>
                        <IconButton
                            aria-label="refresh"
                            onClick={() =>
                                this.setState({ tutorialOpen: false })
                            }
                            sx={{ color: "black" }}
                            title="Close"
                            key="close-button"
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <PlayArrowIcon />
                                    <PauseIcon />
                                </td>
                                <td>Start and stop the simulation.</td>
                            </tr>
                            <tr>
                                <td>
                                    <RefreshIcon />
                                </td>
                                <td>
                                    Reset the simulation to the initial state.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <PanToolIcon />
                                </td>
                                <td>
                                    When enabled you can move around the various
                                    nodes.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <AddCircleIcon />
                                </td>
                                <td>
                                    When enabled you can drag the mouse from one
                                    node to another while holding the left
                                    button to create a new connection.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <DeleteIcon />
                                </td>
                                <td>
                                    When enabled you can click on a node to
                                    delete it or drag over a connection while
                                    pressing the left button to cut it.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }

        const nodeMap = {}
        for (let node of this.props.nodes) {
            nodeMap[node.id] = node.ui.position
        }
        const edgeMap = {}
        for (let edge of this.props.edges) {
            edgeMap[edge.id] = edge
        }

        return (
            <>
                <div className="graph-sidebar">
                    <div className="graph-player">
                        <IconButton
                            aria-label="playpause"
                            onClick={this.props.onTogglePlaying}
                            sx={{ color: "black" }}
                            title={this.props.playing ? "Pause" : "Start"}
                        >
                            {this.props.playing ? (
                                <PauseIcon />
                            ) : (
                                <PlayArrowIcon />
                            )}
                        </IconButton>
                        <IconButton
                            aria-label="refresh"
                            onClick={() => this.props.resetSimulation()}
                            sx={{ color: "black" }}
                            title="Reset"
                        >
                            <RefreshIcon />
                        </IconButton>
                        <IconButton
                            aria-label="refresh"
                            onClick={() =>
                                this.setState({ tutorialOpen: true })
                            }
                            sx={{ color: "black" }}
                            title="Tutorial"
                        >
                            <HelpIcon />
                        </IconButton>
                    </div>
                    <div className="graph-tools">
                        <IconButton
                            aria-label="pan"
                            title="Drag"
                            sx={{
                                color:
                                    this.state.activeTool === "pan"
                                        ? "var(--primary-color)"
                                        : "black",
                            }}
                            onClick={() => this.setState({ activeTool: "pan" })}
                        >
                            <PanToolIcon />
                        </IconButton>
                        <IconButton
                            aria-label="add"
                            title="Connect"
                            sx={{
                                color:
                                    this.state.activeTool === "add"
                                        ? "var(--primary-color)"
                                        : "black",
                            }}
                            onClick={() =>
                                this.setState({
                                    activeTool: "add",
                                    sourceNode: null,
                                })
                            }
                        >
                            <AddCircleIcon />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            title="Delete"
                            sx={{
                                color:
                                    this.state.activeTool === "delete"
                                        ? "var(--primary-color)"
                                        : "black",
                            }}
                            onClick={() =>
                                this.setState({ activeTool: "delete" })
                            }
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
                <div className="graph-container">
                    <div
                        ref={(el) => {
                            this.container = el
                        }}
                        className="graph-main"
                        onMouseUp={(e) => {
                            if (this.state.draggingNode !== null) {
                                this.setState({ draggingNode: null })
                            } else if (this.state.sourceNode !== null) {
                                this.setState({ sourceNode: null })
                            }
                        }}
                        onMouseMove={(e) => {
                            if (this.state.draggingNode !== null) {
                                const rect =
                                    this.container.getBoundingClientRect()
                                const newX =
                                    e.clientX - rect.x - this.state.offsetX
                                const newY =
                                    e.clientY - rect.y - this.state.offsetY

                                const newNodes = this.props.nodes.map((node) =>
                                    node.id !== this.state.draggingNode
                                        ? node
                                        : {
                                              ...node,
                                              ui: {
                                                  ...node.ui,
                                                  position: {
                                                      x: newX,
                                                      y: newY,
                                                  },
                                              },
                                          }
                                )
                                this.props.onNodesChange(newNodes)
                            } else if (this.state.sourceNode !== null) {
                                const rect =
                                    this.container.getBoundingClientRect()
                                const mouseX = e.clientX - rect.x
                                const mouseY = e.clientY - rect.y
                                this.setState({ mouseX, mouseY })
                            }
                        }}
                    >
                        {this.props.nodes.map((node) => (
                            <div
                                className="graph-node"
                                style={{
                                    top: node.ui.position.y + "px",
                                    left: node.ui.position.x + "px",
                                }}
                                key={node.id}
                            >
                                <div
                                    className="graph-node-body"
                                    style={{
                                        cursor:
                                            ["pan", "delete"].indexOf(
                                                this.state.activeTool
                                            ) !== -1
                                                ? "pointer"
                                                : "default",
                                    }}
                                    onMouseDown={(e) => {
                                        if (e.button === 0) {
                                            if (
                                                this.state.activeTool === "pan"
                                            ) {
                                                const rect =
                                                    this.container.getBoundingClientRect()
                                                const clickedX =
                                                    e.clientX - rect.x
                                                const clickedY =
                                                    e.clientY - rect.y
                                                this.setState({
                                                    draggingNode: node.id,
                                                    offsetX:
                                                        clickedX -
                                                        node.ui.position.x,
                                                    offsetY:
                                                        clickedY -
                                                        node.ui.position.y,
                                                })
                                            } else if (
                                                this.state.activeTool ===
                                                "delete"
                                            ) {
                                                this.props.deleteNode(node.id)
                                            } else if (
                                                this.state.activeTool === "add"
                                            ) {
                                                const rect =
                                                    this.container.getBoundingClientRect()
                                                const mouseX =
                                                    e.clientX - rect.x
                                                const mouseY =
                                                    e.clientY - rect.y
                                                this.setState({
                                                    sourceNode: node.id,
                                                    mouseX,
                                                    mouseY,
                                                })
                                            }
                                        }
                                    }}
                                    onMouseUp={(e) => {
                                        if (e.button === 0) {
                                            if (
                                                this.state.sourceNode !==
                                                    null &&
                                                this.state.sourceNode !==
                                                    node.id
                                            ) {
                                                this.props.addEdge(
                                                    this.state.sourceNode,
                                                    node.id
                                                )
                                            }
                                        }
                                    }}
                                >
                                    <div className="graph-node-title">
                                        {node.getTitle()}
                                    </div>

                                    {node.ui.timerSize !== null && (
                                        <div
                                            className="graph-node-timer"
                                            style={{
                                                background:
                                                    node.ui.timerColor ||
                                                    "blue",
                                                width:
                                                    node.ui.timerSize * 100 +
                                                    "%",
                                            }}
                                        />
                                    )}
                                    <div className="graph-node-content">
                                        {node.getLabel(() =>
                                            this.forceUpdate()
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <svg className="graph-svg">
                            {this.state.sourceNode !== null && (
                                <line
                                    x1={nodeMap[this.state.sourceNode].x}
                                    y1={nodeMap[this.state.sourceNode].y}
                                    x2={this.state.mouseX}
                                    y2={this.state.mouseY}
                                    stroke="black"
                                    strokeWidth="2px"
                                    key={"drag-line"}
                                />
                            )}
                            {this.props.edges.map((edge) => (
                                <>
                                    <line
                                        x1={nodeMap[edge.source].x}
                                        y1={nodeMap[edge.source].y}
                                        x2={nodeMap[edge.target].x}
                                        y2={nodeMap[edge.target].y}
                                        stroke="transparent"
                                        strokeWidth="10px"
                                        key={edge.id + "|shadow"}
                                        onMouseOver={(e) => {
                                            if (
                                                e.buttons === 1 &&
                                                this.state.activeTool ===
                                                    "delete"
                                            )
                                                this.props.deleteEdge(edge.id)
                                        }}
                                    />
                                    <line
                                        x1={nodeMap[edge.source].x}
                                        y1={nodeMap[edge.source].y}
                                        x2={nodeMap[edge.target].x}
                                        y2={nodeMap[edge.target].y}
                                        stroke="black"
                                        strokeWidth="2px"
                                        key={edge.id}
                                    />
                                </>
                            ))}
                            {this.props.packets.map((packet) => (
                                <circle
                                    onClick={() =>
                                        this.props.deletePacket(packet.id)
                                    }
                                    cx={
                                        nodeMap[edgeMap[packet.edge].target].x *
                                            packet.position +
                                        nodeMap[edgeMap[packet.edge].source].x *
                                            (1 - packet.position)
                                    }
                                    cy={
                                        nodeMap[edgeMap[packet.edge].target].y *
                                            packet.position +
                                        nodeMap[edgeMap[packet.edge].source].y *
                                            (1 - packet.position)
                                    }
                                    r="10px"
                                    key={packet.id}
                                    id={"graph-edge-" + packet.id}
                                    fill={packet.color}
                                >
                                    <title>{packet.title}</title>
                                </circle>
                            ))}
                        </svg>
                    </div>
                </div>
            </>
        )
    }
}
