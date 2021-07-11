import { MessageContext } from "vk-io";
import { IUser } from ".";

interface Commands {
    matcher: string | RegExp,
    need_level: number,
    callback: (ctx: MessageContext, user: IUser, next: Function) => any
}

export { 
    Commands as ICommands
}