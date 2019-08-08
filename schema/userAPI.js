const { RESTDataSource } = require('apollo-datasource-rest');

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:8080/';
  }

  async getAllUsers() {
    const data = await this.get('users');
    return data;
  }

  async getUser(id) {
    return this.get(`users/${id}`);
  }

  async postUser(user) {
    return this.post('users', user);
  }

  async updateUser(user) {
    return this.put('users', user);
  }

  async deleteUser(user) {
    return this.delete(`users${user.id}`);
  }
}

class PersonalizationAPI extends RESTDataSource {
  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }
}

module.exports = {
  UserAPI,
  PersonalizationAPI,
};
