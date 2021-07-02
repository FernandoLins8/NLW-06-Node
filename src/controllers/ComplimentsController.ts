import { Request, Response } from 'express'
import ComplimentsService from '../services/ComplimentsService'

class ComplimentsController {
  async create(req: Request, res: Response) {
    const { user_receiver, tag_id, message } = req.body
    const { user_id } = req
    
    if(!user_id || !user_receiver || !tag_id) {
      throw new Error('A compliment must have a receiver and a tag')
    }
    
    const complimentsService = new ComplimentsService()
    const compliment = await complimentsService.createCompliments({
      user_sender: user_id,
      user_receiver,
      tag_id,
      message
    })

    return res.json(compliment)
  }

  async listReceivedByUser(req: Request, res: Response) {
    const { user_id } = req
    
    const complimentsService = new ComplimentsService()

    const compliments = await complimentsService.listComplimentsReceivedByUser(user_id)

    return res.json(compliments)
  }

  async listSentByUser(req: Request, res: Response) {
    const { user_id } = req
    
    const complimentsService = new ComplimentsService()

    const compliments = await complimentsService.listComplimentsSentByUser(user_id)

    return res.json(compliments)
  }
}

export default ComplimentsController
