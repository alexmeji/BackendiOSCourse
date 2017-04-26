'use strict'

const Boom = require('boom')
const Moment = require('moment')

module.exports = {
    all: (request, reply) => {
        const db = request.server.app.db

        db.foods.find({}, (err, records) => {
            if(err){
                reply(err)
            } else {
                reply(records)
            }
        })
    },
    one: (request, reply) => {
        const db = request.server.app.db

        db.foods.findOne({_id: db.ObjectId(request.params.id)}, (err, record) => {
            if(err){
                reply(err)
            } else {
                if(!record){
                    reply(Boom.notFound())
                } else{
                    reply(record)
                }
            }
        })
    },
    create: (request, reply) => {
        const db = request.server.app.db

        db.foods.save({
            name: request.payload.name,
            description: request.payload.description,
            price: request.payload.slug,
            image: request.payload.image,
            restaurant: {
                _id: request.payload.restaurant._id,
                name: request.payload.restaurant.name
            },
            created_at: Moment().format('MM-DD-YYYY HH:mm:ss'),
            updated_at: Moment().format('MM-DD-YYYY HH:mm:ss')
        }, (err, record) => {
            if(err) {
                reply(err)
            } else {
                reply(record)
            }
        })
    },
    delete: (request, reply) => {
        const db = request.server.app.db

        db.foods.remove({
            _id: db.ObjectId(request.params.id)
        }, (err, obj) => {
            if (err) {
                reply(err)
            } else {
                if ( obj.n === 0) {
                    reply(Boom.notFound())
                } else {
                    reply({
                        message: "Record Deleted"
                    })
                }
            }
        })
    },
}