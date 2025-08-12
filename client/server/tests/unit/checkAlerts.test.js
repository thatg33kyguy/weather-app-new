const { checkAlerts } = require('../../utils/alert');
const AlertThreshold = require('../../schema/alertThreshold');
jest.mock('../../schema/alertThreshold');

test('checkAlerts returns correct alerts', async () => {
    AlertThreshold.findOne.mockResolvedValue({
        city: 'Delhi',
        temperatureThreshold: 25,
        weatherConditions: ['Clear'],
        consecutiveUpdates: 2
      });
  const weatherData = [{ city: 'Delhi', temp: 30, main: 'Clear' }];
  const alerts = await checkAlerts(weatherData);

  expect(alerts).toEqual([
    { city: 'Delhi', message: 'Temperature exceeds 25°C' },
    { city: 'Delhi', message: 'Weather condition is Clear' }
  ]);
});
