import { VK } from 'vk-io';
import config from './config/config';
import express, { Express } from 'express';
import logger from './modules/logger';

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
        logger.log(`Успешный запуск бота`);
    } catch(e){
        console.error(`${e.message}`);
        process.exit(-1);
    }
})();