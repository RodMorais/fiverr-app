

const { mergeResolvers } = require('@graphql-tools/merge');

const userResolver = require('./userResolver');
const merchantResolver = require('./merchantResolver');
const ordersResolvers = require('./ordersResolvers');
const cartsResolver = require('./cartsResolver');
const productResolvers = require('./productResolvers');


const resolvers = [
    userResolver,
    merchantResolver,
    ordersResolvers,
    cartsResolver,
    productResolvers
];

module.exports = mergeResolvers(resolvers);