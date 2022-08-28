import * as mongodb from 'mongodb';

export default class Mongodb {
  client: mongodb.MongoClient;
  private uri: string;

  constructor(uri: string) {
    this.uri = uri;
    this.client = new mongodb.MongoClient(this.uri);
  }
}
