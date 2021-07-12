import { API, MessageContext } from "vk-io";
import { User } from "../database";

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
        }
        ctx.user = user;
        return next();
    } catch(e){

    }
}