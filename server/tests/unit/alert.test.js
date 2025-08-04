// tests/alert.test.js
const {sendAlert} = require('../../utils/alert'); // Adjust the path as needed
const sendEmail = require('../../utils/emailService'); // Adjust the path as needed

jest.mock('../../utils/emailService'); // Mock the sendEmail module

describe('sendAlert', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should send an email with the correct details', async () => {
    const alert = { city: 'Delhi', message: 'Temperature exceeds 25°C' };
    const recipientEmail = 'priyanshujayant3121@gmail.com';
    const subject = `Weather Alert for ${alert.city}`;
    const text = `Alert: ${alert.message}`;

    sendEmail.mockResolvedValue({ response: 'Email sent' }); // Mock email sending success

    await sendAlert(alert);

    expect(sendEmail).toHaveBeenCalledWith(recipientEmail, subject, text);
    expect(sendEmail).toHaveBeenCalledTimes(1);
  });

  test('should handle email sending errors', async () => {
    const alert = { city: 'Delhi', message: 'Temperature exceeds 25°C' };
    const recipientEmail = 'priyanshujayant3121@gmail.com';
    const subject = `Weather Alert for ${alert.city}`;
    const text = `Alert: ${alert.message}`;

    sendEmail.mockRejectedValue(new Error('Email sending failed')); // Mock email sending failure

    await expect(sendAlert(alert)).rejects.toThrow('Email sending failed');

    expect(sendEmail).toHaveBeenCalledWith(recipientEmail, subject, text);
    expect(sendEmail).toHaveBeenCalledTimes(1);
  });
});
