import { Model, Document } from 'mongoose';

class BaseService<T extends Document> {
  constructor(protected model: Model<T>) {}

  // Create
  async create(data: Partial<T>): Promise<T> {
    console.log("here");
    
    const createdItem = new this.model(data);
    return createdItem.save();
  }

  // Get one by ID
  async getOne(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  // Get all
  async getAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  // Update
  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Delete
  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}

export default BaseService;