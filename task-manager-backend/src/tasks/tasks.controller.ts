import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks() {
    return this.tasksService.findAll();
  }

  @Post()
  async createTask(@Body() body: { title: string; description?: string }) {
    return this.tasksService.create(body.title, body.description);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() body: Partial<{ title: string; description: string; isComplete: boolean }>
  ) {
    return this.tasksService.update(parseInt(id, 10), body);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    await this.tasksService.delete(parseInt(id, 10));
    return { message: 'Task deleted successfully' };
  }
}
