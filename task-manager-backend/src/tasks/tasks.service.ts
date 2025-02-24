import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async create(title: string, description?: string): Promise<Task> {
    const task = this.tasksRepository.create({ title, description, isComplete: false });
    return this.tasksRepository.save(task);
  }

  async update(id: number, updateData: Partial<Task>): Promise<Task | null> {
    await this.tasksRepository.update(id, updateData);
    return this.tasksRepository.findOneBy({ id });
  }  

  async delete(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
