import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

import Tag from './Tag'
import User from './User'

@Entity('compliments')
class Compliments {
  @PrimaryColumn()
  id: string

  @Column()
  user_sender: string
  
  @Column()
  user_receiver: string

  @Column()
  tag_id: string

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_sender' })

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_receiver' })

  @ManyToOne(type => Tag)
  @JoinColumn({ name: 'tag_id' })

  @Column()
  message: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if(!this.id) {
      this.id = uuid()
    }
  }
}

export default Compliments
