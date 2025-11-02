const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  env: {
    NODE_ENV: process.env.NODE_ENV || "production",
    CHAT_BOT_API_URL: process.env.CHAT_BOT_API_URL,
    EMAIL: process.env.EMAIL,
    FORWARDING_EMAIL: process.env.FORWARDING_EMAIL,
    EMAIL_APP_TOKEN: process.env.EMAIL_APP_TOKEN,
  },
};
