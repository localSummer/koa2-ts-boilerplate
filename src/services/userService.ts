import Models from '../models';

class UserService {
  static async findUserById(id: number) {
    return await Models.User.findOne({
      where: {
        id
      },
      attributes: ['id', 'name']
    });
  }

  static async createUser() {
    const date = new Date();
    return await Models.User.create({
      name: '口岸',
      preferredName: 'koa ts',
      createdAt: date,
      updatedAt: date
    });
  }
}

export default UserService;
