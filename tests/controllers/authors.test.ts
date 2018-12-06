import { useTestDatabase } from '../config/index';
import blog from '../config/blog';

const {
    listAuthors,
    getAuthor,
    addAuthor,
    modifyAuthor,
    deleteAuthor,
} = require('../../controllers/authors');

useTestDatabase();

const newAuthor = {
    name: 'John Doe 2',
    image_url: 'http://placekitten.com/150/150',
    role: 'Tester',
};

describe('Test if Authors CRUD operations are working correctly', () => {
    test('Listing all Authors should return rows', async () => {
        expect.assertions(1);
        const authors = await listAuthors(blog);
        expect(authors.length).toBeGreaterThan(0);
    });

    test('Fetching a single Author should return an Author', async () => {
        expect.assertions(4);
        const author = await getAuthor(blog, 1);
        expect(author.id).toBe(1);
        expect(typeof author.name).toBe('string');
        expect(typeof author.image_url).toBe('string');
        expect(typeof author.role).toBe('string');
    });

    test('Adding a new Author should add a single row', async () => {
        expect.assertions(1);
        const authorsBefore = await listAuthors(blog);
        const authorLengthBefore = authorsBefore.length;
        return addAuthor(blog, newAuthor).then(async () => {
            const authorsAfter = await listAuthors(blog);
            const authorLengthAfter = authorsAfter.length;
            expect(authorLengthAfter).toBe(authorLengthBefore + 1);
        });
    });

    test('Adding a new Author should return the new Author', async () => {
        expect.assertions(5);
        const addedAuthor = await addAuthor(blog, newAuthor);
        expect(addedAuthor.id).toBeDefined();
        expect(typeof addedAuthor.id).toBe('number');
        expect(addedAuthor.name).toBe(newAuthor.name);
        expect(addedAuthor.image_url).toBe(newAuthor.image_url);
        expect(addedAuthor.role).toBe(newAuthor.role);
    });

    test('Updating an Author should return the modified data', async () => {
        expect.assertions(9);
        const originalAuthor = await getAuthor(blog, 1);
        expect(originalAuthor.id).toBe(1);
        expect(originalAuthor.name).not.toBe(newAuthor.name);
        expect(originalAuthor.image_url).not.toBe(newAuthor.image_url);
        expect(originalAuthor.role).not.toBe(newAuthor.role);
        const modifiedAuthor = await modifyAuthor(blog, 1, newAuthor);
        expect(modifiedAuthor.id).toBeDefined();
        expect(typeof modifiedAuthor.id).toBe('number');
        expect(modifiedAuthor.name).toBe(newAuthor.name);
        expect(modifiedAuthor.image_url).toBe(newAuthor.image_url);
        expect(modifiedAuthor.role).toBe(newAuthor.role);
    });

    test('Deleting an Author should return the deleted Author ID', async () => {
        expect.assertions(2);
        const deletedResponse = await deleteAuthor(blog, 1);
        const deletedAuthor = await getAuthor(blog, 1);
        expect(deletedResponse.id).toBe(1);
        expect(deletedAuthor).toBeUndefined();
    });
});
