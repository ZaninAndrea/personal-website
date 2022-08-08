import LeaderElection from "./leader-election"
import GossipPush from "./gossip-push"

const visualizationMap: { [slug: string]: any } = {
    "leader-election": LeaderElection,
    "gossip-push": GossipPush,
}

export default visualizationMap
