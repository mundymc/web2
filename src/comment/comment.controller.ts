// post.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Private, Public } from 'src/users/current.meta';
import { Role } from 'src/users/entities/role.entity';
import {Comment} from './entities/comment.entity'
import { CommentDto } from './dto/comment.dto';
 
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @Private(Role.ADMIN)
  async findAll(): Promise<Comment[]> {
    return await this.commentService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(+id);
  }

  @Post()
  @Private(Role.ADMIN)
  create(@Body() post: CommentDto): Promise<Comment> {
    return this.commentService.create(post);
  }

  @Put(':id')
  @Private(Role.ADMIN)
  update(@Param('id') id: string, @Body() post: CommentDto): Promise<Comment> {
    return this.commentService.update(+id, post);
  }

  @Delete(':id')
  @Private(Role.ADMIN)
  delete(@Param('id') id: string): Promise<void> {
    return this.commentService.delete(+id);
  }
}
