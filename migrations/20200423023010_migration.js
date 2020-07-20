
exports.up = function(knex) {
    return knex.schema
        .createTableIfNotExists('users', function(table) {
            table.increments('id').primary();
            table.string('username').nullable();
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.string('preference').notNullable();
            table.string('sex').notNullable();
            table.json('blocked').nullable();
            table.string('image_url').nullable();
            table.timestamps();
        })
        .createTableIfNotExists('images', function(table) {
            table.increments('id').primary();
            table.string('public_id').notNullable();
            table.string('image_url').notNullable();
            table.integer('uploaded_by').unsigned().notNullable().references('id').inTable('users');
            table.timestamps();
        })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('images')
};
