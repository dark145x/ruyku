/*module.exports = {
  config: {
    name: "eval",
    version: "1.6",
    author: "NTKhang",
    countDown: 5,
    role: 2,
    premium: false,  prefix: true,
    description: {
      en: "Test code quickly"
    },
    category: "admin",
    guide: {
      en: "{pn} <code to test>"
    }
  },
  run: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {
    function output(msg) {
      if (typeof msg == "number" || typeof msg == "boolean" || typeof msg == "function")
        msg = msg.toString();
      else if (msg instanceof Map) {
        let text = `Map(${msg.size}) `;
        text += JSON.stringify(mapToObj(msg), null, 2);
        msg = text;
      }
      else if (typeof msg == "object")
        msg = JSON.stringify(msg, null, 2);
      else if (typeof msg == "undefined")
        msg = "undefined";

      message.reply(msg);
    }

    function mapToObj(map) {
      const obj = {};
      map.forEach(function (v, k) {
        obj[k] = v;
      });
      return obj;
    }
    
    const cmd = `(async () => {
      try {
        ${args.join(" ")}
      }
      catch (err) {
        console.error("eval command error:", err);
        message.send("❌ An error occurred:\n" + (err.stack || err));
      }
    })();`;

    try {
      eval(cmd);
    } catch (err) {
      message.send("❌ Failed to evaluate the code:\n" + (err.stack || err));
    }
  }
};*/
module.exports.config = {
  name: "eval",
  version: "1.0.0",
  credits: "NTKhang",
  permission: 2,
  premium: false,  prefix: true,
  Description: "Test api response",
  category: "admin",
  useges: "[code]",
  countDowns: 5
};
module.exports.run = async function ({ api, args, event ,Users, Threads , message ,usersData, threadsData}) {
  function output(msg) {
    if (typeof msg == "number" || typeof msg == "boolean" || typeof msg == "function")
      msg = msg.toString();
    else if (msg instanceof Map) {
      let text = `Map(${msg.size}) `;
      text += JSON.stringify(mapToObj(msg), null, 2);
      msg = text;
    }
    else if (typeof msg == "object")
      msg = JSON.stringify(msg, null, 2);
    else if (typeof msg == "undefined")
      msg = "undefined";

    api.sendMessage(msg, event.threadID, event.messageID);
  }
  function out(msg) {
    output(msg);
  }
  function mapToObj(map) {
    const obj = {};
    map.forEach(function (v, k) {
      obj[k] = v;
    });
    return obj;
  }
  const cmd = `
  (async () => {
const dipto = require('axios');
    try {
      ${args.join(" ")}
    }
    catch(err) {
      console.log("eval command", err);
      api.sendMessage( err.stack
      , event.threadID);
    }
  })()`;
eval(cmd);
}