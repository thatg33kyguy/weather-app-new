const AlertThreshold = require('../schema/alertThreshold');
const sendEmail = require('./emailService'); // Adjust the path as needed

const checkAlerts = async (weatherData) => {
  const alerts = [];

  for (const data of weatherData) {
    const { city, temp, main } = data;
    const thresholds = await AlertThreshold.findOne({ city });

    if (thresholds) {
      // Check temperature threshold
      if (temp > thresholds.temperatureThreshold) {
        alerts.push({ city, message: `Temperature exceeds ${thresholds.temperatureThreshold}°C` });
      }

      // Check weather condition
      if (thresholds.weatherConditions.includes(main)) {
        alerts.push({ city, message: `Weather condition is ${main}` });
      }
    }
  }

  return alerts;
};

const sendAlert = async (alert) => {
  console.log(`ALERT: ${alert.city} - ${alert.message}`);

  const recipientEmail = 'priyanshujayant3121@gmail.com';
  const subject = `Weather Alert for ${alert.city}`;
  const text = `Alert: ${alert.message}`;

  try {
    await sendEmail(recipientEmail, subject, text);
    console.log(`Email sent to ${recipientEmail}: ${text}`);
  } catch (error) {
    console.error(`Failed to send email: ${error}`);
    throw error; // Re-throw the error to be caught in the test
  }
};

const checkAlertsAndNotify = async (weatherData) => {
  const alerts = await checkAlerts(weatherData);
  alerts.forEach(sendAlert);
};

module.exports = { checkAlerts, checkAlertsAndNotify, sendAlert }; // Ensure sendAlert is included in the exports
