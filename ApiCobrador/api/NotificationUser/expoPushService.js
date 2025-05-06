const { Expo } = require('expo-server-sdk');

const expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
  useFcmV1: true,
});

async function sendPushNotifications(tokens, messageBody) {
  const messages = tokens
    .filter(Expo.isExpoPushToken)
    .map(token => ({
      to: token,
      sound: 'default',
      body: messageBody,
      data: { someData: 'example' },
    }));

  const chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error('Error sending push notification chunk:', error);
    }
  }

  return tickets;
}

module.exports = {
  sendPushNotifications,
};
