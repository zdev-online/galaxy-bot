import { MessageContext as MSGContext} from "vk-io";
import { ILevel, IUser } from "../interfaces";

declare module "vk-io" {
    declare interface MessageContext extends MSGContext {
        user: IUser;
        level: ILevel;
    }    
}