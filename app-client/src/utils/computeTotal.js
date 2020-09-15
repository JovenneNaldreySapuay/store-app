const computeTotal = (prodArray) => {
  let prices = [];
  let total = 0;
  const reducer = (acc, curr) => acc + curr;

  if (prodArray.length > 0) {
    prodArray.forEach((item) => {
      prices.push(item.total);
      total = prices.reduce(reducer);
    });
  }

  return total;
};

export default computeTotal;
