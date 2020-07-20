module.exports = {
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    },
    mysql: {
        connection: {
            host: process.env.DATABASE_HOST ,
            port: process.env.DATABASE_PORT || 3306,
            database: process.env.DATABASE_NAME ,
            user: process.env.DATABASE_USERNAME || 'ppuser',
            password: process.env.DATABASE_PASSWORD || 'pppass',
            debug: process.env.DATABASE_DEBUG ? ['ComQueryPacket'] : false
        },
        pool: {
            min: (process.env.DATABASE_POOL_MIN) ? parseInt(process.env.DATABASE_POOL_MIN) : 2,
            max: (process.env.DATABASE_POOL_MAX) ? parseInt(process.env.DATABASE_POOL_MAX) : 2
        }
    },
    auth_key: process.env.AUTH_KEY || 'secretKeyRef',
    port: process.env.PORT || 9100,
    apiPort: 9101,
}