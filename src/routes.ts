import express from 'express'

import UserController from './controllers/UserController'
import TagController from './controllers/TagController'
import ComplimentsController from './controllers/ComplimentsController'

const routes = express.Router()

const userController = new UserController()
const tagController = new TagController()
const complimentsController = new ComplimentsController()

routes.get('/user', userController.index)
routes.get('/tag', tagController.index)

routes.post('/user', userController.create)
routes.post('/tag', tagController.create)
routes.post('/compliments', complimentsController.create)


export default routes
