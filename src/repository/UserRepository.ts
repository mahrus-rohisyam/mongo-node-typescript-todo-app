import { MongoClient } from 'mongodb';
import User from '../entity/User';
import Email from '../valueobject/Email';
import Name from '../valueobject/Name';
import Password from '../valueobject/Password';

export default class UserRepository {
  private _connection: MongoClient | undefined;
  private _db;

  constructor(connection: MongoClient | undefined) {
    this._connection = connection;
    this._db = this._connection?.db(String(process.env.DB_NAME));
  }

  async get(email: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this._db?.collection('users').findOne({ email }, function (err, result) {
        if (err) {
          reject(err);
        } else {
          if (result !== undefined && result !== null) {
            const mail: Email = new Email(email);
            const name: Name = new Name(result.name);
            const password: Password = new Password(result.password._salt, result.password._hash);
            const user: User = new User(mail, name, password);

            resolve(user);
          }
        }
      });
    });
  }

  async create(user: User) {
    return new Promise((resolve, reject) => {
      const { email, password, name } = user;

      this._db?.collection('users').insertOne({ email: email.string(), password, name }, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result?.insertedId);
        }
      });
    });
  }
}
