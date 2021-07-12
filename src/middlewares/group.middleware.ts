import { API, MessageContext } from "vk-io";

export default (api: API ) => async (ctx: MessageContext, next: Function) => {
    try {
        if(ctx.isUser){ return next(); }

        return;
    } catch(e){
        return;
    }
}