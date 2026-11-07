'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const implementationPath = path.join(__dirname, 'fixed-code.js');
const implementation = fs.readFileSync(implementationPath, 'utf8');
// fixed-code.js is a script and does not export the function. Evaluate it in
// an isolated context to expose calculateAverage without modifying that file.
const calculateAverage = vm.runInNewContext(
    `${implementation}\n; calculateAverage;`,
    { console: { log() {} } },
    { filename: implementationPath }
);

const tests = [
    ['positive numbers', () => assert.equal(calculateAverage([10, 20, 30]), 20)],
    ['negative numbers', () => assert.equal(calculateAverage([-10, -20, -30]), -20)],
    ['mixed signs', () => assert.equal(calculateAverage([-10, 10]), 0)],
    ['decimal numbers', () => assert.ok(Math.abs(calculateAverage([1.5, 2.5, 3]) - 7 / 3) < 1e-14)],
    ['single-element array', () => assert.equal(calculateAverage([42]), 42)],
    ['empty array rejected', () => assert.throws(() => calculateAverage([]), /empty array/i)],
    ['string input rejected', () => assert.throws(() => calculateAverage('123'), { name: 'TypeError' })],
    ['null input rejected', () => assert.throws(() => calculateAverage(null), { name: 'TypeError' })],
    ['non-numeric element rejected', () => assert.throws(() => calculateAverage([10, '20']), /finite numbers/i)],
    ['NaN rejected', () => assert.throws(() => calculateAverage([NaN]), /finite numbers/i)],
    ['infinity rejected', () => assert.throws(() => calculateAverage([Infinity]), /finite numbers/i)],
    ['large positive values avoid overflow', () => assert.equal(calculateAverage([Number.MAX_VALUE, Number.MAX_VALUE]), Number.MAX_VALUE)],
    ['large negative values avoid overflow', () => assert.equal(calculateAverage([-Number.MAX_VALUE, -Number.MAX_VALUE]), -Number.MAX_VALUE)],
    ['large opposite values cancel', () => assert.equal(calculateAverage([Number.MAX_VALUE, -Number.MAX_VALUE]), 0)],
    ['large repeated values cancel', () => assert.equal(calculateAverage([Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE]), 0)],
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
if (failed > 0) process.exitCode = 1;
