import { Model, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  nickname: string;
  vkId: number;
  clan?: number;  
  level: number;
  createdAt: Date;
  updatedAt: Date;
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'level' | 'createdAt' | 'updatedAt'> {}

interface IUser extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    createdAt: Date;
    updatedAt: Date;
}

export default IUser;