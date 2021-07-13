import moment from "moment";
import { MessageContext } from "vk-io";
import { IUser } from "../interfaces";
import CMDManager from "../modules/CMDManager";
import logger from "../modules/logger";
import roles from "../modules/roles";

export default (cmd: CMDManager) => {
    
    // Профиль пользователя
    cmd.hear(/^(проф(иль)?|prof(ile)?)/i, false, async (ctx: MessageContext, { user, rights }, next: Function) => {
        try {
            let message: string = `${user.getLinkNick()}, твой профиль:\n\n`;
            message += `🆔 ID: ${user.id}\n`;
            if(ctx.level){
                message += `Привелегия (): ${roles.getStringNameOfRole(ctx.level.level)}\n`;
            }
            logger.debug(JSON.stringify(user.toJSON()));
            if(ctx.isChat){
                return await ctx.send(message);
            } else {
                return await ctx.send(message);
            }
        } catch(e) {
            logger.error(`Profile - ${e.message}`);
        }
    });

    cmd.hear(/^(ник|nick)$/i, false, async (ctx: MessageContext, { user, rights }, next: Function) => {
        try {
            user.settings = { ...user.settings, activeNick: !user.settings.activeNick };
            await user.save({ fields: ['settings'] });
            return await ctx.send(`${user.getLinkNick()}, теперь ник - ${user.settings.activeNick ? '' : 'не'} является ссылкой!`);
        } catch(e){
            logger.error(`Nick Status -> ${e.message}`);         
        }
    });
}