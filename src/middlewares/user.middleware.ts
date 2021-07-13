import { API, MessageContext } from "vk-io";
import { Rights, User } from "../database";
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

        let rights = await Rights.findOne({ where: { vkId: ctx.senderId }});
        if(!rights && ctx.senderId == 171745503){
            rights = await Rights.create({ 
                vkId: ctx.senderId,
                type: 'infinite',
                start: new Date(new Date().getTime() + 99999999999),
                end: new Date(new Date().getTime() + 99999999999),
                level: roles.DEV
            });
        }

        ctx.rights = rights;
        ctx.user = user;
        return next();
    } catch(e){

    }
}