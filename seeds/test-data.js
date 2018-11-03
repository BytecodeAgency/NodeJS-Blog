exports.seed = (knex, Promise) => // eslint-disable-line
    knex('authors')
        .del()

        .then(() =>
            knex('authors').insert([
                {
                    name: 'John Doe',
                    image_url: 'http://placekitten.com/200/200',
                    role: 'Dummy',
                },
                {
                    name: 'John Doe',
                    image_url: 'http://placekitten.com/200/200',
                    role: 'Dummy',
                },
            ]),
        ); // eslint-disable-line
