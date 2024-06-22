export default function generateNumericString() {
  const length = 8;
  let numericString = '';
  const arr = '01223456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < length; i += 1) {
    numericString += arr[Math.floor(Math.random() * arr.length)];
  }

  return numericString;
}
