'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const implementationPath = path.join(__dirname, 'fixed-code.js');
const implementation = fs.readFileSync(implementationPath, 'utf8');
// The supplied implementation logs a sample and does not export its function.
// Evaluate it in an isolated context and append an expression to expose the
// function to this test harness without changing the implementation file.
const calculateAverage = vm.runInNewContext(
    `${implementation}\n; calculateAverage;`,
    { console: { log() {} } },
    { filename: implementationPath }
);

const tests = [
    ['positive numbers', () => assert.equal(calculateAverage([10, 20, 30]), 20)],
    ['negative numbers', () => assert.equal(calculateAverage([-10, -20, -30]), -20)],
    ['mixed positive and negative numbers', () => assert.equal(calculateAverage([-10, 10]), 0)],
    ['decimal numbers', () => assert.equal(calculateAverage([1.5, 2.5, 3]), 7 / 3)],
    ['single-element array', () => assert.equal(calculateAverage([42]), 42)],
    ['empty array rejected', () => assert.throws(() => calculateAverage([]), /empty array/i)],
    ['string input rejected', () => assert.throws(() => calculateAverage('123'), { name: 'TypeError' })],
    ['null input rejected', () => assert.throws(() => calculateAverage(null), { name: 'TypeError' })],
    ['non-numeric array element rejected', () => assert.throws(() => calculateAverage([10, '20', 30]), /finite numbers/i)],
    ['NaN element rejected', () => assert.throws(() => calculateAverage([1, NaN]), /finite numbers/i)],
    ['infinite element rejected', () => assert.throws(() => calculateAverage([1, Infinity]), /finite numbers/i)],
];

let passed = 0;
let failed = 0;

for (const [name, run] of tests) {
    try {
        run();
        passed++;
        console.log(`PASS ${name}`);
    } catch (error) {
        failed++;
        console.error(`FAIL ${name}: ${error.message}`);
    }
}

console.log(`\n${passed} passed, ${failed} failed, ${tests.length} total`);
if (failed > 0) {
    process.exitCode = 1;
}
