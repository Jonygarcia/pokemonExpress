'use strict'

const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemon');

router.get('/', async (req, res) => {
    try {
        const arrayPokemonDB = await Pokemon.find();
        console.log(arrayPokemonDB);
        res.render('pokemon', { arrayPokemon: arrayPokemonDB })
    } catch (error) {
        console.log(error)
    }
})

router.get('/crear', (req, res) => {
    res.render('crear')
})

router.post('/', async (req, res) => {
    const body = req.body
    console.log(body)
    try {
        const pokemonDB = new Pokemon(body)
        await pokemonDB.save()
        res.redirect('/pokemon')
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const pokemonDB = await Pokemon.findOne({ _id: id })
        console.log(pokemonDB)
        res.render('detalle', {
            pokemon: pokemonDB,
            error: false
        })
    } catch (error) {
        console.log('Se ha producido un error', error)
        res.render('detalle', {
            error: true,
            mensaje: 'Pokémon no encontrado!'
        })
    }
})

module.exports = router;
