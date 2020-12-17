exports.seed = function(knex) {
    return knex('fruits')
        .truncate()
        .then(function() {
            return knex('fruits').insert([
                { id: 1, name: "apple" },
                { id: 2, name: "orange" },
                { id: 3, name: "pear" },
                { id: 4, name: "banana" },
                { id: 5, name: "watermelon" },
            ]);
        });
};