function palindrome(str) {
  str = str.replace(/[^0-9a-z]/gi, '').toLowerCase();
  let strRev = str.split('').reverse().join('');
  return (str == strRev);
}
