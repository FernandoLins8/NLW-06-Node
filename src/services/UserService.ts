import { getCustomRepository } from "typeorm"
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import UsersRepository from "../repositories/UserRepository"

interface IUserRequest {
  name: string
  email: string
  password: string
  admin?: boolean
}

interface IUserAuthenticateReq {
  email: string
  password: string
}

class UserService {
  async createUser({ name, email, admin, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository)
    const userAlreadyExists = await usersRepository.findOne({ email })

    if(userAlreadyExists) {
      throw new Error('User already exists')
    }

    const passwordHash = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin
    })

    usersRepository.save(user)
    
    return user
  }

  async indexUsers() {
    const userRepository = getCustomRepository(UsersRepository) 
    const users = await userRepository.find()

    return users
  }

  async authenticateUser({ email, password } : IUserAuthenticateReq) {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne({ email })
    
    if(!user) {
      throw new Error('Incorrect credentials')
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      throw new Error('Incorrect credentials')
    }

    // Generate Token
    const token = sign({
      email: user.email
    }, '310a5d89ef8e1b5ca020633e27ff8cb6', {
      subject: user.id,
      expiresIn: '1d'
    })

    return token;
  }
}

export default UserService
