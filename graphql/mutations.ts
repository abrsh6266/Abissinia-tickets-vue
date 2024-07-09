import { gql } from 'graphql-tag'

export const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    users(where: {email: {_eq: $email}, password: {_eq: $password}}) {
      avatar
      created_at
      email
      id
      role
      username
    }
  }
`

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    insert_users_one(object: {
      username: $username,
      email: $email,
      password: $password,
      created_at: "now()"
    }) {
      id
      username
      email
      avatar
      role
    }
  }
`
