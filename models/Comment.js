const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User');
const Post = require('./Post')

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
        date_created: {
            type: DataTypes.DATEONLY,
            defaultValue: Sequelize.NOW
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Post,
                key: 'id'
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }

);

module.exports = Comment;