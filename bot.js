require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const token =
  process.env.BOT_TOKEN || '1476255713:AAH9FRfnjNhnCKjAT0UGcTVLAEdkD7qVRdg';
const bot = new TelegramBot(token, { polling: true });
const {
  infoRecipe,
  mealsOfOneCategory,
  buttonsCategotyList,
  allCategotyList,
  allCategotyList2,
} = require('./fetch');

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Choose category 🥗', {
    reply_markup: {
      inline_keyboard: await allCategotyList(),
    },
  });
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  let categories = await allCategotyList2();

  if (categories.includes(query.data)) {
    bot.sendMessage(chatId, 'Choose dish 🍝', {
      reply_markup: {
        inline_keyboard: await buttonsCategotyList(
          await mealsOfOneCategory(query.data)
        ),
      },
    });
  } else {
    bot.sendMessage(chatId, await infoRecipe(query.data));
  }
});
