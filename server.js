

const { ApolloServer, gql } = require('apollo-server')

const resolvers = require('./src/graphql/resolvers/index')
const typeDefs = require('./src/graphql/typedefs/index')

    /*  Running mongoDB connection here */
require('./src/mongo/config')

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,  
    playground: true,
})

server.listen(PORT).then(({ url })=>{
    console.log(`🚀  Server ready at ${url}`);
})