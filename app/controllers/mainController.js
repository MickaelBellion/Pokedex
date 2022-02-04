const { request } = require('express');
const dataMapper = require('../dataMapper.js');

const mainController = {
    homePage: (req, res) => {
      dataMapper.getAllPokemon((error, allPokemon) => {
        if(error) {
          console.error(error);
        } else {
            // console.log(allPokemon)
            res.render('home', {allPokemon})
        }
        
      });
    },

    typesPage: (req, res) => {
        dataMapper.getAllType((error, allTypes) => {
            if (error) {
                console.log(error)
            } else {
                const types = allTypes
                res.render('types', {types})
            }
        })
    },

    pokemonTypePage: (req, res) => {
        const type = req.params.type
        console.log(type)
        dataMapper.getPokemonByTypes(type, (error, pokemonsType) => {
            if(error) {
                console.log(error)
            } else {
                res.render('home', {allPokemon: pokemonsType})
            }
        })
    },

    pokemonDetailPage: (req, res) => {
        const pokemon = req.params.pokemon
        dataMapper.getDetailPokemon(pokemon, (error, pokemonFound) => {
            if (error) {
                console.log(error)
            } else {
                res.render('details', {pokemon : pokemonFound})
            }
        })
    },

    favoris: (req, res) => {
        const idFav = Number(req.params.idFav)
        
        console.log(req.session.fav)
        const found = req.session.fav.find(pokemon => pokemon.numero === idFav)
        const full = req.session.fav.length < 5
    
        if (found !== undefined || full === false) {
          console.log('Le pokémon est déjà dans les favoris ou il y a plus de place')
          res.render('favoris')
    
        } else {
          dataMapper.getForAddFavoris(idFav,(error, pokemonSelect) => {
            if (error){
              console.log(error)
            } else {
              req.session.fav.push(pokemonSelect)
              res.render('favoris')
            }
    
          })
        }
      },

      favorisPage: (req, res) => {
        res.render('favoris', {pokemon: req.session.fav})
      },

      deleteFav: (req, res) => {
        const deleteNum = parseInt(req.params.id, 10)
        dataMapper.getForDelete(deleteNum ,(error, pokemonDelete) => {
          if (error) {
            console.log(error)
          } else {
            const newFav = req.session.fav.filter(pokemon => pokemon.numero !== deleteNum)
            console.log(newFav)
            req.session.fav = newFav
            res.redirect('/favoris')
          }
        })
      }

}


module.exports = mainController;