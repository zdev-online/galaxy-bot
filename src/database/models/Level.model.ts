import { DataTypes } from "sequelize/types";
import tableNames from "../../config/tableNames";
import { ILevel } from "../../interfaces";
import sequelize from "../database";


const Level = sequelize.define<ILevel>('Level', {
    id: { type: DataTypes.NUMBER, allowNull: false, autoIncrement: true, unique: true, primaryKey: true },
    vkId: { type: DataTypes.NUMBER, allowNull: false },
    start: { type: DataTypes.DATE, allowNull: false },
    end: { type: DataTypes.DATE, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    level: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: tableNames.levels });


export default Level;