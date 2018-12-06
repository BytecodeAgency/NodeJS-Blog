const listCategories = async knex => {
    const Categories = await knex.select('*').from('categories');
    return Categories;
};

const getCategory = async (knex, id) => {
    const category = await knex
        .select('*')
        .from('categories')
        .where({ id });
    return category[0];
};

const addCategory = async (knex, category) => {
    const newCategoryData = {
        name: category.name,
        slug: category.slug,
    };
    const returning = ['id', 'name', 'slug'];
    const newCategory = await knex('categories')
        .insert([newCategoryData])
        .returning(returning);
    return newCategory[0];
};

const modifyCategory = async (knex, id, category) => {
    const { name, slug } = category;
    const newCategoryData = { name, slug };
    const returning = ['id', 'name', 'slug'];
    const oldCategoryData = getCategory(knex, id);
    const newCategory = Object.assign(
        {},
        { ...oldCategoryData, ...newCategoryData },
    );
    const modifiedCategory = await knex('categories')
        .returning(returning)
        .where('id', '=', id)
        .update(newCategory);
    return modifiedCategory[0];
};

const deleteCategory = async (knex, id) =>
    new Promise(resolve =>
        knex('categories')
            .returning(['id'])
            .where({ id })
            .delete()
            .then(data => resolve(data[0])),
        ); // eslint-disable-line

module.exports = {
    listCategories,
    getCategory,
    addCategory,
    modifyCategory,
    deleteCategory,
};
