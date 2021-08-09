const { Model, DataTypes } = require('sequelize');

const sequelize = require('../utils/db_connect');

class Article extends Model { };

Article.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "UNTITLED"
        },
        subtitle: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.TEXT,
        },
        stats: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 10
        },
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "General"
        },
        featured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'article',
    }
);

module.exports = Article;