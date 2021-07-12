import config from './config/config';
import logger from './modules/logger';
import sequelize from './database/database';
import CMDManager from './modules/CMDManager';
import express, { Express } from 'express';
import { VK } from 'vk-io';
import { SceneManager } from '@vk-io/scenes';
import { SessionManager } from '@vk-io/session';
import userMiddleware from './middlewares/user.middleware';
import groupMiddleware from './middlewares/group.middleware';
import fs from 'fs';
import path from 'path';
import { User } from './database';

const app: Express = express();
const vk: VK = new VK({ token: config.token });
const cmd: CMDManager = new CMDManager(vk);
const scene: SceneManager = new SceneManager();
const session: SessionManager = new SessionManager();

(async () => {
    try {
        // if in dev-mode then pooling method, else webhook
        if (config.dev) {
            await vk.updates.startPolling();
        } else {
            // @ts-expect-error
            app.use('/webhook/vk', vk.updates.getWebhookCallback());
            app.listen(3000, () => { console.log(`Сервер webhook - запущен!`); });
        }

        // Database Connect & Sync 
        await sequelize.authenticate();
        await sequelize.sync({ alter: true, force: config.dev });

        let commands: string[] = fs.readdirSync(path.join(__dirname, 'commands'));
        commands.forEach((module) => {
            require(path.join(__dirname, 'commands', module)).default(cmd);
            logger.info(`Модуль ${module} - подключен!`);
        });


        // Add middlewares to vk handlers
        vk.updates.on('message_new', userMiddleware(vk.api));
        vk.updates.on('message_new', groupMiddleware(vk.api));
        vk.updates.on('message_new', session.middleware);
        vk.updates.on('message_new', scene.middleware);
        vk.updates.on('message_new', scene.middlewareIntercept);
        vk.updates.on('message_new', cmd.middleware);

        logger.log(`Успешный запуск бота | Подключение к базе данных - установлено!`);
    } catch (e) {
        console.error(`Неудачный запуск бота: ${e}`);
        process.exit(-1);
    }
})();