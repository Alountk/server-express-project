const palindrome = (string) => string.split('').reverse().join('');
const average = (array) => array.reduce((acc, number) => acc + number) / array.length;

module.exports = { palindrome, average };
