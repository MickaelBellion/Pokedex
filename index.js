const dotenv = require('dotenv');
const express = require('express');
dotenv.config();

const PORT = process.env.PORT || 1234;
const router = require('./app/router');

const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use((request, response, next) => {
  //Si la liste n'existe pas, il faut la créer ! (req.session.deck = [])
  if (request.session.fav === undefined) {
    //le tableau de cartes n'a pas encore été créé pour ce user, on l'ajoute à sa session
    request.session.fav = [];
  }
  //on rend dispo pour toutes les vues le tableau de cartes en l'ajoutant à l'object response.locals
  //toutes nos vues disposeront d'une variable deck contenant le tableau des cartes
  response.locals.fav = request.session.fav;

  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
