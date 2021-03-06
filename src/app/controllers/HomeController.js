const { getAllChefs, getOneChef } = require('../utils/keepChefs');
const { getAllRecipes, getOneRecipe } = require('../utils/keepRecipes');

class HomeController {

  async home(request, response) {
    try {
      const base_url = `${request.protocol}://${request.headers.host}`;

      const recipes = (await getAllRecipes(base_url, {})).filter((recipe, index) => {
        return index <= 5 ? recipe : false;
      });

      return response.render('public/home', { recipes });
    } catch (err) {
      console.log(err);

      return response.render('public/home', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!',
        }
      });
    }
  }

  async recipes(request, response) {
    try {
      let { page, limit, filter } = request.query;

      page = page || 1;
      limit = limit || 6;
      let offset = limit * (page - 1);

      const params = {
        filter,
        limit,
        offset,
      };

      const base_url = `${request.protocol}://${request.headers.host}`;

      const recipes = await getAllRecipes(base_url, params);

      const pagination = {
        page,
        total: Math.ceil(recipes[0].total / limit),
      };

      return response.render('public/recipes/index', { recipes, pagination, filter });
    } catch (err) {
      console.log(err);

      return response.render('public/recipes/index', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!',
        }
      });
    }
  }

  async recipeShow(request, response) {
    try {
      const { id } = request.params;

      const base_url = `${request.protocol}://${request.headers.host}`;

      const recipe = await getOneRecipe(base_url, id);

      return response.render('public/recipes/show', { recipe });
    } catch (err) {
      console.log(err);

      return response.render('public/recipes/show', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!',
        }
      });
    }
  }

  about(request, response) {
    return response.render('public/about');
  }

  async chefs(request, response) {
    try {
      let { page, limit, filter } = request.query;

      page = page || 1;
      limit = limit || 12;
      let offset = limit * (page - 1);

      const params = {
        filter,
        limit,
        offset,
      };

      const base_url = `${request.protocol}://${request.headers.host}`;

      const chefs = await getAllChefs(base_url, params);

      const pagination = {
        page,
        total: Math.ceil(chefs[0].total / limit),
      };

      return response.render('public/chefs/index', { chefs, pagination, filter });
    } catch (err) {
      console.log(err);

      return response.render('public/chefs/index', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!'
        }
      });
    }
  }

  async chefShow(request, response) {
    try {
      const id = Number(request.params.id);

      const base_url = `${request.protocol}://${request.headers.host}`;

      const chef = await getOneChef(base_url, id);

      const params = {
        limit: 20,
        offset: null,
      };

      const recipes = (await getAllRecipes(base_url, params)).filter(recipe => {
        return recipe.chef_id === id ? recipe : false;
      });

      return response.render('public/chefs/show', { chef, recipes });
    } catch (err) {
      console.log(err);

      return response.render('public/chefs/index', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!'
        }
      });
    }
  }
}

module.exports = HomeController;