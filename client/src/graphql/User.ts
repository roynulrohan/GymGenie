import { gql } from '../__gql__';

export const VERIFY_TOKEN = gql(`
  query VerifyToken {
    verifyToken {
      valid
    }
  }
`);
