import { Request, Response } from 'express'
import ComplimentsService from '../services/ComplimentsService'

class ComplimentsController {
  async create(req: Request, res: Response) {
    const { user_sender, user_receiver, tag_id, message } = req.body
    
    if(!user_sender || !user_receiver || !tag_id) {
      res.json({ 'message': 'A compliment must have a sender, receiver and tag' })
    }
    
    const complimentsService = new ComplimentsService()
    const compliment = await complimentsService.createCompliments({
      user_sender,
      user_receiver,
      tag_id,
      message
    })

    return res.json(compliment)
  }
}

export default ComplimentsController
