const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection')

class Comments extends Model {

}

Comments.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'comment'
});



module.exports = Comments;