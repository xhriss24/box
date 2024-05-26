let { UserFunction, fetchJson, amdJson } = require("../lib");
let fs = require("fs");
let fetch = require("node-fetch") || fetchJson || amdJson;
async function processing(msg, data) {
  try {
    const DataToProcess = require("form-data");
    return new Promise(async (obt, blob) => {
      Form = new DataToProcess();
      scheme = "https://inferenceengine.vyro.ai/" + data;
      Form.append("model_version", 1, {
        "Content-Transfer-Encoding": "binary",
        contentType: "multipart/form-data; charset=uttf-8",
      });
      Form.append("image", Buffer.from(msg), {
        filename: data + ".jpg",
        contentType: "image/jpeg",
      });
      Form.submit(
        {
          url: scheme,
          host: "inferenceengine.vyro.ai",
          path: "/" + data,
          protocol: "https:",
          headers: {
            "User-Agent": "okhttp/4.9.3",
            Connection: "Keep-Alive",
            "Accept-Encoding": "gzip",
          },
        },
        function (datab, ent) {
          if (datab) {
            blob();
          }
          let int = [];
          ent
            .on("data", function (sendl, oushl) {
              int.push(sendl);
            })
            .on("end", () => {
              obt(Buffer.concat(int));
            })
            .on("error", (_0x403a63) => {
              blob();
            });
        }
      );
    });
  } catch (err) {
    console.log(err);
    return msg;
  }
}
UserFunction(
  {
    cmdname: "hd",
    desc: "enhance image quality!",
    type: "ai",
    filename: __filename,
  },
  async (message) => {
    let match = message.image ? message : message.reply_message;
    if (!match || !match.image) {
      return await message.send("*Reply to image, to enhance quality!*");
    }
    try {
      let msg = await match.download();
      const images = await processing(msg, "enhance");
      await message.send(images, {}, "img", message);
      msg = false;
    } catch (error) {
      message.error(
        error + "\n\nCommand: remini",
        error,
        "*Process Denied :(*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "leapai",
    desc: "Generate an AI photo.",
    category: "ai",
    filename: __filename,
    use: "<query>",
  },
  async (m, query) => {
    try {
      if (!query) {
        return await m.send(
          "*_Please provide a query for the AI photo generator!_*"
        );
      }

      const apiUrl = `https://api.maher-zubair.tech/ai/photoleap?q=${encodeURIComponent(
        query
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const photoUrl = data.result;

      await m.bot.sendFromUrl(
        m.from,
        photoUrl,
        "Here is your generated photo:",
        m,
        {},
        "image"
      );
    } catch (e) {
      await m.error(`${e}\n\ncommand: leapai`, e);
    }
  }
);
const axios = require("axios");

UserFunction({
  cmdname: "alexa",
  category: "new",
  use: "[text]",
  filename: __filename,
  info: "chat with SimSimi Alexa AI!"
}, async (message, text) => {
  try {
    if (!text) {
      return await message.reply(`Hi *${message.senderName}*, do you want to talk?`);
    }

    const requestBody = {
      text: text,
      lc: "en",
      key: ""
    };

    const response = await axios.post("https://api.simsimi.vn/v2/simtalk", requestBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    const responseData = response.data;

    if (responseData.status === "200" && responseData.message) {
      await message.reply(responseData.message);
    } else {
      await message.reply("*No Response!*");
    }
  } catch (error) {
    await message.error(`${error}\n\ncommand: alexa`, error, false);
  }
});
