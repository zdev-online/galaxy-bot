import { MessageContext } from "vk-io";
import { IUser } from "../interfaces";
import CMDManager from "../modules/CMDManager";
import roles from "../modules/roles";

export default (cmd: CMDManager) => {
    
    // Профиль пользователя
    cmd.hear(/^(проф(иль)?|prof(ile)?)/i, roles.USER, (ctx: MessageContext, user: IUser, next: Function) => {
        try {
            if(ctx.isChat){

            } else {

            }
        } catch(e) {

        }
    });
}