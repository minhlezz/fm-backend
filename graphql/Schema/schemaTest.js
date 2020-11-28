const { gql } = require('apollo-server');


module.exports = gql`

type AuthData {
  userId: ID
  token: String
  tokenExpiration: Int
}

type User {
    id: String
    email: String
    password: String
   
}

type UserProfile {
    id: String
    username: String
    budget: Float
    mobile: String
    mobileVerified: Boolean
    radius: Float
    age: Int
    gender: Gender
   
}

enum Gender {
    Male
    Female
    Others
}

type Picture {
    id: String
    pictureUrl: String
    name: String
    user: User
}

#Input Type
input UserInput {
    email: String!
    password: String!
}


input ProfileInput {
    username: String
    budget: Float
    mobile: String
    radius: Float
    age: Int
    gender: String
    user: String
}

#Query && Mutation
type Query {
    user(_id: String!): User!
    users: [User!]

}


type Mutation {
    login(email: String!, password: String!): AuthData!
    register(input: UserInput): User!
}

`;

