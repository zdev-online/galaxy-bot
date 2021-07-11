import { MessageContext, VK } from "vk-io";
import { ICommands } from '../interfaces';

class CMDManager {
    private vk: VK;
    private commands: ICommands[];
    public length: number;

    constructor(vk: VK) {
        this.vk = vk;
        this.commands = [];
        this.length = 0;
    }


    hear(string: string, need_level: number, callback: (ctx: MessageContext, user: Object, next: Function) => any): void;
    hear(regexp: RegExp, need_level: number, callback: (ctx: MessageContext, user: Object, next: Function) => any): void;

    hear(matcher: string | RegExp, need_level: number, callback: (ctx: MessageContext, user: Object, next: Function) => any): void {
        this.length++;
        this.commands.push({ matcher, callback, need_level });
    }


    middleware(ctx: MessageContext, next: Function) {
        if (ctx.text) {
            for (let i = 0; i < this.length; i++) {
                let { matcher, callback, need_level } = this.commands[i];
                if(need_level > ctx.user.level){ continue; }
                if (typeof matcher == 'string') {
                    if (matcher == ctx.text) {
                        return callback(ctx, ctx.user, next);
                    }
                } else {
                    if (matcher.test(ctx.text)) {
                        return callback(ctx, ctx.user, next);
                    }
                }
            }
        }
    }
}

export default CMDManager;