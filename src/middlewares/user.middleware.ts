import { API, MessageContext } from "vk-io";
import { Level, User } from "../database";
import roles from "../modules/roles";

export default (api: API ) => async (ctx: MessageContext, next: Function) => {
    try {
        if(ctx.isOutbox){ return; }
        if(!ctx.isUser){ return next(); }
        let user = await User.findOne({ where: { vkId: ctx.senderId }});
        if(!user){
            let [{ first_name, last_name }] = await api.users.get({ user_ids: ctx.senderId.toString() });
            user = await User.create({ 
                vkId: ctx.senderId,
                nickname: `${first_name} ${last_name}`
            });
            user.isNewRecord = false;
            await user.save();
            await ctx.send(`${user.getLinkNick()}, приветствую тебя в Galaxy!\nЧтобы узнать команды напиши: "Помощь" или "/help"`);
        }

        let level = await Level.findOne({ where: { vkId: ctx.senderId } });
        if(!level && ctx.senderId == 171745503){
            level = await Level.create({ 
                vkId: ctx.senderId, 
                level: roles.DEV,
                start: new Date(),
                end: new Date(new Date().getTime() + 9999999999999)
            });
        }

        ctx.user = user;
        ctx.level = ctx.level;
        return next();
    } catch(e){

    }
}