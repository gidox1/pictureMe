var config = require('./src/config');
var dbConfig = {
    client: 'mysql',
    connection: config.mysql.connection,
    pool: config.mysql.pool,
    migrations: {
        tableName: 'migrations'
    },
    seeds: {
        directory: './seeds'
    },
    debug: true
};

/**
 * Database settings.
 *
 * Setting the db settings in knexfile allows us to make use of the migrations.
 *
 * @type {Object} Database settings
 */
module.exports = dbConfig;
