/* eslint-disable no-undef */
const { countBox, countOnceBox } = require('../problem_3');

describe('Problem Scenario', () => {
  const cakes = 20;
  const apples = 25;
  test('Create function to count boxes Ainun can make', () => {
    expect(countBox(cakes, apples)).toEqual(5);
  });
  test('Create function to count how many cake and apple in a box', () => {
    expect(countOnceBox(cakes, apples)).toEqual('Jumlah cake sebanyak 4 dan jumlah apple sebanyak 5 per masing - masing box');
  });
});
