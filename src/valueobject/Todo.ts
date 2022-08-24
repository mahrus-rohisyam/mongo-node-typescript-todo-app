export default class Todo {
  private _title: string
  private _id: string | number
  private _createdAt: Date

  constructor(title: string, id: string | number, createdAt: Date) {
    this._createdAt = createdAt
    this._id = id
    this._title = title
  }

  public get title(): string {
    return this._title
  }

  public get id(): string | number {
    return this._id
  }

  public get createdAt(): Date {
    return this._createdAt
  }

  public get fullTodo():object {
    const {createdAt, id, title} = this
    return {
      id,
      title,
      createdAt
    }
  }
}