
const assert = require("assert");
const calculateAverage = require("./fixed-code");

// Test 1: Normal array
assert.strictEqual(
    calculateAverage([10, 20, 30]),
    20
);
console.log("Test 1 passed: Normal array");

// Test 2: Single element
assert.strictEqual(
    calculateAverage([50]),
    50
);
console.log("Test 2 passed: Single element");

// Test 3: Negative numbers
assert.strictEqual(
    calculateAverage([-10, 10]),
    0
);
console.log("Test 3 passed: Negative numbers");

// Test 4: Decimal numbers
assert.strictEqual(
    calculateAverage([1.5, 2.5, 3]),
    7 / 3
);
console.log("Test 4 passed: Decimal numbers");

// Test 5: Empty array
assert.throws(
    () => calculateAverage([]),
    /Array cannot be empty/
);
console.log("Test 5 passed: Empty array");

// Test 6: Invalid input
assert.throws(
    () => calculateAverage("123"),
    TypeError
);
console.log("Test 6 passed: Invalid input");

// Test 7: Non-numeric array element
assert.throws(
    () => calculateAverage([10, "20", 30]),
    TypeError
);
console.log("Test 7 passed: Non-numeric element");

console.log("\nAll 7 tests passed successfully!");

