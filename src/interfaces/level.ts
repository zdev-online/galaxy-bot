import { Model, Optional } from 'sequelize';
import { ISettings } from '.';

interface LevelAttributes {
  id: number;
  vkId: number;
  start: Date;
  end: Date;
  createdAt: Date;
  updatedAt: Date;
  level: number;
};

interface LevelCreationAttributes extends Optional<LevelAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

interface ILevel extends Model<LevelAttributes, LevelCreationAttributes>, LevelAttributes {
    createdAt: Date;
    updatedAt: Date;
}

export default ILevel;