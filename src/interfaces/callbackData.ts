import IRights from "./rights";
import IUser from "./user";

interface CallbackData {
    user: IUser,
    rights: IRights | null
}

export default CallbackData;