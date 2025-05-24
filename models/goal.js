const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Goal', {
    target: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    current: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
};