const { UserFunction, smdBuffer } = require("../lib");
const fetch = require("node-fetch");
const Config = require("../config");
const cheerio = require("cheerio");

let tmpUrl = "https://telegra.ph/file/b8e96b599e0fa54d25940.jpg";
const secmailData = {};

UserFunction({
    pattern: "tempmail",
    info: "Create a temporary email address and use it according to your need",
    type: "email"
}, async (message, match) => {
    try {
        if (!secmailData[message.sender]) {
            const tempEmail = await tempmail.create();
            if (!tempEmail || !tempEmail[0]) {
                return await message.reply("*Request Denied!*");
            }
            const [email, domain] = tempEmail[0].split("@");
            secmailData[message.sender] = { email, login: email.split(".")[0], domain };
        }
        let thumbnail = false;
        try {
            thumbnail = await smdBuffer(tmpUrl);
        } catch (error) { }
        const responseText = `*YOUR TEMPMAIL INFO*\n\n*EMAIL:* ➪ ${secmailData[message.sender].email}\n*Login:* ➪ ${secmailData[message.sender].login}\n*Domain:* ➪ ${secmailData[message.sender].domain}\n\n*USE ${prefix}checkmail to get the latest emails!*\n*USE ${prefix}delmail to delete the current email!*\n\n${Config.caption}`.trim();
        await message.reply(responseText, {
            contextInfo: {
                ...(await message.bot.contextInfo("TEMPMAIL", message.senderName, thumbnail))
            }
        });
    } catch (error) {
        console.log(error);
        await message.reply("*Request Denied!*");
    }
});

UserFunction({
    pattern: "checkmail",
    type: "email",
    info: "Check mails in your temporary email address"
}, async (message, match) => {
    try {
        const sender = message.sender;
        const { email: login, domain } = secmailData[sender] || {};
        if (!login) {
            return await message.reply("*You haven't created a temporary email.*\n*Use "+prefix+"tempmail to create an email first!*");
        }
        const emails = await tempmail.mails(login, domain);
        if (!emails || !emails[0] || emails.length === 0) {
            return await message.reply("*EMPTY ➪ No mails received yet!*\n*Use ${prefix}delmail to delete mail!*");
        }
        let thumbnail = false;
        try {
            thumbnail = await smdBuffer(tmpUrl);
        } catch (error) { }
        for (const email of emails) {
            const content = await tempmail.emailContent(login, domain, email.id);
            if (content) {
                const messageText = `*From* ➪ ${email.from}\n*Date* ➪ ${email.date}\n*EMAIL ID* ➪ [${email.id}]\n*Subject* ➪ ${email.subject}\n*Content* ➪ ${content}`;
                await message.reply(messageText, {
                    contextInfo: {
                        ...(await message.bot.contextInfo(`*EMAIL ➪ ${email.id}*`, message.senderName, thumbnail))
                    }
                });
            }
        }
    } catch (error) {
        console.log(error);
        await message.reply("*Request Denied!*");
    }
});

UserFunction({
    pattern: "delmail",
    type: "email",
    info: "Delete temporary email address"
}, async (message, match) => {
    try {
        const sender = message.sender;
        if (secmailData[sender]) {
            delete secmailData[sender];
            await message.reply("*Successfully deleted the email address.*");
        } else {
            await message.reply("*No email address to delete.*");
        }
    } catch (error) {
        console.log(error);
        await message.reply("*Request Denied!*");
    }
});

const tempmail = {
    create: async () => {
        const url = "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
            }
            return await response.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    mails: async (login, domain) => {
        const url = `https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
            }
            return await response.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    emailContent: async (login, domain, id) => {
        const url = `https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
            }
            const json = await response.json();
            const $ = cheerio.load(json.htmlBody);
            return $.text();
        } catch (error) {
            console.log(error);
            return null;
        }
    }
};
