const { Router } = require('express');
const publicRoutes = Router();

const HomeController = require('../app/controllers/HomeController');

publicRoutes.get('/', HomeController.home);
publicRoutes.get('/recipes', HomeController.recipes);
publicRoutes.get('/recipes/show', HomeController.show);
publicRoutes.get('/about', HomeController.about);
publicRoutes.get('/chefs', HomeController.chefs);

module.exports = publicRoutes;