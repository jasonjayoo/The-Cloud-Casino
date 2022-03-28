//IMPORT MODELS
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post);
User.hasMany(Comment);
Post.hasMany(Comment);

Post.belongsTo(User);
Comment.belongsTo(Post);
Comment.belongsTo(User);

module.exports = {
    User,
    Post,
    Comment
}
