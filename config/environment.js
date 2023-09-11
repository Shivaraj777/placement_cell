
const development = {
    name: 'development',
    mongo_CONNECT_URL: 'mongodb://127.0.0.1/placement_cell'
}

const production = {
    name: 'production',
    mongo_CONNECT_URL: 'mongodb+srv://codeslayer09876:XoSzERBq8JPOWnf8@placementcell.3ydcrhc.mongodb.net/?retryWrites=true&w=majority'
}

module.exports = production;
// module.exports = eval(process.env.PLACEMENT_CELL_ENV) == undefined ? development : eval(process.env.PLACEMENT_CELL_ENV);