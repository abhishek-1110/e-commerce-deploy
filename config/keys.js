import MONGO_URI from './prod'
if (process.env.NODE_ENV === 'production') {
    module.exports = MONGO_URI
} else {
    module.exports = MONGO_URI
}