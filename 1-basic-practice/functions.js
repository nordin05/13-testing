export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function reverseString(str) {
    return str.split("").reverse().join("");
}

export const Calculator = {
    add: function (a, b) {
        return a + b;
    },
    subtract: function (a, b) {
        return a - b;
    },
    divide: function (a, b) {
        if (b == 0) {
            return "Error div by 0";
        }
        return a / b;
    },
    multiply: function (a, b) {
        return a * b;
    },
};

export function caesarCipher(str) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const Cipher = [];

    for (let i = 0; i < str.length; i++) {
        const shiftedChar = shiftLetter(alphabet, str[i]);
        Cipher.push(shiftedChar);
    }

    return Cipher.join("");
}

function shiftLetter(alphabet, char) {
    const index = alphabet.indexOf(char.toLowerCase());

    if (index != -1) {
        const shiftedChar = alphabet[(index + 1) % 26];
        if (isUpperCase(char)) {
            return shiftedChar.toUpperCase();
        }

        return shiftedChar;
    }

    return char;
}

const isUpperCase = (str) => /^[A-Z]*$/.test(str);

export function analyzeArray(arr) {
    const Object = {};

    Object.average = average(arr);
    Object.min = Math.min(...arr);
    Object.max = Math.max(...arr);
    Object.length = arr.length;

    return Object;
}

function average(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return parseFloat(sum / arr.length);
}
