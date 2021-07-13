import { Model, Optional } from 'sequelize';

interface RightsAttributes {
    id: number;
    vkId: number;
    level: number;
    type: 'infinite' | 'time';
    start: Date;
    end: Date;
    createdAt: Date;
    updatedAt: Date;
};

interface RightsCreationAttributes extends Optional<RightsAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

interface IRights extends Model<RightsAttributes, RightsCreationAttributes>, RightsAttributes {
    createdAt: Date;
    updatedAt: Date;
}

export default IRights;