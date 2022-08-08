There are hundreds of variants of gossip protocols, each specific for a given use case, but in general a gossip protocol is a way to spread information in a network of nodes that relies on periodic **random pairings** between nodes.

## A naive approach

We have some data that we want to keep synced among all nodes in the network, thus when the data is updated in one node <square class="blue"></square> the new value must be propagated to all nodes. We could simply send an update message from <square class="blue"></square> to all other nodes, but in several cases this simple solution fails, for example:

-   if the node <square class="blue"></square> crashes after sending the update to only some nodes, the nodes don't have a way to converge all to the same value
-   if there are many nodes sending the new data to each of them could take a long time, e.g. a peer-to-peer file sharing service

## The gossip approach

Another approach to solve the same problem is a gossip protocol: each node every $\Delta$ seconds chooses another random node in the network and exchanges messages with that node to synchronize their data.  
The details of how data is synchronize can vary and depend also on the underlying datatype, for simplicity we consider a push gossip protocol:

-   each node keeps a copy of the data and a last updated timestamp
-   every $\Delta$ seconds
    -   the node chooses another node <square class="green"></square> to which it is connected
    -   the node sends a message <dot class="green"></dot> containing the current data and timestamp to <square class="green"></square>
-   upon receiving a message <dot class="green"></dot>
    -   if the timestamp in the message is later than the last updated value of the node, replace both the timestamp and the data with the ones in the message
    -   otherwise simply discard the message

{{gossip-push}}

## Performance analysis

In the playground above you can check for yourself that the gossip protocol solves the issues highlighted in the naive approach, furthermore it is doesn't need all nodes to be connected to all nodes, it's sufficient that the network is not partitioned.

This increased robustness comes at the expense of efficiency: the naive approach sends just one message for each node in the network, while the gossip approach may send multiple times the same update to the same node.  
Although the gossip approach sends more messages it can take less time to fully propagate the data depending on the throughput and latency of the connections. Qualitatively we can consider the following two extreme cases:

-   if the throughput is very high with respect to the latency then the naive approach is faster
-   if the throughput is very low with respect to the latency then the gossip approach is faster
