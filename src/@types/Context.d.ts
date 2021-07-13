import { MessageContext as MSGContext} from "vk-io";
import { IRights, IUser } from "../interfaces";

declare module "vk-io" {
    declare interface MessageContext extends MSGContext {
        user: IUser;
        rights: IRights | null
    }    
}