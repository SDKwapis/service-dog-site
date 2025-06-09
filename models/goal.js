// models/goal.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Goal', {
    current: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    target: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100
    }
  }, {
    tableName: 'goals',
    // if you don’t want timestamps (createdAt/updatedAt), uncomment:
    // timestamps: false
  });
};

