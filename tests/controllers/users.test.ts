import { useTestDatabase } from '../config/index';
import blog from '../config/blog';

const { authHelper } = require('../../helpers');

const {
    listUsers,
    getUser,
    addUser,
    modifyUser,
    deleteUser,
} = require('../../controllers/users');

useTestDatabase();

const newUser = {
    username: 'anewuser',
    email: 'anewuser@domain.com',
    first_name: 'Jane',
    last_name: 'Doe',
    password: 'theplainpasswordgoeshere',
    author_id: 2,
};

describe('Test if Users CRUD operations are working correctly', () => {
    test('Listing all Users should return rows', async () => {
        expect.assertions(1);
        const users = await listUsers(blog);
        expect(users.length).toBeGreaterThan(0);
    });

    test('Fetching a single User should return an User', async () => {
        expect.assertions(7);
        const user = await getUser(blog, 1);
        expect(user.id).toBe(1);
        expect(typeof user.username).toBe('string');
        expect(typeof user.email).toBe('string');
        expect(typeof user.first_name).toBe('string');
        expect(typeof user.last_name).toBe('string');
        expect(typeof user.password).toBe('string');
        expect(typeof user.author_id).toBe('number');
    });

    test('Adding a new User should add a single row', async () => {
        expect.assertions(1);
        const usersBefore = await listUsers(blog);
        const userLengthBefore = usersBefore.length;
        return addUser(blog, newUser).then(async () => {
            const usersAfter = await listUsers(blog);
            const userLengthAfter = usersAfter.length;
            expect(userLengthAfter).toBe(userLengthBefore + 1);
        });
    });

    test('Adding a new User should return the new User', async () => {
        expect.assertions(6);
        const addedUser = await addUser(blog, newUser);
        expect(typeof addedUser.id).toBe('number');
        expect(addedUser.username).toBe(newUser.username);
        expect(addedUser.email).toBe(newUser.email);
        expect(addedUser.first_name).toBe(newUser.first_name);
        expect(addedUser.last_name).toBe(newUser.last_name);
        expect(addedUser.author_id).toBe(newUser.author_id);
    });

    test('Adding a new User should have a hashed password', async () => {
        const { checkPasswordHash } = authHelper;
        const unhashedPassword = newUser.password;
        expect.assertions(2);
        const addedUser = await addUser(blog, newUser);
        const hashed = addedUser.password;
        const isValidHash =
            await checkPasswordHash(unhashedPassword, hashed);
        expect(hashed).not.toBe(newUser.password);
        expect(isValidHash).toBe(true);
    });

    test('Updating an User should return the modified data', async () => {
        expect.assertions(15);
        const originalUser = await getUser(blog, 1);
        expect(originalUser.id).toBe(1);
        expect(originalUser.username).not.toBe(newUser.username);
        expect(originalUser.email).not.toBe(newUser.email);
        expect(originalUser.first_name).not.toBe(newUser.first_name);
        expect(originalUser.last_name).not.toBe(newUser.last_name);
        expect(originalUser.password).not.toBe(newUser.password);
        expect(originalUser.author_id).not.toBe(newUser.author_id);
        const modifiedUser = await modifyUser(blog, 1, newUser);
        expect(modifiedUser.id).toBeDefined();
        expect(typeof modifiedUser.id).toBe('number');
        expect(modifiedUser.username).toBe(newUser.username);
        expect(modifiedUser.email).toBe(newUser.email);
        expect(modifiedUser.first_name).toBe(newUser.first_name);
        expect(modifiedUser.last_name).toBe(newUser.last_name);
        expect(modifiedUser.password).toBe(newUser.password);
        expect(modifiedUser.author_id).toBe(newUser.author_id);
    });

    test('Deleting an User should return undefined', async () => {
        expect.assertions(2);
        return deleteUser(blog, 2)
            .then(data => expect(data.id).toBe(2))
            .then(async () => expect(await getUser(blog, 2)).toBeUndefined());
    });
});
