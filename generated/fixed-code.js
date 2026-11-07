function calculateAverage(numbers) {
    if (!Array.isArray(numbers)) {
        throw new TypeError('Input must be an array of numbers.');
    }

    if (numbers.length === 0) {
        throw new Error('Cannot calculate the average of an empty array.');
    }

    let scale = 0;

    for (let i = 0; i < numbers.length; i++) {
        if (typeof numbers[i] !== 'number' || !Number.isFinite(numbers[i])) {
            throw new TypeError('All array values must be finite numbers.');
        }

        scale = Math.max(scale, Math.abs(numbers[i]));
    }

    if (scale === 0) {
        return 0;
    }

    let scaledTotal = 0;
    let compensation = 0;

    for (let i = 0; i < numbers.length; i++) {
        const value = numbers[i] / scale;
        const nextTotal = scaledTotal + value;

        if (Math.abs(scaledTotal) >= Math.abs(value)) {
            compensation += (scaledTotal - nextTotal) + value;
        } else {
            compensation += (value - nextTotal) + scaledTotal;
        }

        scaledTotal = nextTotal;
    }

    const normalizedAverage = (scaledTotal + compensation) / numbers.length;
    return Math.max(-1, Math.min(1, normalizedAverage)) * scale;
}

console.log(calculateAverage([10, 20, 30]));
