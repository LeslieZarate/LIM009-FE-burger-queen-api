// Provide resolver functions for your schema fields
const { ApolloError } = require('apollo-server-express');
const fetch = require('node-fetch');

const baseURL = 'http://localhost:8080';

const resolvers = {
  Query: {
    // user: async (_source, { id }, { dataSources }) => dataSources.UserAPI.getUser(id),
    // users: async (_, __, { dataSources }) => dataSources.UserAPI.getAllUsers(),
    getUserById: async (parent, args, context) => {
      const { idOrEmail } = args;
      const response = await fetch(`${baseURL}/users/${idOrEmail}`, {
        headers: { authorization: context.token },
      });
      const data = await response.json();
      if (data.statusCode !== 200 && data.statusCode) {
        return new ApolloError(data.message);
      }
      return data;
    },
    getAllUsers: async (parent, args, context) => {
      const response = await fetch(`${baseURL}/users`, {
        headers: { authorization: context.token },
      });
      const data = await response.json();      
      if (data.statusCode !== 200 && data.statusCode) {
        return new ApolloError(data.message);
      }
      return data;
    },
    getProductById: async (parent, args, context) => {
      const { id } = args;
      const response = await fetch(`${baseURL}/products/${id}`, {
        headers: { authorization: context.token },
      });
      const data = await response.json();      
      if (data.statusCode !== 200 && data.statusCode) {
        return new ApolloError(data.message);
      }
      return data;
    },
    getAllProducts: async (parent, args, context) => {
      const response = await fetch(`${baseURL}/products`, {
        headers: { authorization: context.token },
      });
      const data = await response.json();      
      if (data.statusCode !== 200 && data.statusCode) {
        return new ApolloError(data.message);
      }
      return data;
    },
    getOrderById: async (parent, args, context) => {
      const { id } = args;
      const response = await fetch(`${baseURL}/orders/${id}`, {
        headers: { authorization: context.token },
      });
      const data = await response.json();      
      if (data.statusCode !== 200 && data.statusCode) {
        return new ApolloError(data.message);
      }
      return data;
    },
    getAllOrders: async (parent, args, context) => {
      const response = await fetch(`${baseURL}/orders`, {
        headers: { authorization: context.token },
      });
      const data = await response.json();
      if (data.statusCode !== 200 && data.statusCode) {
        return new ApolloError(data.message);
      }
      return data;
    },
  },
  Mutation: {
    authentication: async (parent, args) => {
      const { email, password } = args;
      const response = await fetch(`${baseURL}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.statusCode !== 200 && data.statusCode) {
        return new ApolloError(data.message);
      }
      return data;
    },
    createUser: async (parent, args, context) => {
      const { email, password, role } = args;
      const response = await fetch(`${baseURL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: context.token },
        body: JSON.stringify({ email, password, roles: { admin: role } }),
      });
      return response.json();
    },
    updateUser: async (parent, args, context) => {
      const {
        idOrEmail, email, password, role,
      } = args;
      const response = await fetch(`${baseURL}/users/${idOrEmail}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', authorization: context.token },
        body: JSON.stringify({ email, password, roles: { admin: role } }),
      });
      return response.json();
    },
    deleteUser: async (parent, args, context) => {
      const { idOrEmail } = args;
      const response = await fetch(`${baseURL}/users/${idOrEmail}`, {
        method: 'DELETE',
        headers: { authorization: context.token },
      });
      return response.json();
    },
    createProduct: async (parent, args, context) => {
      const {
        name, price, image, type,
      } = args;
      const response = await fetch(`${baseURL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: context.token },
        body: JSON.stringify({
          name, price, image, type,
        }),
      });
      return response.json();
    },
    updateProduct: async (parent, args, context) => {
      const {
        id, name, price, image, type,
      } = args;
      const response = await fetch(`${baseURL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', authorization: context.token },
        body: JSON.stringify({
          name, price, image, type,
        }),
      });
      return response.json();
    },
    deleteProduct: async (parent, args, context) => {
      const { id } = args;
      const response = await fetch(`${baseURL}/products/${id}`, {
        method: 'DELETE',
        headers: { authorization: context.token },
      });
      return response.json();
    },
    createOrder: async (parent, args, context) => {
      const order = JSON.parse(JSON.stringify(args));
      const response = await fetch(`${baseURL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: context.token },
        body: JSON.stringify(order),
      });
      return response.json();
    },
    updateOrder: async (parent, args, context) => {
      const { id, status } = args;
      const response = await fetch(`${baseURL}/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', authorization: context.token },
        body: JSON.stringify({ status }),
      });
      return response.json();
    },
    deleteOrder: async (parent, args, context) => {
      const { id } = args;
      const response = await fetch(`${baseURL}/orders/${id}`, {
        method: 'DELETE',
        headers: { authorization: context.token },
      });
      return response.json();
    },
  },
};
module.exports = resolvers;
