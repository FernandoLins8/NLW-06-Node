import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UserRepository'

export default async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const { user_id } = req

  const usersRepository = getCustomRepository(UsersRepository)
  
  const user = await usersRepository.findOne(user_id)
  
  const { admin } = user

  if(admin) {
    return next()
  }

  return res.status(401).json({
    error: 'Unauthorized',
  })
}