const fs = require('fs-extra')
if (fs.existsSync('.env')) require('dotenv').config({ path: __dirname+'/.env' })

global.port =process.env.PORT
global.appUrl=process.env.APP_URL || ""
global.email ="astromedia0010@gmail.com"
global.location="Astro,World"


global.mongodb= process.env.MONGODB_URI || "mongodb+srv://deepilhtre:SnevWOzpT58v3bJO@cluster0.xfekuvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
global.allowJids= process.env.ALLOW_JID || "null" 
global.blockJids= process.env.BLOCK_JID || "null"
global.DATABASE_URL = process.env.DATABASE_URL || ""

global.timezone= process.env.TZ || process.env.TIME_ZONE || "Africa/Lagos";
global.github=process.env.GITHUB|| "https://github.com/Emperordagoat/Asta-Md";
global.gurl  =process.env.GURL  || "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z";
global.website=process.env.GURL || "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z" ; 
global.THUMB_IMAGE = process.env.THUMB_IMAGE || process.env.IMAGE || "https://i.imgur.com/JMsAFRD.jpeg" ;
global.caption = process.env.CAPTION || global.caption || "αѕтα-м∂ 2024" 
global.BUTTONS = process.env.BUTTONS || process.env.MENU_BTN || "1";


global.devs = "2348039607375"
global.sudo = process.env.SUDO ? process.env.SUDO.replace(/[\s+]/g, '') : "2348039607375";
global.owner= process.env.OWNER_NUMBER ? process.env.OWNER_NUMBER.replace(/[\s+]/g, '') : "2348039607375";
global.style = process.env.STYLE   || '2'
global.flush = process.env.FLUSH   || "false"; 
global.gdbye = process.env.GOODBYE || "false"; 
global.wlcm  = process.env.WELCOME || "false";

global.warncount = process.env.WARN_COUNT || 3
global.disablepm = process.env.DISABLE_PM || "false"
global.disablegroup = process.env.DISABLE_GROUPS || "false",

global.MsgsInLog = process.env.MSGS_IN_LOG|| "true" 
global.userImages= process.env.USER_IMAGES || "https://i.imgur.com/mHEqQgr.jpg,https://i.imgur.com/lSdca7B.jpg,https://i.imgur.com/XakNh3r.jpg,https://i.imgur.com/UslG8eB.jpg,https://i.imgur.com/0OQxTyt.jpg,https://i.imgur.com/MJCmdiA.jpg,https://i.imgur.com/K7zFZl2.jpg"
global.waPresence= process.env.WAPRESENCE ||  "online" ;


//========================= [ AUTO READ MSGS & CMDS ] =========================\\
global.readcmds = process.env.READ_COMMAND || "false"
global.readmessage = process.env.READ_MESSAGE || "false"
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "2348039607375";


global.read_status = process.env.AUTO_READ_STATUS || "false"
global.save_status = process.env.AUTO_SAVE_STATUS || "false"
global.save_status_from =  process.env.SAVE_STATUS_FROM  || "2348039607375";
global.read_status_from =  process.env.READ_STATUS_FROM  ||  "2348039607375";

global.api_smd = "https://api-amd.onrender.com"
global.scan = "https://suhail-md-vtsf.onrender.com";


