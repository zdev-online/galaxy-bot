import { Model, Optional } from 'sequelize';
import { ISettings } from '.';

interface UserAttributes {
    id: number;
    nickname: string;
    vkId: number;
    clan?: number;
    createdAt: Date;
    updatedAt: Date;
    settings: ISettings
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'settings'> { }

interface IUser extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    createdAt: Date;
    updatedAt: Date;
    getLinkNick: () => string;
}

export default IUser;