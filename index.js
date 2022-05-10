const { ApolloServer, gql } = require('apollo-server');
const types = require('./types');
const resolvers = require('./resolvers');


// const books = [
//     {
//       title: 'The Awakening',
//       author: 'Kate Chopin',
//     },
//     {
//       title: 'City of Glass',
//       author: 'Paul Auster',
//     },
//   ];

const server = new ApolloServer({
    typeDefs: types,
    resolvers //resolvers: resolvers
});

  server.listen().then(({ url }) => {
      console.log(` Server is running at ${url}`);
  });