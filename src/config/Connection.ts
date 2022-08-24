import { MongoClient } from 'mongodb'
export default class Connection {
  private uri: string
  private connection: MongoClient

  constructor(uri: string) {
    this.uri = uri
    this.connection = new MongoClient(this.uri, { connectTimeoutMS: 7000 })
  }

  get connect() {
    try {
      console.log('Mongo DB is online');
      return this.connection
    } catch (error) {
      console.log(error)
    }
  }

  close() {
    this.connection.close((error) => {
      if (error) {
        console.log('error', error)
      }
      console.log('connection closed successfully')
    })
  }
}