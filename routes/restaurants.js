'use strict'

const Restaurants = require('../controllers/restaurants')
const Joi = require('joi')

exports.register = (server, options, next) => {
    server.route({
        path: '/restaurants',
        method: 'GET',
        handler: Restaurants.all
    })

    server.route({
        path: '/restaurants/{id}',
        method: 'GET',
        handler: Restaurants.one,
        config: {
            validate: {
                params: {
                    id: Joi.string().min(12).required()
                }
            }
        }
    })

    server.route({
        path: '/restaurants',
        method: 'POST',
        handler: Restaurants.create,
        config: {
            validate: {
                payload: {
                    name: Joi.string().min(5).required(),
                    slug: Joi.string().min(5).required(),
                    image: Joi.string().min(8).required(),
                    price: Joi.number().required(),
                    stars: Joi.number().required(),
                    latitude: Joi.number().required(),
                    longitude: Joi.number().required()
                }
            }
        }
    })

    server.route({
        path: '/churchs/{id}',
        method: 'DELETE',
        handler: Restaurants.delete,
        config: {
            validate: {
                params: {
                    id: Joi.string().min(12).required()
                }
            }
        }
    })

    next()
}

exports.register.attributes = {
    name: 'restaurants'
}