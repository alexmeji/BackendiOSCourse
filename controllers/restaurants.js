'use strict'

const Boom = require('boom')
const Moment = require('moment')

module.exports = {
    all: (request, reply) => {
        const db = request.server.app.db

        db.restaurants.find({}, (err, records) => {
            if(err){
                reply(err)
            } else {
                reply(records)
            }
        })
    },
    one: (request, reply) => {
        const db = request.server.app.db

        db.churchs.findOne({_id: db.ObjectId(request.params.id)}, (err, record) => {
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

        db.restaurants.save({
            name: request.payload.name,
            slug: request.payload.slug,
            image: request.payload.image,
            price: request.payload.price,
            stars: request.payload.stars,
            latitude: request.payload.latitude,
            longitude: request.payload.longitude,
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

        db.restaurants.remove({
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