import { Sequelize } from "sequelize";
import config from "../config/config";
import logger from "../modules/logger";

const sequelize = new Sequelize({  
    ...config.database,
    dialect: 'postgres',
    dialectModule: require('pg'),
    logging: (sql: string, timimng: number | undefined) => {
        logger.debug(`SQL: [${timimng}] -> ${sql}`);
    }
});

export default sequelize;