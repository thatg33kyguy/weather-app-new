const axios = require('axios');
const { fetchWeatherData } = require('../../utils/dataProcessing');

jest.mock('axios');

test('fetchWeatherData retrieves correct data', async () => {
  const mockData = [
    { name: 'Delhi', main: { temp: 30, feels_like: 32 }, weather: [{ main: 'Clear' }], dt: 1628167200 },
    { name: 'Mumbai', main: { temp: 28, feels_like: 30 }, weather: [{ main: 'Rain' }], dt: 1628167200 },
    { name: 'Chennai', main: { temp: 32, feels_like: 35 }, weather: [{ main: 'Sunny' }], dt: 1628167200 },
    { name: 'Bangalore', main: { temp: 27, feels_like: 29 }, weather: [{ main: 'Cloudy' }], dt: 1628167200 },
    { name: 'Kolkata', main: { temp: 31, feels_like: 34 }, weather: [{ main: 'Thunderstorm' }], dt: 1628167200 },
    { name: 'Hyderabad', main: { temp: 29, feels_like: 31 }, weather: [{ main: 'Mist' }], dt: 1628167200 }
  ];

  // Mock the axios.get call
  axios.get.mockImplementation((url) => {
    const city = url.match(/q=([^&]+)/)[1];
    const cityData = mockData.find(d => d.name === city);
    return Promise.resolve({ data: cityData });
  });

  // Call the function and check the results
  const data = await fetchWeatherData();
  expect(data).toEqual([
    { city: 'Delhi', temp: 30, main: 'Clear', feels_like: 32, dt: 1628167200 },
    { city: 'Mumbai', temp: 28, main: 'Rain', feels_like: 30, dt: 1628167200 },
    { city: 'Chennai', temp: 32, main: 'Sunny', feels_like: 35, dt: 1628167200 },
    { city: 'Bangalore', temp: 27, main: 'Cloudy', feels_like: 29, dt: 1628167200 },
    { city: 'Kolkata', temp: 31, main: 'Thunderstorm', feels_like: 34, dt: 1628167200 },
    { city: 'Hyderabad', temp: 29, main: 'Mist', feels_like: 31, dt: 1628167200 }
  ]);
}, 10000); // Set timeout to 10 seconds
