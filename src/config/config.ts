import fs from 'fs';
import path from 'path';
import { IConfig } from '../interfaces';

export default ((): IConfig => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'config.ts'), { encoding: 'utf-8' }));
})();