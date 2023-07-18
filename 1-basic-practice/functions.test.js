import {
    capitalize,
    reverseString,
    Calculator,
    caesarCipher,
    analyzeArray,
} from "./functions.js";

test("Capitalize first letter", () => {
    expect(capitalize("abc")).toBe("Abc");
});

test("Reverse string", () => {
    expect(reverseString("abc")).toBe("cba");
});

test("Add", () => {
    expect(Calculator.add(1, 2)).toBe(3);
});

test("Subtract", () => {
    expect(Calculator.subtract(1, 2)).toBe(-1);
});

test("Divide", () => {
    expect(Calculator.divide(1, 2)).toBe(0.5);
});

test("Multiply", () => {
    expect(Calculator.multiply(1, 2)).toBe(2);
});

test("Caesar Cipher base case", () => {
    expect(caesarCipher("abc")).toBe("bcd");
});

test("Caesar Cipher wrapping", () => {
    expect(caesarCipher("abcz")).toBe("bcda");
});

test("Caesar Cipher keep capitalization", () => {
    expect(caesarCipher("aBcz")).toBe("bCda");
});

test("Caesar Cipher keep punctuation", () => {
    expect(caesarCipher("aBcz!")).toBe("bCda!");
});

test("Analyze Array", () => {
    expect(analyzeArray([1, 2, 3])).toMatchObject({
        average: 2,
        min: 1,
        max: 3,
        length: 3,
    });
});
