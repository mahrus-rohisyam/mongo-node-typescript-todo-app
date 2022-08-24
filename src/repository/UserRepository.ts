import { MongoClient } from "mongodb"
import User from "../entity/User"
import Email from "../valueobject/Email"
import Name from "../valueobject/Name"
import Password from "../valueobject/Password"

export default class UserRepository {
  private _connection: MongoClient | undefined
  private _db

  constructor(connection: MongoClient | undefined) {
    this._connection = connection
    this._db = this._connection?.db(String(process.env.DB_NAME))
  }

  async get(email: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this._db?.collection('users').findOne({ email: email })

        if (result !== undefined && result !== null) {
          let mail: Email = new Email(email)
          let name: Name =  new Name(result.name)
          let password: Password = new Password(result.password._salt, result.password._hash)
          let user: User = new User(mail, name, password)
          
          resolve(user)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  async create(user: User) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, password, name } = user

        let action = await this._db?.collection('users').insertOne({ email: email.string(), password, name })
        resolve(action?.insertedId)
      } catch (error) {
        reject(error)
      }
    })
  }
}