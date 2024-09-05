const sum = require('../src/sum')

describe("Sum", () => {
    // describe("Iterative", () => {
    //     test("It returns sum of numbers from 1 to n (inclusive of n)", () => {
    //         const n = 10000000000;
    //         expect(sum.iterativeSum(n)).toEqual(50000000000067860000)
    //         // Runtime 13,325ms
    //     })
    // })
    describe("Recursive", () => {
        test("It returns sum of numbers from 1 to n (inclusive of n)", () => {
            const n = 10000000000;
            expect(sum.recursiveSum(n)).toEqual(50000000005000000000)
            // Runtime 116ms
        })
    })
})