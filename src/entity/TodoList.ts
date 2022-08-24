import Connection from "../config/Connection"
import User from "../entity/User"
import Email from "../valueobject/Email"
import Todo from "../valueobject/Todo"

export default class UserRepository {
  private db
  private todo: Todo

  constructor(connection: Connection, todo: Todo) {
    this.db = connection.connect?.db(String(process.env.DB_NAME))
    this.todo = todo
  }

  async get(mail: string) {
    return 
  }

  async create(user: User) {
    return 
  }
}