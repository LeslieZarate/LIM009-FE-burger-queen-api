const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Role {
    admin : Boolean!
  }

  type User {
    _id: String!
    email: String!
    roles : Role!
  }

  type Auth {
    message: String!
    token: String!
  }

  type Product {
    _id:String!
    name: String!
    price: Float!
    image: String!
    type: String!
    dateEntry: String!
  }

  type ProductEspOrder{
    productId: String!
    name: String!
    price: Float!
  }
  
  type ProductOrder {
    qty: Int!
    product: ProductEspOrder!
  }
  
  enum StatusOrder{
    pending
    canceled
    delivering
    delivered
  }

  type Order {
    _id: String!
    userId: String!
    client: String!
    products: [ProductOrder!]!
    status: StatusOrder!
    dateEntry: String!
    dateProcessed: String
  }
  
  input ProductUnit {
    product: String!
    qty: Int!
  }

  type Query {
    getUserById(idOrEmail: String!): User
    getAllUsers: [User!]!
    getProductById(id: String!): Product
    getAllProducts:[Product]!
    getOrderById(id: String!): Order
    getAllOrders: [Order!]!
    
  }

  type Mutation {
    authentication(email: String!, password: String!): Auth
    createUser(email: String!,password: String! role:Boolean): User
    updateUser(idOrEmail:String!,email: String,password: String,role:Boolean): User
    deleteUser(idOrEmail:String!): User

    createProduct( name: String!,price: Float!,image: String!,type: String!):Product
    updateProduct( id: String! name: String, price: Float ,image: String ,type: String):Product
    deleteProduct(id: String!):Product

    createOrder(userId: String!,client: String!,products:[ProductUnit]):Order
    updateOrder(id:String!,status:String ):Order
    deleteOrder(id:String!):Order
  }
  
`;

module.exports = typeDefs;
