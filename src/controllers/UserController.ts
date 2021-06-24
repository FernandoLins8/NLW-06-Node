import { Request, Response } from 'express'

import UserService from '../services/UserService'

class UserController {
  async create(req: Request, res: Response) {
    const { name, email, admin } = req.body
    const userService = new UserService()

    if(!email) {
      return res.send({ 'message': 'Email is required' })
    }
    
    const user = await userService.createUser({
      name,
      email,
      admin
    })

    return res.json(user)
  }

  async index(req: Request, res: Response) {
    const userService = new UserService()
    const users = await userService.indexUsers()
    
    return res.json(users)
  }
}

export default UserController
