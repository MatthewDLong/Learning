import { ApolloServer } from "apollo-server-lambda";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import dataSources from "./datasources";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    ...dataSources,
  }),
});

export const graphqlHandler = server.createHandler();
