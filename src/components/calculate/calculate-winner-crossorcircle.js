function isWinner(array2, array1) {
  for (let i = 0; i < array1.length; i++) {
    if (
      array1[i].every(function (element) {
        return array2.includes(element);
      })
    ) {
      return true;
    }
  }
}

export default isWinner;
