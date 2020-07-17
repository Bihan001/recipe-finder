const express = require('express');
const router = express.Router();
const Recipe = require('../../Models/Recipe');

function hasKeyword(keyword, r) {
  if (
    r.recipeName.indexOf(keyword) !== -1 ||
    r.tags.some((t) => t.indexOf(keyword) !== -1)
  ) {
    return true;
  } else {
    return false;
  }
}

function hasCategory(category, r) {
  if (r.category.indexOf(category) !== -1) {
    return true;
  } else return false;
}

function matchVeg_nonVeg(option, r) {
  if (option === r.isVeg) {
    return true;
  } else return false;
}

function includedIngredients(ingredients, r) {
  var cnt = 0;
  for (let i = 0; i < ingredients.length; i++) {
    for (let j = 0; j < r.ingredients.length; j++) {
      if (r.ingredients[j].indexOf(ingredients[i]) !== -1) {
        cnt += 1;
        continue;
      }
    }
  }
  return cnt === ingredients.length ? true : false;
}

function excludedIngredients(ingredients, r) {
  for (let i = 0; i < r.ingredients.length; i++) {
    for (let j = 0; j < ingredients.length; j++) {
      if (r.ingredients[i].indexOf(ingredients[j]) !== -1) {
        return false;
      }
    }
  }
  return true;
}

router.post('/createRecipe', async (req, res) => {
  try {
    const {
      recipeName,
      ownerName,
      numberOfServes,
      prepTime,
      cookTime,
      description,
      category,
      isVeg,
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
      category: category.toUpperCase(),
      isVeg: Boolean(isVeg),
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

router.get('/getRecipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
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
      r.recipeName.indexOf(name) != -1 ||
      r.category.indexOf(name) != -1 ||
      r.tags.find((tag) => tag.indexOf(name) != -1)
        ? true
        : false ||
          r.ingredients.find((ingredient) => ingredient.indexOf(name) != -1)
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
    const {
      keyword,
      category,
      veg_nonVeg,
      ingredients_include,
      ingredients_exclude,
    } = req.body;
    var recipes = await Recipe.find({});
    recipes = recipes.filter(
      (r) =>
        (keyword ? hasKeyword(keyword.toUpperCase(), r) : true) &&
        (veg_nonVeg ? matchVeg_nonVeg(veg_nonVeg, r) : true) &&
        (ingredients_exclude
          ? excludedIngredients(
              ingredients_exclude.map((i) => i.toUpperCase()),
              r
            )
          : true) &&
        (ingredients_include
          ? includedIngredients(
              ingredients_include.map((i) => i.toUpperCase()),
              r
            )
          : true) &&
        (category ? hasCategory(category.toUpperCase(), r) : true)
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
