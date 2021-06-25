import { getCustomRepository } from 'typeorm'
import ComplimentsRepository from '../repositories/ComplimentsRepository'
import TagsRepository from '../repositories/TagRepository'
import UsersRepository from '../repositories/UserRepository'

interface IComplimentsReq {
  user_sender: string
  user_receiver: string
  tag_id: string
  message?: string
}

class ComplimentsService {
  async createCompliments({ user_sender, user_receiver, tag_id, message }: IComplimentsReq) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository)
    const userRepository = getCustomRepository(UsersRepository)
    const tagsRepository = getCustomRepository(TagsRepository)

    if(user_sender === user_receiver) {
      throw new Error('User cannot send compliment to himself')
    }
    
    const userSender = await userRepository.findOne(user_sender)
    if(!userSender) {
      throw new Error('Sender not found')
    }

    const userReceiver = await userRepository.findOne(user_receiver)
    if(!userReceiver) {
      throw new Error('Receiver not found')
    }
    
    const tag = await tagsRepository.findOne(tag_id)
    if(!tag) {
      throw new Error('Tag not found')
    }

    const compliment = complimentsRepository.create({
      user_sender,
      user_receiver,
      tag_id,
      message
    })

    complimentsRepository.save(compliment)

    return compliment
  }

  async listComplimentsReceivedByUser(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository)

    const compliments = await complimentsRepository.find({
      where: {
        user_receiver: user_id
      }
    })

    return compliments
  }

  async listComplimentsSentByUser(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository)

    const compliments = await complimentsRepository.find({
      where: {
        user_sender: user_id
      }
    })

    return compliments
  }
}

export default ComplimentsService
