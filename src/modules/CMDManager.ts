import { MessageContext, VK } from "vk-io";
import { ICallbackData, ICommands, IUser } from '../interfaces';

class CMDManager {
    private vk: VK;
    private commands: ICommands[];
    public length: number;
    private fallback: (ctx: MessageContext, data: ICallbackData, next: Function) => any;

    constructor(vk: VK) {
        this.vk = vk;
        this.commands = [];
        this.length = 0;
        this.fallback = (ctx: MessageContext, data: ICallbackData, next: Function) => {
            if(!ctx.isChat){ return ctx.send(`Команда не найдена!`); }
            return;
        }

        this.hear = this.hear.bind(this);
        this.middleware = this.middleware.bind(this);
        this.onFallback = this.onFallback.bind(this);
    }


    hear(string: string, need_level: number | boolean, callback: (ctx: MessageContext, data: ICallbackData, next: Function) => any): void;
    hear(regexp: RegExp, need_level: number | boolean, callback: (ctx: MessageContext, data: ICallbackData, next: Function) => any): void;

    hear(matcher: string | RegExp, need_level: number | boolean, callback: (ctx: MessageContext, data: ICallbackData, next: Function) => any): void {
        this.length++;
        this.commands.push({ matcher, callback, need_level });
    }


    middleware(ctx: MessageContext, next: Function) {
        if (ctx.text) {
            for (let i = 0; i < this.length; i++) {
                let { matcher, callback, need_level } = this.commands[i];
                if(need_level){
                    if(!ctx.rights || ctx.rights.level < need_level){ return; }
                }
                if (typeof matcher == 'string') {
                    if (matcher == ctx.text) {
                        return callback(ctx, { user: ctx.user, rights: ctx.rights }, next);
                    }
                } else {
                    if (matcher.test(ctx.text)) {
                        return callback(ctx, { user: ctx.user, rights: ctx.rights }, next);
                    }
                }
            }
        }
        return this.fallback(ctx, { user: ctx.user, rights: ctx.rights }, next);
    }

    onFallback(callback: (ctx: MessageContext, data: ICallbackData, next: Function) => any){
        this.fallback = callback;
    }
}

export default CMDManager;