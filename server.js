'use strict'

const Hapi = require('hapi');
const Mongojs = require('mongojs')

//Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    host: '0.0.0.0',
    port: '9000'
})

server.app.db = Mongojs('tecios', ['restaurants', 'foods'])

server.register([
    //Add the routes
    require('./routes/status'),
    require('./routes/restaurants'),
    require('./routes/foods')
], (err) => {
    if(err) {
        throw err;
    }
})

//Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at ' + server.info.uri);
})