import { Request, Response } from 'express'
import TagService from '../service/TagService'

class TagController {  
  async create(req: Request, res: Response) {
    const { name } = req.body

    if(!name) {
      return res.json({ 'message': 'A tag must have a name' })
    }
    
    const tagService = new TagService()
    const tag = await tagService.createTag(name)

    return res.json(tag)
  }

  async index(req: Request, res: Response) {
    const tagService = new TagService()
    const tags = await tagService.indexTags()

    return res.json(tags)
  }
}

export default TagController
