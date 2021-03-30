'use strict'
const fp = require('fastify-plugin')

async function authRoutes(server, options) {
  server
    .route({
      method: 'GET',
      url: '/auth',
      schema: {
        tags: ['auth0'],
        security: [
          {
            apiKey: []
          }
        ]
      },
      onRequest: [
        server.authenticate,
        function (request, reply, done) {
          request.jwtAuthz(['user.read'], done)
        }
      ],
      handler: async ({ log, user }) => {
        return user
      }
    })
    .route({
      method: 'POST',
      url: '/coffees',
      schema: {
        tags: ['coffees'],
        security: [
          {
            apiKey: []
          }
        ]
      },
      onRequest: [
        server.authenticate,
        function (request, reply, done) {
          request.jwtAuthz(['coffees.create'], done)
        }
      ],
      handler: async (request, reply) => {
        const { name, description } = request.body
        let dbResponse
        try {
          dbResponse = await server.pg.query(
            'INSERT INTO coffees(name, description) VALUES ($1, $2);',
            [name, description]
          )
        } catch (err) {
          // swallow error
          request.log.debug({ err }, `failed to read DB during health check`)
        }

        if (dbResponse.rows) {
          reply.send(dbResponse.rows)
        } else {
          request.log.debug('No rows returned')
          reply.send([
            {
              name,
              description
            }
          ])
        }
      }
    })
    .route({
      method: 'GET',
      url: '/coffees',
      schema: {
        tags: ['coffees'],
        security: [
          {
            apiKey: []
          }
        ]
      },
      onRequest: [
        server.authenticate,
        function (request, reply, done) {
          request.jwtAuthz(['coffees.read'], done)
        }
      ],
      handler: async (request, reply) => {
        let dbResponse
        try {
          dbResponse = await server.pg.query(
            'SELECT name,description FROM coffees;'
          )
        } catch (err) {
          // swallow error
          request.log.debug({ err }, `failed to read DB during health check`)
        }

        if (dbResponse.rows) {
          reply.send(dbResponse.rows)
        } else {
          request.log.debug('No rows returned')
          reply.send([])
        }
      }
    })
    .route({
      method: 'GET',
      url: '/coffees/:coffeeId',
      schema: {
        tags: ['coffees'],
        security: [
          {
            apiKey: []
          }
        ],
        params: {
          coffeeId: {
            type: 'number'
          }
        }
      },
      onRequest: [
        server.authenticate,
        function (request, reply, done) {
          request.jwtAuthz(['coffees.read'], done)
        }
      ],
      handler: async (request, reply) => {
        const { coffeeId } = request.params
        let dbResponse
        try {
          dbResponse = await server.pg.query(
            'SELECT name,description FROM coffees WHERE coffee_id = $1;',
            [coffeeId]
          )
        } catch (err) {
          // swallow error
          request.log.debug({ err }, `failed to read DB during health check`)
        }

        if (dbResponse.rows) {
          reply.send(dbResponse.rows)
        } else {
          request.log.debug('No rows returned')
          reply.send([])
        }
      }
    })
    .route({
      method: 'PUT',
      url: '/coffees/:coffeeId',
      schema: {
        tags: ['coffees'],
        security: [
          {
            apiKey: []
          }
        ],
        params: {
          coffeeId: {
            type: 'number'
          }
        }
      },
      onRequest: [
        server.authenticate,
        function (request, reply, done) {
          request.jwtAuthz(['coffees.update'], done)
        }
      ],
      handler: async (request, reply) => {
        const { coffeeId } = request.params
        const { name, description } = request.body
        let dbResponse
        try {
          dbResponse = await server.pg.query(
            'UPDATE coffees SET name = $2, description = $3 WHERE coffee_id = $1;',
            [coffeeId, name, description]
          )
        } catch (err) {
          // swallow error
          request.log.debug({ err }, `failed to read DB during health check`)
        }

        if (dbResponse.rows) {
          reply.send({
            name,
            description
          })
        } else {
          request.log.debug('No rows returned')
          reply.send([])
        }
      }
    })
    .route({
      method: 'DELETE',
      url: '/coffees/:coffeeId',
      schema: {
        tags: ['coffees'],
        security: [
          {
            apiKey: []
          }
        ],
        params: {
          coffeeId: {
            type: 'number'
          }
        }
      },
      onRequest: [
        server.authenticate,
        function (request, reply, done) {
          request.jwtAuthz(['coffees.delete'], done)
        }
      ],
      handler: async (request, reply) => {
        const { coffeeId } = request.params
        let dbResponse
        try {
          dbResponse = await server.pg.query(
            'DELETE FROM coffees WHERE coffee_id = $1;',
            [coffeeId]
          )
        } catch (err) {
          // swallow error
          request.log.debug({ err }, `failed to read DB during health check`)
        }

        if (dbResponse.rows) {
          reply.send({ deletedCount: 1, coffeeIdDeleted: coffeeId })
        } else {
          request.log.debug('No rows returned')
          reply.send([])
        }
      }
    })
}

module.exports = fp(authRoutes)
