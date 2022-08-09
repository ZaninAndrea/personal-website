import DistributedPlayground from "./components/Playground"
import newLeaderElectionNode from "./algorithms/election"
import { fullyConnectedEdges } from "./utilities"

export default function LeaderElection() {
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
        newLeaderElectionNode({ x: 110, y: 80 }, getId),
        newLeaderElectionNode({ x: 430, y: 80 }, getId),
        newLeaderElectionNode({ x: 430, y: 500 }, getId),
        newLeaderElectionNode({ x: 110, y: 500 }, getId),
        newLeaderElectionNode({ x: 650, y: 290 }, getId),
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
