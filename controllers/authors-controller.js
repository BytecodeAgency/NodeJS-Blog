const { listAuthors } = require('./authors');

const list = async (req, res) => {
    const authors = await listAuthors();
    res.json(authors);
};

const show = (req, res) => {
    res.sendStatus(200);
};

const create = (req, res) => {
    res.sendStatus(200);
};

const update = (req, res) => {
    res.sendStatus(200);
};

const remove = (req, res) => {
    res.sendStatus(200);
};

module.exports = {
    list,
    show,
    create,
    update,
    remove,
};
