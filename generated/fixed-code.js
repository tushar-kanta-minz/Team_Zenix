
function calculateAverage(numbers) {
    // Validate input
    if (!Array.isArray(numbers)) {
        throw new TypeError("Input must be an array");
    }

    // Handle empty array
    if (numbers.length === 0) {
        throw new Error("Array cannot be empty");
    }

    let sum = 0;

    // Corrected loop condition
    for (let i = 0; i < numbers.length; i++) {
        if (typeof numbers[i] !== "number" || !Number.isFinite(numbers[i])) {
            throw new TypeError("Array must contain only finite numbers");
        }

        sum += numbers[i];
    }

    return sum / numbers.length;
}

// Example
console.log(calculateAverage([10, 20, 30])); // 20

module.exports = calculateAverage;