global.SESSION_ID = process.env.SESSION_ID ||  "Astro;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0ZaZHlCNUdHV1BXNlVLaXVSUHBYa1lRcUxCTm9Ja21mWmJkMFV5OWEyTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU2N0aUFsU2RodE1yUFNIcVBIeDFiZ29YTzQ4WjI2RkUwQ2tQUkdtL3h4RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2Qlg3WVA3L3RLS1JUb24rakwzK3d6ZlRXMVh4SkJEYWI5SXJzSmZDRDAwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrWjRJd21GbWEySVdoV1BEamtpUnRrYkh0S1poVGxYNlVLanFPQUZ1Qm5JPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNBNDIxZmRrVG1SNWFYVnIySWFuRldJVlh3RTFuQUpyVXp0bU1QQ2FGM289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZkdGFzd0pINmZmcXd6YVE0ZVlucnZHRXlZOWxVck1SSkVDbHlhTExOM0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK00wdTFtSzNCK2s3Y21TZkZzSXJTejN1S1VHMUdWZy9NNFBsS1RWRG8wTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVlpLeHh0d21WZ1hwN1RKNjY4Q1Evd2ordGZUcG94YmJTQ0l2MFErVXQyTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InU1OGZPa0RvZVBza3NYVjVLWVgrWm44Z2thR2RRdFVnV3p1aVRMYUZCQnR0dVBXbGI2SGlKTitiRFhhQ2tjQ0VNeFArbEdCdTJTVmgyWWMzQ2hOTUJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA3LCJhZHZTZWNyZXRLZXkiOiIvYXVXYmkxdDZCbmlGdkZLZXE0RGJFUHF3S21hdTRsaUFIajRXWU9PSVhzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJBSklRZUtOeVRJdXB1ejRLeTFCV3NBIiwicGhvbmVJZCI6IjczMDZkMzdiLTY4ZmYtNGZiZi1iMDkyLWE3YTAxMTk3ZWFhZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1WnFiYWtDa2ljTDBnbkhxdUxEOXFnSTdHVVk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUSttbjg1bmxOeE1BMXpmWUlMR0ZzaCtiSHIwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik5BVFBXVjdUIiwibWUiOnsiaWQiOiIyMzQ3MDQxNjIwNjE3OjMzQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMNmk4YmdGRUw3TjM3TUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ1MlRIajhyRmF0T2VPclpkZ1E4ckJQc3lMb0tVRjNoM0NuNmdtd1hKRmpnPSIsImFjY291bnRTaWduYXR1cmUiOiJKV280S2tjY1dhZ29uZFpjM2NUaWY1eWlNU0FZYW5WdEFNbkU4eEQzRGYxd216NXRTSFk2QVpyMno0YW1LZkJTTFIvNW1uZzFQQ2ovT1NZbkZGVitDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiU2l1WVNjdVRFVjBBUmR4R2czLzZTY281c1JmWTRuQ2R0OThSa3pVNnVjT290em5BM3p6NlZIUlVDYXhodld0YTAza1VCM1lVaVJLamd0b005SUVQQ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDQxNjIwNjE3OjMzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJ0a3g0L0t4V3JUbmpxMlhZRVBLd1Q3TWk2Q2xCZDRkd3Arb0pzRnlSWTQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTkxMzM4OTksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRTFiIn0="


module.exports = {

  menu: process.env.MENU || "", 

  HANDLERS: process.env.PREFIX  || "/",
  BRANCH  : process.env.BRANCH  || "main",
  VERSION : process.env.VERSION || "3.0.0",
  caption : global.caption || "αѕтα-м∂ 2024" , 
 
  author : process.env.PACK_AUTHER|| "αѕтяσ",
  packname: process.env.PACK_NAME || "αѕтяσ",
  botname : process.env.BOT_NAME  || "ᴀsᴛᴀ-ᴍᴅ",
  ownername:process.env.OWNER_NAME|| "αѕтяσ",
  errorChat : process.env.ERROR_CHAT || "",
  KOYEB_API : process.env.KOYEB_API  || "false",
  REMOVE_BG_KEY : process.env.REMOVE_BG_KEY  || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME:process.env.HEROKU_APP_NAME|| "",
  antilink_values:process.env.ANTILINK_VALUES|| "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,
  WORKTYPE: process.env.WORKTYPE || process.env.MODE|| "private",
  LANG: ( process.env.THEME ||  "main"  ).toUpperCase(),
};
global.ELEVENLAB_API_KEY = process.env.ELEVENLAB_API_KEY || "";
global.aitts_Voice_Id = process.env.AITTS_ID|| "37";
global.rank = "updated" // Don't Touch
global.isMongodb = false; // Don't Touch Else Bot Won't Work
let file = require.resolve(__filename)
fs.watchFile(file, () => { fs.unwatchFile(file);console.log(`Update'${__filename}'`);delete require.cache[file];	require(file); })
