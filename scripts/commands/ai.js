const { Hercai } = require('hercai');
const herc = new Hercai();

module.exports.config = {
  name: 'ai',
  version: '1.1.0',
  aliases: ["gpt"],
  permission: 0,
  credits: 'Yan Maglinte | Liane Cagara',
  description: 'An AI command using Hercai API!',
  premium: false,
  prefix: true,
  allowpremium: false,
  category: 'Ai',
  usages: 'Ai [prompt]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const prompt = args.join(' ');

  try {
    if (!prompt) {
      return api.sendMessage("Please specify a message!", event.threadID);
    }

    // Notify the user that the response is being fetched
    const loadingMessageID = await new Promise((resolve, reject) => {
      api.sendMessage("Fetching answer...", event.threadID, (err, messageInfo) => {
        if (err) reject(err);
        else resolve(messageInfo.messageID);
      });
    });

    // React with a clock emoji
    api.setMessageReaction("⏱️", event.messageID, (err) => {}, true);

    // Fetch the AI response
    const response = await herc.question({ model: 'v3', content: prompt });

    // Edit the loading message with the response
    api.editMessage(response.reply, loadingMessageID, (err) => {
      if (err) console.error("Error editing loading message:", err);
    });

    // React with a check mark
    api.setMessageReaction("✅", event.messageID, (err) => {}, true);
  } catch (error) {
    // Send an error message
    api.sendMessage(`⚠️ Something went wrong: ${error}`, event.threadID);
    api.setMessageReaction("⚠️", event.messageID, (err) => {}, true);
  }
};
