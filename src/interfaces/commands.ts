import { MessageContext } from "vk-io";

interface Commands {
    matcher: string | RegExp,
    need_level: number,
    callback: (ctx: MessageContext, user: Object, next: Function) => any
}

export { 
    Commands as ICommands
}