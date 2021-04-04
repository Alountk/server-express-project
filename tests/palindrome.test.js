const { palindrome } = require('../utils/for_testing');

test('palindrome of marchan ', () => {
  const result = palindrome('marchan');

  expect(result).toBe('nahcram');
});
