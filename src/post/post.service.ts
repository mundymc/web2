// post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({id}) 

    if (!post) {
      throw new NotFoundException("No se encontró este post")
    }

    return post;
  }

  async create(post: PostDto): Promise<Post> {
    return await this.postRepository.save(post);
  }

  async update(id: number, post: PostDto): Promise<Post> {
    const postToUpdate = await this.findOne(id);
    postToUpdate.title = post.title;
    postToUpdate.body = post.body;
    return await this.postRepository.save(postToUpdate);
  }

  async delete(id: number): Promise<void> {
    const post = await this.findOne(id)

    await this.postRepository.delete(post)
  }
}