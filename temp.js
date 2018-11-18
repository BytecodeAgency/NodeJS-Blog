const controllers = require('./controllers');

const authors = {
    getAuthors: controllers.Authors.list,
    getAuthor: controllers.Authors.show,
    addAuthor: controllers.Authors.create,
    updateAuthor: controllers.Authors.update,
    removeAuthor: controllers.Authors.remove,
};

const users = {
    getUsers: controllers.Users.list,
    getUser: controllers.Users.show,
    addUser: controllers.Users.create,
    updateUser: controllers.Users.update,
    removeUser: controllers.Users.remove,
};

const categories = {
    getCategories: controllers.Categories.list,
    getCategory: controllers.Categories.show,
    addCategory: controllers.Categories.create,
    updateCategory: controllers.Categories.update,
    removeCategory: controllers.Categories.remove,
};

const posts = {
    getPosts: controllers.Posts.list,
    getPost: controllers.Posts.show,
    addPost: controllers.Posts.create,
    updatePost: controllers.Posts.update,
    removePost: controllers.Posts.remove,
};

const test = {
    ...controllers,
};
console.log(test);

module.exports = {
    ...authors,
    ...users,
    ...categories,
    ...posts,
};
