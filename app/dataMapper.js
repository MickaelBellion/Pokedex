const client = require('./database');

const dataMapper = {

    getAllPokemon: (callback) => {
      client.query('SELECT * FROM pokemon', (error, result) => {
          if (error) {
              console.log(error)
          } else {
              const allPokemon = result.rows
              callback(null, allPokemon)
          }
      })
    },

    getAllType: (callback) => {
        client.query('SELECT * FROM type', (error, result) => {
            if (error){
                callback(error)
            } else {
                const allTypes = result.rows
                callback(null, allTypes)
            }
        })
    },

    getPokemonByTypes: (type, callback) => {
        client.query('SELECT * FROM "pokemon" JOIN "pokemon_type" ON pokemon.numero = pokemon_type.pokemon_numero JOIN "type" ON pokemon_type.type_id = type.id WHERE name=$1', [type], (error, result) => {
            if (error){
                callback(error)
            } else {
                const pokemonsType = result.rows
                callback(null, pokemonsType)
            }
        })
    },

    getDetailPokemon: (pokemon,callback) => {
        client.query('SELECT * FROM "pokemon" JOIN "pokemon_type" ON pokemon.numero = pokemon_type.pokemon_numero JOIN "type" ON pokemon_type.type_id = type.id WHERE nom=$1', [pokemon],(error, result) => {
            if (error) {
                callback(error)
            } else {
                const pokemonFound = result.rows[0]
                callback(null, pokemonFound)
            }
        })
    },

    getForAddFavoris: (idFav, callback) => {
        console.log(idFav)
        client.query('SELECT * FROM pokemon WHERE numero=$1', [idFav], (error, result) => {
            if (error) {
                callback(error)
            } else {
                const pokemonSelect = result.rows[0]
                callback(null, pokemonSelect)
            }
        })
    },

    getForDelete: (deleteNum, callback) => {
        client.query('SELECT * FROM pokemon WHERE numero=$1', [deleteNum], (error, result) => {
            if(error) {
                callback(error)
            } else {
                const pokemonDelete = result.rows[0]
                console.log(pokemonDelete)
                callback(null, pokemonDelete)
            }
        })
    }
    // SELECT name FROM type JOIN pokemon_type ON pokemon.numero=pokemon_type.pokemon_numero JOIN type ON pokemon_type.type_id=type.id
    // SELECT * FROM name JOIN pokemon_type ON pokemon.numero = pokemon_type.pokemon_numero JOIN "type" ON pokemon_type.type_id = type.id WHERE nom=Florizarre
}

module.exports=dataMapper