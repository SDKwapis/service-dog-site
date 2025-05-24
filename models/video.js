const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Video', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.TEXT
  });
};