export const UserTypeDef = `#graphql
  scalar Date

  type User {
    id: String!
    authId: String!
    name: String
    username: String!
    Programs: [Program!]
  }

  # For Queries

  type UserResponse {
    user: User!
  }

  type ValidateUsernameResponse {
    isAvailable: Boolean!
  }

  type VerifyTokenResponse {
    valid: Boolean!
  }

  # For Mutations

  type SignUpResponse {
    user: User!
  }

  type userUpdatedResponse {
    name: String
    username: String
  }  

  type DeleteUserResponse {
    message: String!
  }

  # Query and Mutation definitions

  type Query {
    getUser: UserResponse!
    getUserByAuthId(authId: String): UserResponse!
    getUserById(id: String!): UserResponse!
    validateUsername(username: String!): ValidateUsernameResponse!
    verifyToken: VerifyTokenResponse!
  }

  type Mutation { 
    signup(username: String!, name: String): UserResponse!
    updateUser(username: String, name: String): UserResponse!
    deleteUser: DeleteUserResponse!
  }
`;
