import { VK } from 'vk-io';
import config from './config/config';
import express, { Express } from 'express';
import logger from './modules/logger';
import sequelize from './database/database';

const app: Express = express();
const vk: VK = new VK({ token: config.token });

(async () => {
    try {
        if(config.dev){
            await vk.updates.startPolling();
        } else {
            // @ts-expect-error
            app.use('/webhook/vk', vk.updates.getWebhookCallback());
            app.listen(3000, () => { console.log(`Сервер webhook - запущен!`); });
        }
        await sequelize.authenticate();
        await sequelize.sync({ alter: true, force: config.dev });
        logger.log(`Успешный запуск бота | Подключение к базе данных - установлено!`);
    } catch(e){
        console.error(`Неудачный запуск бота: ${e}`);
        process.exit(-1);
    }
})();