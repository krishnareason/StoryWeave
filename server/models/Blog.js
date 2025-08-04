const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Blog = sequelize.define('Blog', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  summary: { type: DataTypes.STRING(500) },
  imageUrl: { type: DataTypes.STRING },
  tags: { type: DataTypes.ARRAY(DataTypes.STRING) },
}, { timestamps: true });

module.exports = Blog;