import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  findAll() {
    return this.taskModel.find();
  }

  async create(createTaskDto: CreateTaskDto) {
    const newTask = new this.taskModel(createTaskDto);
    return newTask.save();
  }

  async findOne(id: string) {
    return this.taskModel.findById(id);
  }

  async delete(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
  }
}
