import { gql } from "apollo-server-lambda";

const typeDefs = gql`
  type Query {
    photos: [Photo]
  }

  type Photo {
    id: ID!
    url: String
    title: String
  }
`;

export default typeDefs;
