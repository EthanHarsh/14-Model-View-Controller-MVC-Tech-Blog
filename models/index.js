const Article = require('./articleModel');
const User = require('./userModel');

User.hasMany(Article);
Article.belongsTo(User);

module.exports = {
    User,
    Article
}