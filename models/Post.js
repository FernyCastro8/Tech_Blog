const { Model, DataTypes } = require("sequelize");
const Comments = require('./Comments');
const db = require('../config/connection');


class Post extends Model { }

Post.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'post'
});

Post.hasMany(Comments);


module.exports = Post;