import express from 'express'

import UserController from './controllers/UserController'
import TagController from './controllers/TagController'
import ComplimentsController from './controllers/ComplimentsController'

import ensureAdmin from './middlewares/ensureAdmin'
import ensureAuthenticated from './middlewares/ensureAuthenticated'

const routes = express.Router()

const userController = new UserController()
const tagController = new TagController()
const complimentsController = new ComplimentsController()

routes.get('/users', userController.index)
routes.get('/tags', tagController.index)
routes.get('/compliments/received', ensureAuthenticated, complimentsController.listReceivedByUser)
routes.get('/compliments/sent', ensureAuthenticated, complimentsController.listSentByUser)

routes.post('/users', userController.create)
routes.post('/tags', ensureAuthenticated, ensureAdmin, tagController.create)
routes.post('/compliments', ensureAuthenticated, complimentsController.create)

routes.post('/login', userController.authenticate)


export default routes
