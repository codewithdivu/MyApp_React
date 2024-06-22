export function shuffleKey(array) {
  const shuffledArray = array.map((obj) => ({ ...obj, answer: obj.right }));
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i].right, shuffledArray[j].right] = [shuffledArray[j].right, shuffledArray[i].right];
  }
  return shuffledArray;
}
