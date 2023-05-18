const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const db = require('../config/connection');
const Post = require('./Post');
const Comment = require('./Comments');


class User extends Model {
    async validatePass(provided_password) {

        const isValid = await bcrypt.compare(provided_password, this.password);

        return isValid;
    }
}

User.init({
    userName: {
        type: DataTypes.TEXT,
        allowNull: false,

    },
    password: {
        type: DataTypes.TEXT,
        validate: {
            len: 6
        },
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'user',
    hooks: {
        async beforeCreate(user) {
            const encrypted_pass = await bcrypt.hash(user.password, 10);

            user.password = encrypted_pass;
        }
    }

});


User.belongsToMany(Post, { through: "user_posts", as: 'userPosts' });
User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);



module.exports = User;







// class User extends Model { }


// User.init({
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     username: {
//         type: DataTypes.STRING,
//         allowNull
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             isEmail: true
//         }
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             len: [6]
//         }
//     }
// }, {
//     sequelize,
//     modelName: 'user',
//     hooks: {
//         async beforeCreate(user) {
//             const hashed_pass = await bcrypt.hash(user.password, 10);

//             user.password = hashed_pass;
//         }
//     }
// });


// User.prototype.validatePassword = async function (password, stored_password) {

//     return await bcrypt.compare(password, stored_password);
// }

// module.exports = User;

