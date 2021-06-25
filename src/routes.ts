import express from 'express'

import UserController from './controllers/UserController'
import TagController from './controllers/TagController'
import ComplimentsController from './controllers/ComplimentsController'

import ensureAdmin from '../middlewares/ensureAdmin'

const routes = express.Router()

const userController = new UserController()
const tagController = new TagController()
const complimentsController = new ComplimentsController()

routes.get('/users', userController.index)
routes.get('/tags', tagController.index)

routes.post('/users', userController.create)
routes.post('/tags', ensureAdmin, tagController.create)
routes.post('/compliments', complimentsController.create)

routes.post('/login', userController.authenticate)


export default routes
