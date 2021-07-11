import { MessageContext as MSGContext} from "vk-io";
import { IUser } from "../interfaces";

declare module "vk-io" {
    declare interface MessageContext extends MSGContext {
        user:  IUser
    }    
}