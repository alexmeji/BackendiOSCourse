'use strict'

const Foods = require('../controllers/foods')
const Joi = require('joi')

exports.register = (server, options, next) => {

    server.route({
        path: '/foods',
        method: 'GET',
        handler: Foods.all
    })

    server.route({
        path: '/foods/{id}',
        method: 'GET',
        handler: Foods.one,
        config: {
            validate: {
                params: {
                    id: Joi.string().min(12).required()
                }
            }
        }
    })

    server.route({
        path: '/foods',
        method: 'POST',
        handler: Foods.create,
        config: {
            validate: {
                payload: {
                    name: Joi.string().min(5).required(),
                    description: Joi.string().min(5).required(),
                    price: Joi.number().required(),
                    image: Joi.string().min(15).required(),
                    restaurant: Joi.object({
                        _id: Joi.string().min(12).required(),
                        name: Joi.string().min(5).required()
                    }).required()
                }
            }
        }
    })

    server.route({
        path: '/foods/{id}',
        method: 'DELETE',
        handler: Foods.delete,
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
    name: 'foods'
}