// comment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../comment/entities/comment.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async findOne(id: number): Promise<Comment> {
    const post = await this.commentRepository.findOneBy({id}) 

    if (!post) {
      throw new NotFoundException("No se encontró este comentario")
    }

    return post;
  }

  async create(post: CommentDto): Promise<Comment> {
    return await this.commentRepository.save(post);
  }

  async update(id: number, comment: CommentDto): Promise<Comment> {
    const commentToUpdate = await this.findOne(id);
    commentToUpdate.body = comment.body;
    return await this.commentRepository.save(commentToUpdate);
  }

  async delete(id: number): Promise<void> {
    const comment = await this.findOne(id)

    await this.commentRepository.delete(comment)
  }
}
