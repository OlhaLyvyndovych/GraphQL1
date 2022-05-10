const CharactersData = require('./harrypotter.json');

const resolvers = {
    Query: {
        human () {
            CharactersData.filter((char) => !char.species)
        },
    
        nonhuman () { 
            CharactersData.filter((char) => char.species)
        }
    }
}   


  module.exports = resolvers;