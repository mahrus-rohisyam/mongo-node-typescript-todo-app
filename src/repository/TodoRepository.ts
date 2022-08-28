/* eslint-disable */
// Not implemented yet

import { MongoClient, ObjectId, Db } from 'mongodb';
import Todo from '../valueobject/Todo';

export default class TodoRepository {
  private db: Db;

  constructor(connection: MongoClient) {
    this.db = connection.db(String(process.env.DB_NAME));
  }

  async get(_id: ObjectId): Promise<Todo[]> {
    return new Promise<Todo[]>((resolve, reject) => {
      try {
      } catch (error) {
        reject(error);
      }
    });
  }

  async create(_id: ObjectId): Promise<Todo> {
    return new Promise<Todo>(async (resolve, reject) => {
      try {
        const user = await this.db.collection('users').findOne({ _id });
        if (user) {
          console.log(user);

          // resolve()
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
