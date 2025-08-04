const { calculateDailySummary } = require('../../utils/dataProcessing');

test('calculateDailySummary computes correct aggregates', () => {
  const cityData = [
    { temp: 20, main: 'Clear' },
    { temp: 25, main: 'Clear' },
    { temp: 30, main: 'Rain' }
  ];

  const summary = calculateDailySummary(cityData);
  expect(summary.avg_temp).toBeCloseTo(25);
  expect(summary.max_temp).toBe(30);
  expect(summary.min_temp).toBe(20);
  expect(summary.dominant_condition).toBe('Clear');
});
