// Node.js version check
if (typeof process !== 'undefined' && !process.browser && process.platform !== 'browser') {
  const major = parseInt(process.versions.node.split('.')[0]);
  if (major < 22) {
    console.error('Your Node version is currently', process.versions.node);
    console.error('Please update it to a version >= 22.x.x from https://nodejs.org/');
    process.exit(1);
  }
}

const mineflayer = require('mineflayer');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Bot creation function (for auto-reconnect)
function createBot() {
  const bot = mineflayer.createBot({
    host: 'TuskulenuSMP.aternos.me', // Your server
    port: 41334,                     // Server port
    username: 'TuskulenuBOT'         // Bot username
  });

  // Event handlers
  bot.on('login', () => console.log('✅ Bot logged in!'));
  bot.on('spawn', () => console.log('🌱 Bot spawned into the world!'));
  bot.on('chat', (username, message) => {
    console.log(`${username}: ${message}`); // Emojis handled safely
  });
  bot.on('error', err => console.error('❌ Bot error:', err));
  bot.on('end', () => {
    console.log('🔄 Bot disconnected, reconnecting in 5s...');
    setTimeout(createBot, 5000); // Auto-reconnect
  });

  return bot;
}

// Start the bot
const bot = createBot();

// Safely require loader.js if it exists
try {
  require('./lib/loader.js');
} catch (err) {
  console.warn('⚠️ loader.js not found, skipping...');
}

// Express server to keep bot alive
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(PORT, () => console.log(`🌐 Express server listening on port ${PORT}`));
