const express = require('express');
const router = express.Router();
const Recipe = require('../../Models/Recipe');

function splitCSVButIgnoreCommasInDoublequotes(str) {
  //split the str first
  //then merge the elments between two double quotes
  var delimiter = ',';
  var quotes = '"';
  var elements = str.split(delimiter);
  var newElements = [];
  for (var i = 0; i < elements.length; ++i) {
    if (elements[i].indexOf(quotes) >= 0) {
      //the left double quotes is found
      var indexOfRightQuotes = -1;
      var tmp = elements[i];
      //find the right double quotes
      for (var j = i + 1; j < elements.length; ++j) {
        if (elements[j].indexOf(quotes) >= 0) {
          indexOfRightQuotes = j;
          break;
        }
      }
      //found the right double quotes
      //merge all the elements between double quotes
      if (-1 != indexOfRightQuotes) {
        for (var j = i + 1; j <= indexOfRightQuotes; ++j) {
          tmp = tmp + delimiter + elements[j];
        }
        newElements.push(tmp);
        i = indexOfRightQuotes;
      } else {
        //right double quotes is not found
        newElements.push(elements[i]);
      }
    } else {
      //no left double quotes is found
      newElements.push(elements[i]);
    }
  }

  return newElements;
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

    var tagArray = tags.split(',').map((item) => item.trim());
    var ingredientArray = ingredients.split(',').map((item) => item.trim());
    var ingredientDetailArray = ingredientDetails
      .split('@')
      .map((item) => item.trim());
    var stepArray = steps.split('@').map((item) => item.trim());

    var recipe = new Recipe({
      recipeName,
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

module.exports = router;
