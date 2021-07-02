import { Request, Response } from 'express'

import UserService from '../services/UserService'

class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password, admin } = req.body
    const userService = new UserService()

    if(!name || !email || !password) {
      throw Error('Name, password and email are required')
    }
    
    const user = await userService.createUser({
      name,
      email,
      password,
      admin
    })

    return res.json(user)
  }

  async index(req: Request, res: Response) {
    const userService = new UserService()
    const users = await userService.indexUsers()
    
    return res.json(users)
  }

  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body
    const userService = new UserService()

    const token = await userService.authenticateUser({
      email,
      password
    })

    return res.json(token)
  }
}

export default UserController
