const knex = require('../helpers/database');

const listUsers = async () => {
    const Users = await knex.select('*').from('users');
    return Users;
};

const getUser = async id => {
    const user = await knex
        .select('*')
        .from('users')
        .where({ id });
    return user[0];
};

const addUser = async user => {
    const newUserData = {
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        password: `${user.password}NONHASHED!`, // TODO: Add hashing
        author_id: user.author_id,
    };
    const returning = [
        'id',
        'username',
        'email',
        'first_name',
        'last_name',
        'password',
        'author_id',
    ];
    const newUser = await knex('users')
        .insert([newUserData])
        .returning(returning);
    return newUser[0];
};

const modifyUser = async (id, user) => {
    const {
        /* eslint-disable camelcase */
        username,
        email,
        first_name,
        last_name,
        password,
        author_id,
    } = user;
    const newUserData = {
        username,
        email,
        first_name,
        last_name,
        password,
        author_id,
    }; /* eslint-enable */
    const returning = [
        'id',
        'username',
        'email',
        'first_name',
        'last_name',
        'password',
        'author_id',
    ];
    const oldUserData = getUser(id);
    const newUser = Object.assign({}, { ...oldUserData, ...newUserData });
    const modifiedUser = await knex('users')
        .returning(returning)
        .where('id', '=', id)
        .update(newUser);
    return modifiedUser[0];
};

const deleteUser = async id =>
    knex('users')
        .returning(['id'])
        .where({ id })
        .delete();

module.exports = {
    listUsers,
    getUser,
    addUser,
    modifyUser,
    deleteUser,
};
