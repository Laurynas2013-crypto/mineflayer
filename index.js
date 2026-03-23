if (typeof process !== 'undefined' && !process.browser && process.platform !== 'browser' && parseInt(process.versions.node.split('.')[0]) < 18) {
  console.error('Your node version is currently', process.versions.node)
  console.error('Please update it to a version >= 22.x.x from https://nodejs.org/')
  process.exit(1)
}

module.exports = require('./lib/loader.js')
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'TuskulenuSMP.aternos.me',
  port: 41334,
  username: 'TuskulenuBOT'
})
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
