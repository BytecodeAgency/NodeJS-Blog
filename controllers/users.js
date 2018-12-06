const { authHelper } = require('../helpers');

const listUsers = async knex => {
    const Users = await knex.select('*').from('users');
    return Users;
};

const getUser = async (knex, id) => {
    const user = await knex
        .select('*')
        .from('users')
        .where({ id });
    return user[0];
};

const addUser = async (knex, user) => {
    const passwordHash = await authHelper.generatePasswordHash(user.password);
    const newUserData = {
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        password: passwordHash,
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

const modifyUser = async (knex, id, user) => {
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
    const oldUserData = getUser(knex, id);
    const newUser = Object.assign({}, { ...oldUserData, ...newUserData });
    const modifiedUser = await knex('users')
        .returning(returning)
        .where('id', '=', id)
        .update(newUser);
    return modifiedUser[0];
};

const deleteUser = async (knex, id) =>
    new Promise(resolve =>
        knex('users')
            .returning(['id'])
            .where({ id })
            .delete()
            .then(data => resolve(data[0])),
        ); // eslint-disable-line

module.exports = {
    listUsers,
    getUser,
    addUser,
    modifyUser,
    deleteUser,
};
