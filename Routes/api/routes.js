const express = require('express');
const router = express.Router();
const Recipe = require('../../Models/Recipe');

function isSubset(arr1, arr2) {
  for (var i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      return false;
    }
  }
  return true;
}

router.get('/', (req, res) => {
  return res.status(200).send('Server is up and running');
});

router.post('/createRecipe', async (req, res) => {
  try {
    const {
      recipeName,
      ownerName,
      numberOfServes,
      prepTime,
      cookTime,
      description,
      rating,
      image,
      video,
      tags,
      ingredients,
      ingredientDetails,
      steps,
      calorie,
      carbohydrate,
      fat,
      protein,
      cholesterol,
      vitamin,
      mineral,
    } = req.body;

    var tagArray = tags.split(',').map((item) => item.trim().toUpperCase());
    var ingredientArray = ingredients
      .split(',')
      .map((item) => item.trim().toUpperCase());
    var ingredientDetailArray = ingredientDetails
      .split('@')
      .map((item) => item.trim());
    var stepArray = steps.split('@').map((item) => item.trim());

    var recipe = new Recipe({
      recipeName: recipeName.toUpperCase(),
      ownerName,
      numberOfServes,
      prepTime,
      cookTime,
      description,
      rating: Number(rating),
      image: image === ' ' ? '' : image,
      video: video === ' ' ? '' : video,
      tags: tagArray,
      ingredients: ingredientArray,
      ingredientDetails: ingredientDetailArray,
      steps: stepArray,
      nutrition: {
        calorie: calorie,
        carbohydrate: carbohydrate,
        fat: fat,
        protein: protein,
        cholesterol: cholesterol,
        vitamin: vitamin,
        mineral: mineral,
      },
    });
    await recipe.save();
    return res
      .status(200)
      .json({ data: { message: 'Success', recipe: recipe } });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

router.get('/getAllRecipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    return res
      .status(200)
      .json({ data: { message: 'Success', recipes: recipes } });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

router.get('/getRecipeCommon/:name', async (req, res) => {
  try {
    const name = req.params.name.toUpperCase();
    var recipes = await Recipe.find({});
    recipes = recipes.filter((r) =>
      r.recipeName.includes(name) || r.tags.find((tag) => tag.includes(name))
        ? true
        : false || r.ingredients.find((ingredient) => ingredient.includes(name))
        ? true
        : false
    );
    return res.status(200).json({
      data: { message: 'Success', length: recipes.length, recipes: recipes },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

router.post('/advancedSearch', async (req, res) => {
  try {
    const { recipeName, category, ingredients, tags, option } = req.body;
    var recipes = await Recipe.find({});
    recipes = recipes.filter((r) =>
      r.recipeName === recipeName.toUpperCase() && option === 'ALL'
        ? isSubset(r.ingredients, ingredients)
        : r.ingredients.some((r) => ingredients.indexOf(r) >= 0) &&
          r.tags.some((r) => tags.indexOf(r) >= 0) &&
          isSubset(r.tags, [category])
    );
    return res.status(200).json({
      data: { message: 'Success', length: recipes.length, recipes: recipes },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

router.get('/topBreakfastRecipe', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    const recipe = recipes
      .filter((r) => r.tags.includes('BREAKFAST'))
      .reduce((prev, current) =>
        prev.rating >= current.rating ? prev : current
      );
    return res
      .status(200)
      .json({ data: { message: 'Success', recipe: recipe } });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

router.get('/topLunchRecipe', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    const recipe = recipes
      .filter((r) => r.tags.includes('LUNCH'))
      .reduce((prev, current) =>
        prev.rating >= current.rating ? prev : current
      );
    return res
      .status(200)
      .json({ data: { message: 'Success', recipe: recipe } });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

router.get('/topDinnerRecipe', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    const recipe = recipes
      .filter((r) => r.tags.includes('DINNER'))
      .reduce((prev, current) =>
        prev.rating >= current.rating ? prev : current
      );
    return res
      .status(200)
      .json({ data: { message: 'Success', recipe: recipe } });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
