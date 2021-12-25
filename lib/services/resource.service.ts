import { AuditModel } from 'tools/models/audit.model';
import { Model } from 'mongoose';

export class ResourceService<
  T extends any,
  C extends object,
  U extends object,
> {
  constructor(protected readonly mongoModel: Model<T>) {}

  generalSearchQuery = {
    page: 1,
    size: 10,
    sort: 'ASC',
    sortBy: '_id',
    queryText: '',
    searchBy: 'name',
  };

  async create(model: C): Promise<T> {
    const audit = new AuditModel();
    audit.active = true;
    audit.createdBy = 'Admin';
    audit.createdDate = new Date();

    const createdModel = new this.mongoModel({ ...model, ...audit });

    return await createdModel.save();
  }

  async findAll(): Promise<any[]> {
    return await this.mongoModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return await this.mongoModel.find({ _id: id }).exec();
  }

  async delete(id: string): Promise<T> {
    return await this.mongoModel.findByIdAndRemove({ _id: id }).exec();
  }

  async update(id: string, dto: U): Promise<T> {
    let newModel = this.mongoModel.findOne({ _id: id }).exec();
    newModel = { ...newModel, ...dto };

    return await this.mongoModel
      .findByIdAndUpdate(id, newModel, { new: true })
      .exec();
  }
}
