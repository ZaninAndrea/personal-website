export function plotFunction({
    xStart,
    xEnd,
    yStart,
    yEnd,
    N,
    f,
    MIN_X,
    MAX_X,
    MAX_Y,
    closed,
}) {
    if (closed === undefined) closed = false
    if (!N) N = 100
    let points = []

    for (let i = 0; i <= N; i++) {
        const x = (MAX_X - MIN_X) * (i / N) + MIN_X
        const y = f(x)
        points.push({ x, y })
    }

    const X_DELTA = MAX_X - MIN_X

    const Y_DELTA = MAX_Y ? MAX_Y : Math.max(...points.map((p) => p.y)) - 0
    points = points.map(({ x, y }) => ({
        x: xStart + (xEnd - xStart) * ((x - MIN_X) / X_DELTA),
        y: yStart + (yEnd - yStart) * (1 - (y - 0) / Y_DELTA),
    }))

    let d = `M ${points[0].x},${points[0].y}`
    points.shift()
    for (let point of points) {
        d += ` L ${point.x},${point.y}`
    }

    return d + (closed ? ` L ${xEnd},${yEnd} L ${xStart},${yEnd} Z` : "")
}

export function gaussianPath({
    xStart,
    xEnd,
    yStart,
    yEnd,
    N,
    sigma,
    mu,
    closed,
    MAX_Y,
}) {
    if (sigma === undefined) sigma = 5
    if (mu === undefined) mu = 0
    const sigma2 = sigma * sigma
    const normalizationFactor = 1 / (sigma * Math.sqrt(2 * Math.PI))

    const f = (x) =>
        normalizationFactor * Math.exp((-0.5 * (x - mu) * (x - mu)) / sigma2)
    return plotFunction({
        xStart,
        xEnd,
        yStart,
        yEnd,
        N,
        MIN_X: -20,
        MAX_X: 20,
        MAX_Y,
        MIN_Y: 0,
        f,
        closed,
    })
}

export function plotMeasurements({
    xStart,
    xEnd,
    yStart,
    yEnd,
    xs,
    ys,
    MAX_X,
    MIN_X,
    MIN_Y,
    MAX_Y,
}) {
    if (xs.length === 0) return ""
    MIN_X = MIN_X === undefined ? Math.min(...xs) : MIN_X
    MIN_Y = MIN_Y === undefined ? Math.min(...ys) : MIN_Y
    MAX_X = MAX_X === undefined ? Math.max(...xs) : MAX_X
    MAX_Y = MAX_Y === undefined ? Math.max(...ys) : MAX_Y

    const X_DELTA = MAX_X - MIN_X
    const Y_DELTA = MAX_Y - MIN_Y

    let points = xs.map((_, i) => ({
        x: xStart + (xEnd - xStart) * ((xs[i] - MIN_X) / X_DELTA),
        y: yStart + (yEnd - yStart) * (1 - (ys[i] - MIN_Y) / Y_DELTA),
    }))

    let d = `M ${points[0].x},${points[0].y}`
    for (let point of points) {
        d += ` L ${point.x},${point.y}`
    }

    return d
}
