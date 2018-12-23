const express = require('express')

const routes = express.Router()

const {
  UserController,
  SessionController,
  AdController,
  PurchaseController
} = require('./app/controllers')

const { authMiddleware } = require('./app/middlewares')

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

// Ads Public
routes.get('/ads/', AdController.index)
routes.get('/ads/:id', AdController.show)

routes.use(authMiddleware)

// Ads Private
routes.post('/ads', AdController.store)
routes.put('/ads/:id', AdController.update)
routes.delete('/ads/:id', AdController.destroy)

// Purchase
routes.post('/purchase', PurchaseController.store)

module.exports = routes
