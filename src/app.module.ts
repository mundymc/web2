import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersModule } from "./users/users.module"
import { PostModule } from './post/post.module'
import { Post } from './post/entities/post.entity';
import { Comment } from './comment/entities/comment.entity';

import { User } from "./users/entities/user.entity";
import { CommentModule } from "./comment/comment.module";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      username:"postgres",
      password: "123",
      port: 5432,
      database: "bdprueba",
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Post, Comment]),
    UsersModule,
    PostModule,
    CommentModule,
  ]
})
export class AppModule { }