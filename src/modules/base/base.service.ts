import { Model, Document } from 'mongoose';
import { NotFoundError } from '../../../common/errors/AppError';

class BaseService<T extends Document> {
  constructor(protected model: Model<T>) {}

  // Create
  async create(data: Partial<T>): Promise<T> {
    const createdItem = new this.model(data);
    return createdItem.save();
  }

  // Get one by ID
  async get(id?: string): Promise<T | T[] | null> {
    if (id) {
      return this.model.findById(id).exec();
    }
      return this.model.find().exec();
  }
  // Update
  async update(id: string, data: Partial<T>): Promise<T | null> {
    const document = await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!document)
      throw new NotFoundError('no document found with provided id')
    return document
  }

  // Delete
  async delete(id: string): Promise<T | null> {
    const document = await this.model.findByIdAndDelete(id).exec();
    if (!document)
      throw new NotFoundError('document not found with that id')
    return document
  }
}

export default BaseService;


