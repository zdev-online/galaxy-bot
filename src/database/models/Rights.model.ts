import tableNames from "../../config/tableNames";
import { IRights } from "../../interfaces";
import sequelize from "../database";
import { DataTypes } from 'sequelize';

const Rights = sequelize.define<IRights>('Rights', {
    id: { type: DataTypes.NUMBER, autoIncrement: true, primaryKey: true },
    vkId: { type: DataTypes.NUMBER, allowNull: false },
    level: { type: DataTypes.NUMBER, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    start: { type: DataTypes.DATE, allowNull: false },
    end: { type: DataTypes.DATE, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: tableNames.rights,
    timestamps: true
});

export default Rights;