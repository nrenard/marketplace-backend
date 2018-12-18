const express = require('express')

const routes = express.Router()

const { UserController, SessionController } = require('./app/controllers')

const { authMiddleware } = require('./app/middlewares')

routes.get('/', (req, res) => res.send('bsssir'))

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.get('/private', (req, res) => res.json({ success: true }))

module.exports = routes
