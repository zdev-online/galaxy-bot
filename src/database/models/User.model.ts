import { DataTypes } from "sequelize";
import tableNames from "../../config/tableNames";
import { IUser } from "../../interfaces";
import roles from "../../modules/roles";
import sequelize from "../database";

const User = sequelize.define <IUser>('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    vkId: { type: DataTypes.INTEGER, allowNull: false },
    nickname: { type: DataTypes.STRING(100), allowNull: false },
    level: { type: DataTypes.INTEGER, defaultValue: roles.USER, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: tableNames.users,
    timestamps: true
});

export default User;