import { MessageContext } from "vk-io";
import { ICallbackData, IUser } from ".";

interface Commands {
    matcher: string | RegExp,
    need_level: number | boolean,
    callback: (ctx: MessageContext, data: ICallbackData, next: Function) => any
}

export { 
    Commands as ICommands
}