/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const countBox = (m, n) => {
  m = Math.abs(m);
  n = Math.abs(n);

  if (!n) return n === 0 ? m : NaN;

  const r = m % n;
  return countBox(n, r);
};

countOnceBox = (cake, apple) => {
  countbox = countBox(cake, apple);
  countCake = cake / countbox;
  countApple = apple / countbox;
  return `Jumlah cake sebanyak ${countCake} dan jumlah apple sebanyak ${countApple} per masing - masing box`;
};

module.exports = { countBox, countOnceBox };
