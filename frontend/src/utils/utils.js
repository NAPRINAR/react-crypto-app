export const percentDifference = (a, b) => {
  const fixed = +(100 * Math.abs((a - b) / (a + b) / 2)).toFixed(2);
  return fixed;
};

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.substr(1);
