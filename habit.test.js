const habit = require('./habit.js');

test("Should have 5 odd numbers [1, 10]",  () => {
    const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = habit.oddNumbersOnly(oneToTen);
    const expectation = 5;
    expect(result.length).toBe(expectation);
})