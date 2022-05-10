const { gql } = require('apollo-server');

const types = gql`
    interface Character {
        id: ID!
        name: String
        gender: GENDER
    }

    type NonHuman implements Character{
        id: ID!
        name: String
        gender: GENDER
    }

    type Human implements Character{
        id: ID!
        name: String
        gender: GENDER
        dateOfBirth: String
        actor: String
        image: String
        wand: Wand
    }

    type Wand {
        wood: String
        core: String
        length: Float
    }

    enum GENDER {
        male
        female
    }

    type Query {
        human: [Human!]!
        nonhuman: [NonHuman!]!
    }
`

module.exports = types;