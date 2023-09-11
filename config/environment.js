// config for dev mode
const development = {
    name: 'development',
    mongo_CONNECT_URL: 'mongodb://127.0.0.1/placement_cell',
    session_cookie_key: 'somesecretcode'
}

// config for prod mode
const production = {
    name: 'production',
    mongo_CONNECT_URL: process.env.MONGODB_ATLAS_URL,
    session_cookie_key: 'somesecretcode'
}

// module.exports = production;
module.exports = eval(process.env.PLACEMENT_CELL_ENV) == undefined ? development : eval(process.env.PLACEMENT_CELL_ENV);