const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');

router.get('/', mainController.homePage);
router.get('/types', mainController.typesPage);
router.get('/types/:type', mainController.pokemonTypePage);
router.get('/types', mainController.typesPage);
router.get('/detail/:pokemon', mainController.pokemonDetailPage);
router.get('/favoris/:idFav', mainController.favoris);
router.get('/favoris', mainController.favorisPage);
router.get('/favoris/delete/:id', mainController.deleteFav);



module.exports = router;