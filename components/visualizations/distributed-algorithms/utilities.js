export function fullyConnectedEdges(nodes, getId) {
    let edges = []
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            edges.push({
                source: nodes[i].id,
                target: nodes[j].id,
                id: getId(),
            })
        }
    }

    return edges
}
