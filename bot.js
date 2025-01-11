const { Telegraf, Markup } = require('telegraf');


const bot = new Telegraf(process.env.BOT_TOKEN_30DAYS);


// Команда /start
bot.start((ctx) => {
    ctx.reply('Выберите уровень сложности:', Markup.keyboard([
        [Markup.button.webApp('Легкий', 'https://sam5213.github.io/30-days-twa-quiz-day6?level=easy')],
        [Markup.button.webApp('Средний', 'https://sam5213.github.io/30-days-twa-quiz-day6?level=medium')],
        [Markup.button.webApp('Сложный', 'https://sam5213.github.io/30-days-twa-quiz-day6?level=hard')]
    ]));
    console.log('Выбрали уровень ');
});


const userIds = {
    user1: process.env.USER1_ID, 
    user2: 'USER2_ID'  // Заменить на еще реальный ID пользователя
};

// Обработчик для получения данных из веб-приложения
bot.on('web_app_data', (ctx) => {
    console.log('Начнем обработку... ');
    try {
        console.log('Щааа');
        const data = ctx.message.web_app_data.data;
        //const data = ctx.webAppData.data;
        console.log('Полученные данные:', data);
        const parsedData = JSON.parse(data); // Парсим данные
        console.log('Распарсенные данные:', parsedData);
        const currentUser = ctx.from.id;
        const message = `Пользователь ${currentUser ? ctx.from.username : currentUser} в качестве ответа выбрал: ${parsedData.results}`; // Формируем сообщение
        console.log(message);

        // Отправляем сообщение другому пользователю
        console.log('Отправляем в чат:', userIds.user1);
        bot.telegram.sendMessage(userIds.user1, message) 
            .then(() => {
                ctx.reply('Ваш ответ был отправлен нам.');
            })
            .catch((error) => {
                console.error('Ошибка при отправке сообщения:', error);
                ctx.reply('Произошла ошибка при отправке сообщения.');
            });
    } catch (error) {
        console.error('Ошибка при обработке данных:', error);
        ctx.reply('Произошла ошибка при обработке вашего ответа.');
    }
});


bot.launch()
    .then(() => {
        console.log("Бот запущен!");
    })
    .catch((error) => {
        console.error("Ошибка при запуске бота: ", error);
    });
