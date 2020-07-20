const routes = module.exports = require('next-routes')();

routes
    .add({
        name: 'home',
        pattern: '/',
        page: '/index',
    })

    .add({
        name: 'gallery',
        pattern: '/gallery',
        page: '/gallery',
    })

    // Catch every other route and render it as a 404 page
    .add({
        name: 'error404',
        pattern: '/:unamedPage*',
        page: 'notFound',
    });