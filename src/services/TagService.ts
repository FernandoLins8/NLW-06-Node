import { getCustomRepository } from "typeorm";
import TagsRepository from "../repositories/TagRepository";

class TagService {
  async createTag(name: string) {
    const tagsRepository = getCustomRepository(TagsRepository)
    const tagAlreadyExists = await tagsRepository.findOne({ name })

    if(tagAlreadyExists) {
      throw new Error('This tag already exists')
    }

    const tag = tagsRepository.create({ name })

    tagsRepository.save(tag)

    return tag
  }

  async indexTags() {
    const tagsRepository = getCustomRepository(TagsRepository)
    const tags = await tagsRepository.find()

    return tags
  }
}

export default TagService
