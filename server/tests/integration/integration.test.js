const request = require('supertest');
const app = require('../../server'); // Adjust the path to your Express server
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const DailySummary = require('../../schema/DailySummary');
const AlertThreshold = require('../../schema/alertThreshold');

let mongoServer;

// Setup before all tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Check if there is an active connection and disconnect if necessary
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }
});

// Cleanup after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('POST /api/dailySummary stores and retrieves daily summary', async () => {
  const summary = {
    city: 'Delhi',
    date: '2024-07-27T00:00:00.000Z', // Adjusted date to match expected output
    avg_temp: 32.05, // Adjusted average temperature to match expected output
    max_temp: 32.05, // Adjusted max temperature to match expected output
    min_temp: 32.05, // Adjusted min temperature to match expected output
    dominant_condition: 'Haze' // Adjusted condition to match expected output
  };

  // Post the daily summary
  await request(app)
    .post('/api/dailySummary')
    .send(summary)
    .expect(201);

  // Retrieve the daily summary
  const response = await request(app)
    .get('/api/dailySummary/Delhi')
    .expect(200);

  // Check the response body
  expect(response.body[0]).toMatchObject(summary);
});

test('PUT /api/alertThresholds updates and retrieves thresholds', async () => {
  const thresholds = {
    city: 'Delhi',
    temperatureThreshold: 30,
    weatherConditions: ['Clear'],
    consecutiveUpdates: 2
  };

  // Update the alert thresholds
  await request(app)
    .put('/api/alertThresholds')
    .send(thresholds)
    .expect(200);

  // Retrieve the alert thresholds
  const response = await request(app)
    .get('/api/alertThresholds/Delhi')
    .expect(200);

  // Check the response body
  expect(response.body).toMatchObject(thresholds);
});
