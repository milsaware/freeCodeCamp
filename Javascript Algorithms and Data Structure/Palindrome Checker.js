function palindrome(str) {
  str = str.replace(/[^0-9a-z]/gi, '').toLowerCase();
  let strRev = str.split('').reverse().toString().replace(/[^0-9a-z]/gi, '').toLowerCase();
  return (str == strRev);
}