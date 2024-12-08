module.exports.config = {
  name: "contract",
  version: "1.0.0",
  permission: 0,
  credits: "Yan Maglinte",
  description: "Share a contact of a certain userID",
  premium: false,  prefix: true, 
  category: "message",
  cooldowns: 5 
};

module.exports.run = function ({ api, event }) {
  api.shareContact("Hello this is your contact!", event.senderID, event.threadID, (err, data) => {
    if (err) console.log(err);
  })
};
