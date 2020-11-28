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
    # userProfile: UserProfile
    images: [Picture]
    username: String
    budget: Float
    mobile: String
    mobileVerified: Boolean
    age: Int
    gender: Gender
    aboutMe: String
    moveInDate: String
    minStay: String
    headline: String
    cleanliness: String
    overnightGuests: String
    partyHarbits: String
    getUp: String
    goToBed: String
    foodReference: String
    smoker: Boolean
    workSchedule: String
    occupation: String
    pet: String

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
    confirmPassword: String!
}


input ProfileInput {
    username: String
    budget: Float
    mobile: String
    age: Int
    gender: String
    aboutMe: String
    moveInDate: String
    minStay: String
    headline: String
    cleanliness: String
    overnightGuests: String
    partyHarbits: String
    getUp: String
    goToBed: String
    foodReference: String
    smoker: Boolean
    workSchedule: String
    occupation: String
    pet: String
}

#Query && Mutation
type Query {
    getUser(id: String!): User
    users: [User!]

}


type Mutation {
    login(email: String!, password: String!): AuthData!
    register(input: UserInput): User!
    updateUser(id: String!, profileInput: ProfileInput): User!
    createPicture(name: String!, pictureUrl: String!): Picture!
    updatePicture(id: String!, name: String!, pictureUrl: String!): Picture!
    deletePicture(id: String): Picture!

}

`;

