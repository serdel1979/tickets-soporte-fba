export const EnvConfiguration = () =>({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.URI_MONGODB,
    port: process.env.PORT || 3001
})