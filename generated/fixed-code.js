function calculateAverage(numbers) {
    if (!Array.isArray(numbers)) {
        throw new TypeError('Input must be an array of numbers.');
    }

    if (numbers.length === 0) {
        throw new Error('Cannot calculate the average of an empty array.');
    }

    let total = 0;

    for (let i = 0; i < numbers.length; i++) {
        if (typeof numbers[i] !== 'number' || !Number.isFinite(numbers[i])) {
            throw new TypeError('All array values must be finite numbers.');
        }

        total += numbers[i];
    }

    return total / numbers.length;
}

console.log(calculateAverage([10, 20, 30]));
