const features = require('./features');

describe("Testing the generateLovePercent method", () => {
    
    test("Should always return a string", () => {
        const result = features.generateLovePercent();
        expect(typeof result).toBe('string');
    });

    test("Returned string should always end with a percentage sign", () => {
        const result = features.generateLovePercent();
        expect(result.slice(-1)).toBe('%');
    });

    test("The number before the percentage sign should always be an integer", () => {
        const result = features.generateLovePercent();
        const number = parseInt(result.slice(0, -1));
        expect(Number.isInteger(number)).toBe(true);
    });

    test("The integer before the percentage sign should always be between 0 and 100", () => {
        const result = features.generateLovePercent();
        const number = parseInt(result.slice(0, -1));
        expect(number).toBeGreaterThanOrEqual(0);
        expect(number).toBeLessThanOrEqual(100);
    });
});
