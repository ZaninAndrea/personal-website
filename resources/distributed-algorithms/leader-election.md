The leader election algorithms have the goal of allowing a set of nodes to **choose a leader** autonomously; the leader can be any node, but it's important that only a single node behaves as leader at any time.

The core algorithm that each node follows is this (dots represent exchanged messages):

-   if you are the leader send a <dot class="gray"></dot> keep alive message to all other nodes every second
-   if you are not the leader
    -   wait a random period
    -   send all other nodes a <dot class="green"></dot> vote request
    -   if you receive a majority of the votes you become the leader
-   when you receive a <dot class="green"></dot> vote request and you have not yet voted, then you send a <dot class="blue"></dot> vote to the requesting node
-   when you receive a <dot class="gray"></dot> keep alive you recognize the sender as leader and you reset the timer to send a vote request

One issue that we have to solve is that a <dot class="blue"></dot> vote message in an old election could get delayed and be received when a new election has already started, thus making the vote count incorrect. To solve this the nodes use an **epoch** mechanism:

-   each node keeps track of the current epoch
-   when sending a message the node also includes its current epoch
-   when receiving a message: - if the epoch of the message is older than the node epoch the message is discarded, otherwise it is a valid message - if the epoch of the message is newer than the node epoch, then the node epoch is updated to match it

Before a node triggers a new election it increases its epoch by one, with this trick the nodes can have multiple election and vote in each election without risking that a delayed message is interpreted as a vote in the wrong election.

{{distributed-algorithms.leader-election}}

# Limitations

The nodes must know how many nodes there are in the network, otherwise they can't tell if they got a majority of the votes. If the communication between some nodes does not work then there may be 2 leaders at the same time (try to play around in the playground and see if you can get it to happen).  
Both those issues are solved by more sophisticated algorithms.
