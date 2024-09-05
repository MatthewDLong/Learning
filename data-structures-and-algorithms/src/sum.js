const recursiveSum = (n) => {
    return n * (n + 1) / 2;
}

const iterativeSum = (n) => {
    let count = 0;
    for (let i = 1; i <= n; i++) {
        count += i;
    }
    return count;
}

module.exports = {
    recursiveSum,
    iterativeSum
}
