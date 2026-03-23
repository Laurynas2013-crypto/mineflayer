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

// Create the bot
const bot = mineflayer.createBot({
  host: 'TuskulenuSMP.aternos.me', // Your server address
  port: 41334,                     // Your server port
  username: 'TuskulenuBOT'         // Bot username
});

// Event handlers
bot.on('login', () => {
  console.log('✅ Bot has logged in!');
});

bot.on('spawn', () => {
  console.log('🌱 Bot has spawned into the world!');
});

bot.on('error', err => {
  console.error('❌ Bot error:', err);
});

bot.on('end', () => {
  console.log('🔄 Bot disconnected, attempting to reconnect...');
  // Optional: Auto-reconnect after 5 seconds
  setTimeout(() => {
    bot = mineflayer.createBot({
      host: 'TuskulenuSMP.aternos.me',
      port: 41334,
      username: 'TuskulenuBOT'
    });
  }, 5000);
});

// If you need loader.js, require it after bot creation
try {
  require('./lib/loader.js');
} catch (err) {
  console.warn('⚠️ loader.js not found, skipping...');
}
