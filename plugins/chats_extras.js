let {
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
}, async (message, match) => {
  try {
    let responseText = "*BOT IS CURRENTLY ACTIVE!*";
    await message.reply(responseText, {
      contextInfo: {
        externalAdReply: {
          title: "ACTIVE",
          sourceUrl: gurl,
          showAdAttribution: true,
          thumbnail: "https://i.imgur.com/JMsAFRD.jpeg"
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
});

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const formatRuntime = (uptime) => {
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  return `${hours}h ${minutes}m ${seconds}s`;
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

smd({
  cmdname: "ping2",
  alias: ["botstatus", "statusbot", "p2"],
  type: "new",
  info: "get random poetry lines"
}, async (message, match) => {
  try {
    const usage = process.memoryUsage();
    const cpuInfo = os.cpus().map(cpu => {
      cpu.total = Object.values(cpu.times).reduce((total, time) => total + time, 0);
      return cpu;
    });
    const cpuUsage = cpuInfo.reduce((total, cpu, index, { length }) => {
      total.total += cpu.total;
      total.speed += cpu.speed / length;
      Object.keys(cpu.times).forEach(key => total.times[key] += cpu.times[key]);
      return total;
    }, { speed: 0, total: 0, times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 } });

    const start = performance.now();
    await delay(100);
    const end = performance.now();
    const responseTime = end - start;

    const runtime = formatRuntime(process.uptime());
    const ramInfo = `${formatBytes(os.totalmem() - os.freemem())} / ${formatBytes(os.totalmem())}`;
    const cpuUsageInfo = cpuInfo[0] ? `${cpuInfo[0].model.trim()} (${cpuUsage.speed} MHZ)\n${Object.keys(cpuUsage.times).map(key => `-${key.padEnd(6)}: ${(cpuUsage.times[key] * 100 / cpuUsage.total).toFixed(2)}%`).join("\n")}` : "";

    const response = `\nResponse Speed ${responseTime.toFixed(4)} Second\nRuntime : ${runtime}\n\n💻 Info Server\nRAM: ${ramInfo}\n\n_NodeJS Memory Usage_\n${Object.keys(usage).map((key, index, array) => `${key.padEnd(Math.max(...array.map(item => item.length)), " ")}: ${formatBytes(usage[key])}`).join("\n")}\n\n${cpuUsageInfo}\n\n`;
    await message.reply(response);
  } catch (error) {
    await message.error(`${error}\n\ncommand: ping2`, error, false);
  }
});





smd({
  cmdname: "myip",
  alias: ["ip"],
  type: "misc",
  info: "Get random poetry lines"
}, async (message, match) => {
  try {
    const { data } = await axios.get("https://api.ipify.org/");
    message.send(data ? `*Bot's IP address is : _${data}_*` : "_No response from server!_");
  } catch (error) {
    await message.error(`${error}\n\ncommand: myip`, error, false);
  }
});

const takeScreenshot = async (url, device = "desktop") => {
  try {
    const response = await axios({
      url: "https://www.screenshotmachine.com/capture.php",
      method: "POST",
      data: new URLSearchParams({ url, device, cacheLimit: 0 }),
      headers: { "content-type": "application/x-www-form-urlencoded; charset=UTF-8" }
    });
    if (response.data.status === "success") {
      const cookies = response.headers["set-cookie"];
      const { data } = await axios.get(`https://www.screenshotmachine.com/${response.data.link}`, {
        headers: { cookie: cookies.join("") },
        responseType: "arraybuffer"
      });
      return { status: 200, result: data };
    } else {
      return { status: 404, message: response.data };
    }
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

smd({
  cmdname: "ss",
  alias: ["webss", "fullss"],
  type: "misc",
  info: "Get random poetry lines"
}, async (message, match) => {
  try {
    const url = match.split(" ")[0].trim();
    if (!url) {
      return await message.reply(`*Need URL! Use ${prefix}ss https://github.com/Astropeda/Asta-Md*`);
    }
    const screenshot = await takeScreenshot(url);
    if (screenshot.status === 200) {
      await message.send(screenshot.result, { caption: Config.caption }, "smdimg", message);
    } else {
      await message.send("_No response from server!_");
    }
  } catch (error) {
    await message.error(`${error}\n\ncommand: ss`, error, "*Request Denied!*");
  }
});
