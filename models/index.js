// models/index.js

require('dotenv').config();
const { Sequelize } = require('sequelize');

let sequelize;
if (process.env.DATABASE_URL) {
  // Use the single DATABASE_URL if provided (e.g. on Render)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: process.env.NODE_ENV === 'production'
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {}
  });
} else {
  // Fallback to individual DB_ vars for local development
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: false
    }
  );
}

// Import your models
const Goal  = require('./goal')(sequelize);
const Video = require('./video')(sequelize);

// Export the sequelize instance and models
module.exports = sequelize;
module.exports.models = { Goal, Video };


