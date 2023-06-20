// post.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PostService } from './post.service';
import {Private, Public} from '../users/current.meta'
import { Post as PostEntity} from './entities/post.entity';
import { Role } from 'src/users/entities/role.entity';
import { PostDto } from './dto/post.dto';



@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  
  @Get()
  @Public()
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne(+id);
  }

  @Post()
  @Private(Role.ADMIN)
  create(@Body() post: PostDto): Promise<PostEntity> {
    return this.postService.create(post);
  }

  @Put(':id')
  @Private(Role.ADMIN)
  update(@Param('id') id: string, @Body() post: PostDto): Promise<PostEntity> {
    return this.postService.update(+id, post);
  }

  @Delete(':id')
  @Private(Role.ADMIN)
  delete(@Param('id') id: string): Promise<void> {
    return this.postService.delete(+id);
  }
}
