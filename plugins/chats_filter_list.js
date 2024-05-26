try {
    // Check for new updates
} catch (error) {
    if (!global.showUpdate) {
        log("\n  NEW UPDATE AVAILABLE\n ");
        global.showUpdate = true;
    }
}
const UserFunction = require("../lib")
const { mention, filter } = require(lib_dir + "/astropeda.js");

// Set auto reply for mention
UserFunction({
    cmdname: "mention",
    fromMe: true,
    category: "areply",
    desc: "set auto reply for mention",
    use: "[ url type/audio ]",
    usage: "read  'mention wiki' to get all inforamtion of mention!",
    filename: __filename
}, async (event, args) => {
    mention.cmd(event, args);
});

// Check for mentions
UserFunction({
    on: "main",
    fromMe: false
}, async (event, text = "") => {
    mention.check(event, text);
});

// Set auto reply filter messages
UserFunction({
    pattern: "filter",
    category: "areply",
    desc: "set auto reply filter messages",
    use: "[ astro : how can i help you! ]",
    usage: "set filter message to specific text, so that bot replied user from chat by giving text!",
    fromMe: true,
    filename: __filename
}, async (event, args) => {
    filter.set(event, args);
});

// Stop auto reply for a word
UserFunction({
    pattern: "fstop",
    category: "areply",
    desc: "stop auto reply from a word",
    use: "[ astro : how can i help you! ]",
    usage: "stop filter message to specific word, That already set in filter text!",
    fromMe: true,
    filename: __filename
}, async (event, args) => {
    filter.stop(event, args);
});

// Get list of auto reply words
UserFunction({
    pattern: "flist",
    category: "areply",
    desc: "get list of auto reply word",
    use: "[ astro : how can i help you! ]",
    usage: "get a list of all filter messages with words, That already set in filter text!",
    fromMe: true,
    filename: __filename
}, async event => {
    filter.list(event);
});

// Check for filter messages
UserFunction({
    on: "text"
}, async (event, text) => {
    try {
        filter.check(event, text);
    } catch (error) { }
});

let afk = false;

// Set AFK status
UserFunction({
    pattern: "afk",
    desc: "away from keyboard",
    category: "areply"
}, async (event, reason) => {
    try {
        let data = await db.get();
        afk = data.afk || { users: {} };

        if (!reason) {
            return event.reply(("\n  *Example: My owner is AFK*\n  *Last seen before #lastseen*\n  *Also update status: " + prefix + "afk @time, @date, @line(pickupline), @quote(random quote), @user*\n  \n*To turn off use " + prefix + "unAfk.*\n  ").trim());
        }

        if (reason === "get" && afk[event.sender]) {
            return event.reply(afk[event.sender].reason);
        }

        afk[event.sender] = {
            reason: reason,
            lastseen: new Date()
        };

        data.afk = { ...afk };
        data = await db.update(data);

        if (data) {
            let message = (`@${event.sender.split("@")[0]} currently AFK.\nReason: ${afk[event.sender].reason.replace("@lastseen", "\nlastseen : " + getTimeDifference(afk[event.sender].lastseen) + "\n")}`).trim();
            await sendWelcome(event, message, event, event.sender);
        } else {
            event.reply("*Request Denied!*");
        }
    } catch (error) {
        event.error(error + "\n\nCommand: AFKs", error);
    }
});

// Turn off AFK status
UserFunction({
    pattern: "unafk",
    desc: "turn off away from keyboard",
    category: "areply"
}, async event => {
    try {
        let data = await db.get();
        afk = data.afk || {};

        if (!afk[event.sender]) {
            return event.reply("*You are not AFK.*");
        }

        delete afk[event.sender];
        data.afk = { ...afk };
        data = await db.update(data);

        if (data) {
            await event.reply("Finally, You are back!");
        } else {
            event.reply("*Request Denied!*");
        }
    } catch (error) {
        event.error(error + "\n\nCommand: UnAFK", error, "ERROR");
    }
});

let txt = {
    "2": "*Hey i already inform you!*\n",
    "3": "*Stop spamming!*"
};

function getTimeDifference(date) {
    const pastDate = new Date(date);
    const currentDate = new Date();
    const timeDifference = currentDate - pastDate;
    const daysDifference = Math.floor(timeDifference / 86400000);
    const hoursDifference = Math.floor(timeDifference % 86400000 / 3600000);
    const minutesDifference = Math.floor(timeDifference % 3600000 / 60000);
    return (daysDifference ? `Days ${daysDifference}, ` : "") + `Hours ${hoursDifference || 0}, Minutes ${minutesDifference || 0}`;
}

// Check for AFK users
UserFunction({
    on: "main"
}, async event => {
    if (event.fromMe || event.isBot) {
        return;
    }

    try {
        if (!afk) {
            let data = await db.get();
            afk = data.afk || { users: [] };
        }

        let isReplyToSelf = event.reply_message && event.reply_message.fromMe ? true : false;
        let mentionedJids = event.mentionedJid[0] ? [...event.mentionedJid] : [];

        if (event.reply_message) {
            mentionedJids.push(event.reply_message.sender);
        }

        for (let i = 0; i < mentionedJids.length; i++) {
            if (afk[mentionedJids[i]] && event.sender !== mentionedJids[i]) {
                if (!afk[mentionedJids[i]].users[event.sender]) {
                    afk[mentionedJids[i]].users[event.sender] = 0;
                }

                afk[mentionedJids[i]].users[event.sender]++;

                if (afk[mentionedJids[i]].users[event.sender] > 3) {
                    continue;
                }

                let message = txt[afk[mentionedJids[i]].users[event.sender]];
                let afkMessage = ((message ? message : "") + ` *@${mentionedJids[i].split("@")[0]} currently AFK.*\n*Reason:* ${afk[mentionedJids[i]].reason.replace("@lastseen", "\n*Lastseen:* " + getTimeDifference(afk[mentionedJids[i]].lastseen) + "\n")}`).trim();
                await sendWelcome(event, afkMessage, event, mentionedJids[i]);
            }
        }
    } catch (error) {
        console.log("ERROR IN AFK MAIN\n", error);
    }
});