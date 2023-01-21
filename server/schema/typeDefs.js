const {gql} = require('apollo-server-express');

const typeDefs = gql`
 type Category {
    _id: ID
    name: String
  } 
 type Comment {
    _id: ID
    commentText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Coffee {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: [Category]
    comments: [Comment]
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    Coffees( ID, name: String): [Coffee]
    Coffee(_id: ID!): Coffee
    user: User
    order(_id: ID!): Order
    checkout(coffee: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    addComment(commentText: String!): Comment
    addReaction(commentId: ID!, reactionBody: String!): Comment
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateCoffee(_id: ID!, quantity: Int!): Coffee
    login(email: String!, password: String!): Auth
  }
`;
module.exports = typeDefs;