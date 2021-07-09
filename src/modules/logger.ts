import moment from 'moment';
import { ILoggerOptions } from '../interfaces';
import fs from 'fs';
import path from 'path';
import colors from 'colors';

class Logger {
    private path: string;

    constructor(options: ILoggerOptions){
        this.path = options.log_path;
        if(!fs.existsSync(this.path)){
            fs.mkdirSync(this.path);
        }
    }

    info(data: string){
        return this.write(data, 'info');
    }
    error(data: string){
        return this.write(data, 'error');
    }
    log(data: string){
        return this.write(data, 'log');
    }
    debug(data: string){
        console.debug(data);
    }

    private write(data: string, type: 'error' | 'info' | 'log'): Boolean{
        try {
            let date = moment().format('HH:mm:ss, DD.MM.YY');
            let path_to_file = path.normalize(`${this.path}${moment().format('DD.MM.YY')}-${type}.log`);
            if(!fs.existsSync(path_to_file)){
                fs.writeFileSync(path_to_file, '', { encoding: 'utf-8' });
            }
            let logs = fs.readFileSync(path_to_file, { encoding: 'utf-8' });
            logs += `[${date}] [${type.toUpperCase()}] ${data}\n`;
            fs.writeFileSync(path_to_file, logs, { encoding: 'utf-8' });
            let message: string = `[${date}] [${type.toUpperCase()}] ${data}`;
            message = type == 'error' ? colors.red(message) : message;
            message = type == 'log' ? colors.green(message) : message;
            message = type == 'info' ? colors.gray(message) : message;
            console[type](message);
            return true;
        } catch(e){
            console.error(`Ошибка записи лога: ${e.message}`);
            return false;
        }
    }
}

export default new Logger({ log_path: path.join(__dirname, '..', 'logs', '/') });