import User from '../entity/User';
export default class JSON {
  public static user = (user: User) => {
    return {
      email: user.email.string(),
      name: user.name.full()
    };
  }
}