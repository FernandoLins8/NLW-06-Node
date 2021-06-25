import { Request, Response } from 'express'
import ComplimentsService from '../services/ComplimentsService'

class ComplimentsController {
  async create(req: Request, res: Response) {
    const { user_receiver, tag_id, message } = req.body
    const { user_id } = req
    
    if(!user_id || !user_receiver || !tag_id) {
      return res.json({ 'message': 'A compliment must have a sender, receiver and tag' })
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
}

export default ComplimentsController
