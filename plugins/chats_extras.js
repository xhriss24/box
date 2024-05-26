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
      const responseText = `*LIST OF ACTIVE USERS IN CURRENT CHAT*\n*Total Users: _${activeUserList.length}_*\n\n*USERNAME ➪ MESSAGE COUNT(s)*\n${userListText}\n\n${Config.caption}`.trim();
      await message.send(responseText, {
        contextInfo: {
          ...(await message.bot.contextInfo("ACTIVE USERS", message.senderName))
        }
      }, "astro", message);
    } catch (error) {
      console.error({ error });
    }
  });
  
  let commandHistory = [];

  smd({ on: "main" }, async (message, match, { icmd }) => {
    try {
      if (icmd && message.cmd) {
        commandHistory.push({
          user: message.sender,
          command: message.cmd,
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error(error);
      await message.error(error + "\n\ncommand: listmessage", error, "*ERROR!*");
    }
  });
  
  smd({
    cmdname: "usage",
    desc: "Counts the commands used by users after starting bot?",
    category: "misc",
    filename: __filename
  }, async (message) => {
    try {
      let users = [];
      const usageCount = {};
      commandHistory.forEach(({ user, command }) => {
        if (!usageCount[user]) {
          usageCount[user] = { commands: {}, count: 0 };
          users.push(user);
        }
        if (!usageCount[user].commands[command]) {
          usageCount[user].commands[command] = 1;
        } else {
          usageCount[user].commands[command]++;
        }
        usageCount[user].count++;
      });
      const userCommandsList = users.map((user, index) => {
        const commands = usageCount[user].commands;
        const commandsText = Object.entries(commands).map(([cmd, count]) => cmd + " " + (count <= 1 ? "" : "(" + count + ")")).join(", ");
        return "*" + (index + 1) + " -- @" + user.split("@")[0] + "'s ➪ " + usageCount[user].count + "*  \n *LIST ➪*  _" + commandsText.trim() + "_";
      }).join("\n\n");
      const responseText = `*LIST OF COMMANDS USED TODAY!*\n_Note: Data will be reset when bot restarts!_\n\n*Total Users: _${users.length}_*\n*Total Command Used: _${commandHistory.length}_*\n\n${userCommandsList}\n\n${Config.caption}`.trim();
      await message.send(responseText, {
        contextInfo: {
          ...(await message.bot.contextInfo("HISTORY"))
        },
        mentions: [...users]
      }, "astro", message);
    } catch (error) {
      console.error(error);
      await message.error(error + "\n\ncommand: cmdused", error, "*ERROR!*");
    }
  });
  
  smd({
    cmdname: "test",
    desc: "Check if the bot is active",
    category: "misc",
    filename: __filename
  }, async (message) => {
    try {
      let responseText = "*BOT IS CURRENTLY ACTIVE!*";
      await message.reply(responseText, {
        contextInfo: {
          externalAdReply: {
            title: "ACTIVE",
            sourceUrl: gurl,
            showAdAttribution: true,
            thumbnail: await smdBuffer(await message.getpp())
          }
        }
      }, "astro");
    } catch (error) {
      console.error(error);
    }
  });
  