const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  env: {
    NODE_ENV: process.env.NODE_ENV || "production",
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    EMAIL: process.env.EMAIL,
    FORWARDING_EMAIL: process.env.FORWARDING_EMAIL,
    EMAIL_APP_TOKEN: process.env.EMAIL_APP_TOKEN,
  },
};
