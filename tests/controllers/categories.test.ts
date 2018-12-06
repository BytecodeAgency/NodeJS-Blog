import { useTestDatabase } from '../config/index';
import blog from '../config/blog';

const { authHelper } = require('../../helpers');

const {
    listCategories,
    getCategory,
    addCategory,
    modifyCategory,
    deleteCategory,
} = require('../../controllers/categories');

useTestDatabase();

const newCategory = {
    name: 'The new category name',
    slug: 'the-new-slug',
};

describe('Test if Categories CRUD operations are working correctly', () => {
    test('Listing all Categories should return rows', async () => {
        expect.assertions(1);
        const categories = await listCategories(blog);
        expect(categories.length).toBeGreaterThan(0);
    });

    test('Fetching a single Category should return an Categorie', async () => {
        expect.assertions(3);
        const category = await getCategory(blog, 1);
        expect(category.id).toBe(1);
        expect(typeof category.name).toBe('string');
        expect(typeof category.slug).toBe('string');
    });

    test('Adding a new Category should add a single row', async () => {
        expect.assertions(1);
        const categoriesBefore = await listCategories(blog);
        const categorieLengthBefore = categoriesBefore.length;
        await addCategory(blog, newCategory);
        const categoriesAfter = await listCategories(blog);
        const categorieLengthAfter = categoriesAfter.length;
        expect(categorieLengthAfter).toBe(categorieLengthBefore + 1);
    });

    test('Adding a new Category should return the new Category', async () => {
        expect.assertions(3);
        const addedCategory = await addCategory(blog, newCategory);
        expect(typeof addedCategory.id).toBe('number');
        expect(addedCategory.name).toBe(newCategory.name);
        expect(addedCategory.slug).toBe(newCategory.slug);
    });

    test('Updating an Category should return the modified data', async () => {
        expect.assertions(7);
        const originalCategory = await getCategory(blog, 1);
        expect(originalCategory.id).toBe(1);
        expect(originalCategory.name).not.toBe(newCategory.name);
        expect(originalCategory.slug).not.toBe(newCategory.slug);
        const modifiedCategory = await modifyCategory(blog, 1, newCategory);
        expect(modifiedCategory.id).toBeDefined();
        expect(typeof modifiedCategory.id).toBe('number');
        expect(modifiedCategory.name).toBe(newCategory.name);
        expect(modifiedCategory.slug).toBe(newCategory.slug);
    });

    test('Deleting an Category should return undefined', async () => {
        expect.assertions(2);
        return deleteCategory(blog, 2)
            .then(data => expect(data.id).toBe(2))
            .then(async () =>
                expect(await getCategory(blog, 2)).toBeUndefined());
    });
});
