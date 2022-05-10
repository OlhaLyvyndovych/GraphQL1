const { graphql, buildSchema } = require('graphql'); 
const { graphqlHTTP } = require('express-graphql');
const express = require('express');
const usersData = require('./users.json');
const app = express();

let fakeDB = {};
let db = [
    { id: 1, name: "office", rent: "$25", status: "available" },
    { id: 2, name: "co-working", rent: "$10", status: "unavailable" }
];

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Person {
        id: Int
        name: String
        email: String
        isDeveloper: Boolean
        age: Int
    }
    type Developer {
        profile: Person
        experience: Int
    }
    type Query {
        users: [Person]
        user(id: Int): Person
        getMsg: String
        getSpace(id: ID!): Space!
        getAllSpaces(status: STATUS): [Space]
    }

    input SpaceInput {
        name: String
        rent: String
        status: STATUS
    }

    enum STATUS {
        available
        unavailable
    }

    type Space {
        id: Int
        name: String
        rent: String
        status: STATUS
    } 

    type Mutation {
        addMessage(msg: String): String
        createSpace(id: Int, input: SpaceInput): Space!
        updateSpace(id: Int, input: SpaceInput): Space!
    }
`)

// The rootValue provides a resolver function for each API endpoint
//resolver function
//everything which  is not here but can  be queried - will be null
const rootValue = {
//     isDeveloper: () => {
//         return true
//     },
//     age: () => {
//         return 41
//     },
//     name: () => {
//         return 'Olha';
//     },
//     email: () => {
//         return 'olha@gmail.com'
//     },
//    experience: () => {
//        return 2
//    },
//    Olha: () => {
//        return {
//            profile: {name: "Olha", age: 41, email: "dkdjb", isDeveloper: true},
//            experience: 2
//        }
//    },
   users: () => {
       return usersData
   },
   user: ({id}) => {   // we pass destructured arg
        console.log(id);
        return usersData.find((user) => user.id === id);
   },
   addMessage: ({msg}) => {
       return fakeDB.message = msg;
   },
   getMsg: () => {
       return fakeDB.message;
   },
   createSpace: ({id, input}) => {
       db.push({ id, ...input})
       return { id, ...input }
   },
   getSpace: ({ id }) => {
       console.log(db);
       return db.find((name) => name.id == id)
    },
    getAllSpaces: ({status}) => {
        if (status) {
            return db.filter((space) => space.status == status)
        }
        return db;
    },
    updateSpace: ({ id, input }) => {
        const index = id - 1;
        db[index] = { id, ...input };
        return db[index];
    }
   
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true
}));

// Run the GraphQL query '{ hello }' and print out the response
//In graphql function we pass schema (how should look response), source (what we are looking for),
// and rootValue (a resolver function to complete it)

graphql({ 
    schema, 
    source: '{ createSpace }', 
    rootValue})
    .then((response) => {
        console.log(response)
    });

app.listen(8000)