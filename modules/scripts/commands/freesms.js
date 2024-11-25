const axios = require('axios');

module.exports = {
  name: 'freesms',
  description: 'freesms <phoneNumber> <message>.',
  author: 'Dale/<your name>',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const phoneNumber = args[0];
    const message = args.slice(1).join(' ');

    if (!phoneNumber || !message) {
      return sendMessage(senderId, { text: '❌ 𝗨𝘀𝗮𝗴𝗲: 𝗳𝗿𝗲𝗲𝘀𝗺𝘀 𝗽𝗵𝗼𝗻𝗲 𝗻𝘂𝗺𝗯𝗲𝗿 𝗺𝗲𝘀𝘀𝗮𝗴𝗲' }, pageAccessToken);
    }

    sendMessage(senderId, { text: '⏳ 𝗣𝗿𝗼𝗰𝗲𝘀𝘀𝗶𝗻𝗴 𝘆𝗼𝘂𝗿 𝗿𝗲𝗾𝘂𝗲𝘀𝘁 𝘁𝗼 𝘀𝗲𝗻𝗱 𝘀𝗺𝘀, 𝗽𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁...' }, pageAccessToken);

    try {
      const response = await axios.get('https://api.kenliejugarap.com/freesmslbc/', {
        params: {
          number: phoneNumber,
          message: encodeURIComponent(message)
        },
        headers: {
          // Add any necessary headers if the API requires them (e.g., authorization)
        }
      });

      const { status, response: messageResponse, sim_network, message_parts, message_remaining } = response.data;

      const responseTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila', hour12: true });

      if (status) {
        sendMessage(senderId, { 
          text: `𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗵𝗮𝘀 𝗯𝗲𝗲𝗻 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝘀𝗲𝗻𝘁 ✅ \n\n 𝗠𝗲𝘀𝘀𝗮𝗴𝗲: ${messageResponse}\n\n 𝗡𝗲𝘁𝗪𝗼𝗿𝗸: ${sim_network}\n 𝗣𝗮𝗿𝘁𝘀: ${message_parts}\n 𝗠𝗲𝘀𝘀𝗮𝗴𝗲𝘀 𝗥𝗲𝗺𝗮𝗶𝗻𝗶𝗻𝗴: ${message_remaining.toFixed(2)}\n\n⏰ 𝗔𝘀𝗶𝗮/𝗠𝗮𝗻𝗶𝗹𝗮: ${responseTime}`
        }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: '❌ 𝗙𝗮𝗶𝗹𝗲𝗱 𝘁𝗼 𝘀𝗲𝗻𝗱 𝘁𝗵𝗲 𝗺𝗲𝘀𝘀𝗮𝗴𝗲.' }, pageAccessToken);
      }

    } catch (error) {
      console.error('Error occurred:', error);
      const errorMessage = error.response ? error.response.data : '❌ 𝗙𝗮𝗶𝗹𝗲𝗱 𝘁𝗼 𝘀𝗲𝗻𝗱 𝘁𝗵𝗲 𝗺𝗲𝘀𝘀𝗮𝗴𝗲.';
      sendMessage(senderId, { text: errorMessage }, pageAccessToken);
    }
  }
};
