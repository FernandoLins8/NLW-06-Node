import { getCustomRepository } from "typeorm"
import UsersRepository from "../repositories/UserRepository"

interface IUserRequest {
  name: string
  email: string
  admin?: boolean
}

class UserService {
  async createUser({ name, email, admin }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository)
    const userAlreadyExists = await usersRepository.findOne({ email })

    if(userAlreadyExists) {
      throw new Error('User already exists')
    }

    const user = usersRepository.create({
      name, email, admin
    })

    usersRepository.save(user)
    
    return user
  }

  async indexUsers() {
    const userRepository = getCustomRepository(UsersRepository) 
    const users = await userRepository.find()

    return users
  }
}

export default UserService
