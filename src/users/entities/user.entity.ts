import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./role.entity"
import { Post } from "src/post/entities/post.entity"
import { Comment } from "src/comment/entities/comment.entity"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  user: string
  
  @Column()
  password: string
  
  @Column({
    type:'enum',
    enum:Role,
    default:Role.USER
  })
  role: Role

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[]
  
  @OneToMany(() => Post, post => post.user)
  posts: Post[]
  
}
