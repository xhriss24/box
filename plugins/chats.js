let {
    runtime,
    formatp,
    prefix,
    smd,
    smdBuffer,
    UserFunction,
  } = require("../lib");
  const axios = require("axios");
  const fetch = require("node-fetch");
  const os = require("os");
  const speed = require("performance-now");
  const Config = require("../config");
  const cheerio = require("cheerio");
  UserFunction({
    cmdname: "messages",
    desc: "Check how many users are continuously active in chat!",
    category: "chats",
    filename: __filename
  }, async (message, match, { store }) => {
    try {
      let activeUsers = {};
      store.messages[message.jid].array.forEach(msg => {
        const senderName = msg.pushName || (message.isGroup ? msg.key.participant : msg.key.remoteJid || "unknown").split("@")[0];
        activeUsers[senderName] = (activeUsers[senderName] || 0) + 1;
      });
      let activeUserList = Object.entries(activeUsers);
      if (!activeUserList || !activeUserList[0]) {
        return await message.reply("_No messages found!_");
      }
      const userListText = Object.entries(activeUsers).map(([userName, messageCount]) => `\t*${(userName?.split("\n").join(" ") || "unknown")}*  ➪  _${messageCount}_`).join("\n");
      const responseText = `*LIST OF ACTIVE USERS IN CURRENT CHAT*\n_Note: Sometimes data will be reset when the bot restarts!_\n\n*Total Users: _${activeUserList.length}_*\n\n*USERNAME ➪ MESSAGE COUNT(s)*\n${userListText}\n\n${Config.caption}`.trim();
      await message.send(responseText, {
        contextInfo: {
          ...(await message.bot.contextInfo("ACTIVE USERS", message.senderName))
        }
      }, message);
    } catch (error) {
      console.log({ error });
    }
  });
  