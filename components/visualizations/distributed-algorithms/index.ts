import LeaderElection from "./leader-election"
import GossipPush from "./gossip-push"

const visualizationMap: { [slug: string]: any } = {
    "distributed-algorithms.leader-election": LeaderElection,
    "distributed-algorithms.gossip-push": GossipPush,
}

export default visualizationMap
