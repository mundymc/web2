import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Post } from "./entities/post.entity"
import { PostController } from "./post.controller"
import { PostService } from "./post.service"


@Module({
  controllers: [PostController],
  providers:[PostService],
  imports:[ TypeOrmModule.forFeature([Post])]
})
export class PostModule {
  /*...*/ 
}