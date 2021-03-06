"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Codes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Codes.init(
    {
      code: { type: DataTypes.STRING, unique: true, allowNull: false },
      user_id: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    },
    {
      sequelize,
      modelName: "Codes",
    }
  );
  return Codes;
};
