import DistributedPlayground from "./components/Playground"
import newGossipNode from "./algorithms/gossip"
import { fullyConnectedEdges } from "./utilities"

export default function GossipPush() {
    let counter = 0
    const letters = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
    ]
    let getId = function () {
        return letters[counter++]
    }
    const initialNodes = [
        newGossipNode({ x: 110, y: 80 }, getId, "New", 1),
        newGossipNode({ x: 430, y: 80 }, getId, "Old", 0),
        newGossipNode({ x: 430, y: 500 }, getId, "Old", 0),
        newGossipNode({ x: 110, y: 500 }, getId, "Old", 0),
        newGossipNode({ x: 650, y: 290 }, getId, "Old", 0),
    ]
    return (
        <DistributedPlayground
            initialNodes={initialNodes}
            initialEdges={fullyConnectedEdges(initialNodes, function () {
                return "init-" + counter++
            })}
            initialPackets={[]}
            height={"700px"}
        />
    )
}
