const { smd, prefix, Config } = require("../lib");

let lolkeysapi = "GataDios";
let gfxx = [
    "gfx1", "gfx2", "gfx3", "gfx4", "gfx5", "gfx6", "gfx7",
    "gfx8", "gfx9", "gfx10", "gfx11", "gfx12", "gfx13", "gfx14"
];

let GfxFunc = async (context, { Void = '', text = '', smd = '' }, sendError = true) => {
    try {
        text += ": ser";
        const exampleUsage = `Example  : *${prefix}${smd}* Asta`;
        const formatInstruction = `*Separate the text with ':' sign*\n*Example : ${prefix}${smd} Asta : Bot*`;

        let textParts = text.split(":");
        let firstPart = textParts[0];
        let lowerCaseSmd = smd.toLowerCase();

        const sendImage = (url) => context.send(url, { caption: Config.caption }, "img", context);

        switch (lowerCaseSmd) {
            case "gfx1":
                if (!firstPart) throw exampleUsage;
                sendImage(`https://api.caliph.biz.id/api/kaneki?nama=${encodeURIComponent(firstPart)}&apikey=caliphkey`);
                break;
            case "gfx2":
                if (!text.includes(":")) throw formatInstruction;
                let [name1, name2] = text.split(":").map(part => part.trim());
                sendImage(`https://api.caliph.biz.id/api/girlneko?nama=${encodeURIComponent(name1)}&nama2=${encodeURIComponent(name2)}&apikey=caliphkey`);
                break;
            case "gfx3":
                if (!firstPart) throw exampleUsage;
                sendImage(`https://api.caliph.biz.id/api/rem?nama=${encodeURIComponent(firstPart)}&apikey=caliphkey`);
                break;
            case "gfx4":
                if (!firstPart) throw exampleUsage;
                sendImage(`https://api.caliph.biz.id/api/textpro/matrix?text=${encodeURIComponent(firstPart)}&apikey=caliphkey`);
                break;
            case "gfx5":
                if (!firstPart) throw exampleUsage;
                sendImage(`https://api.lolhuman.xyz/api/textprome/jokerlogo?apikey=${lolkeysapi}&text=${encodeURIComponent(firstPart)}`);
                break;
            case "gfx6":
                if (!text.includes(":")) throw formatInstruction;
                [name1, name2] = text.split(":").map(part => part.trim());
                sendImage(`https://api.lolhuman.xyz/api/textprome2/lionlogo?apikey=${lolkeysapi}&text1=${encodeURIComponent(name1)}&text2=${encodeURIComponent(name2)}`);
                break;
            case "gfx7":
                if (!text.includes(":")) throw formatInstruction;
                [name1, name2] = text.split(":").map(part => part.trim());
                sendImage(`https://api.lolhuman.xyz/api/photooxy2/battlefield4?apikey=${lolkeysapi}&text1=${encodeURIComponent(name1)}&text2=${encodeURIComponent(name2)}`);
                break;
            case "gfx8":
                if (!firstPart) throw exampleUsage;
                sendImage(`https://api.lolhuman.xyz/api/ephoto1/anonymhacker?apikey=${lolkeysapi}&text=${encodeURIComponent(firstPart)}`);
                break;
            case "gfx9":
                if (!firstPart) throw exampleUsage;
                sendImage(`https://api.lolhuman.xyz/api/ephoto1/avatarlolnew?apikey=${lolkeysapi}&text=${encodeURIComponent(firstPart)}`);
                break;
            case "gfx10":
                if (!firstPart) throw exampleUsage;
                sendImage(`https://api.lolhuman.xyz/api/ephoto1/avatardota?apikey=${lolkeysapi}&text=${encodeURIComponent(firstPart)}`);
                break;
            case "gfx11":
                if (!text.includes(":")) throw formatInstruction;
                [name1, name2] = text.split(":").map(part => part.trim());
                sendImage(`https://api.lolhuman.xyz/api/ephoto2/codwarzone?apikey=${lolkeysapi}&text1=${encodeURIComponent(name1)}&text2=${encodeURIComponent(name2)}`);
                break;
            case "gfx12":
                if (!firstPart) throw exampleUsage;
                sendImage(`https://api.lolhuman.xyz/api/ephoto1/freefire?apikey=${lolkeysapi}&text=${encodeURIComponent(firstPart)}`);
                break;
            case "gfx13":
                if (!text.includes(":")) throw formatInstruction;
                [name1, name2] = text.split(":").map(part => part.trim());
                sendImage(`https://api.caliph.biz.id/api/sadboy?nama=${encodeURIComponent(name1)}&nama2=${encodeURIComponent(name2)}&apikey=caliphkey`);
                break;
            case "gfx14":
                if (!text.includes(":")) throw formatInstruction;
                [name1, name2] = text.split(":").map(part => part.trim());
                sendImage(`https://api.caliph.biz.id/api/lolimaker?nama=${encodeURIComponent(name1)}&nama2=${encodeURIComponent(name2)}&apikey=caliphkey`);
                break;
            default:
                break;
        }
    } catch (error) {
        console.error(error);
        if (sendError) {
            context.send(String(error));
        }
    }
};

for (let cmd of gfxx) {
    smd({
        cmdname: cmd,
        infocmd: "create a gfx logo for text",
        type: "gfx"
    }, async (context, text, { smd = '', Void = '' }) => {
        try {
            GfxFunc(context, { text, Void, smd });
        } catch (error) {
            console.error(error);
        }
    });
}

smd({
    cmdname: "gfx",
    infocmd: "create gfx logo for text",
    type: "gfx"
}, async (context, text, { smd = '', Void = '' }) => {
    try {
        const formatInstruction = `*Separate the text with _:_ sign!*\n*Example : ${prefix}${smd} Asta _:_ Bot*`;

        if (!text) {
            const gfxMenu = `
┌───〈 *ɢꜰx ᴍᴇɴᴜ*  〉───◆
│╭─────────────···▸
┴│▸
⬡│▸ ${gfxx.join(" \n⬡│▸ ")}
┬│▸
│╰────────────···▸▸
└───────────────···▸
            
*USE: ${prefix}${smd} Asta:Md*
_To get All Results with single Cmd!_
            `;
            return await context.sendUi(context.chat, { caption: gfxMenu });
        }

        if (!text.includes(":")) {
            return context.send(formatInstruction);
        }

        for (let i = 0; i < gfxx.length; i++) {
            GfxFunc(context, { text, Void, smd: `gfx${i + 1}` }, false);
        }
    } catch (error) {
        context.error(`${error}\n\nCommand: ${smd}`, error, false);
    }
});
