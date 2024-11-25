module.exports = {
  config: {
    name: "freesms",
    version: "1.0.0",
    author: "Yan Maglinte",
    category: "Communication",
    description: "Sends a free SMS message",
    usage: "[recipient_number] [message]",
    cooldown: 60,
  },

  async onMessage({ message, args }) {
    if (!args[0] || !args[1]) {
      message.reply("Invalid usage! Please provide a recipient number and message.");
      return;
    }

    const recipientNumber = args[0];
    const messageText = args.slice(1).join(" ");

    try {
      // Assuming you have a separate configuration file to store sensitive information
      const config = require('./config.json');
      const apiKey = config.apiKey;

      const response = await axios.post("https://api.kenliejugarap.com/freesmslbc/", {
        recipient: recipientNumber,
        message: messageText,
      }, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      });

      if (response.data.success) {
        message.reply("Your SMS has been sent successfully!");
      } else {
        message.reply("There was an error sending the SMS. Please try again later.");
        console.error("SMS Error:", response.data.error);
      }
    } catch (error) {
      console.error("SMS Error:", error);
      message.reply("There was an error sending the SMS. Please try again later.");
    }
  }
};
