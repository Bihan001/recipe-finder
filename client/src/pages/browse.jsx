import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllRecipes } from '../actions/recipe';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Loading from '../pages/loading';
import CardBig from '../components/card_big';
import LoadMore from '../components/loadMore';
import { getFilteredRecipes } from '../actions/recipe';

const categories = [
  { value: 'Breakfast', label: 'Breakfast' },
  { value: 'Lunch', label: 'Lunch' },
  { value: 'Dinner', label: 'Dinner' },
  { value: 'Chinise', label: 'Chinise' },
  { value: 'Indian', label: 'Indian' },
  { value: 'Dessert', label: 'Dessert' },
];

const ingredients = [
  { value: 'Egg', label: 'Egg' },
  { value: 'Chicken', label: 'Chicken' },
  { value: 'Mutton', label: 'Mutton' },
  { value: 'Chocolate', label: 'Chocolate' },
  { value: 'Milk', label: 'Milk' },
  { value: 'Vegetables', label: 'Vegetables' },
];

const animatedComponents = makeAnimated();

const Browse = ({ getAllRecipes, getFilteredRecipes, recipe: { recipes } }) => {
  const [includeIngredients, setIncludeIngredients] = useState([]);
  const [excludeIngredients, setExcludeIngredients] = useState([]);
  const [category, setCategory] = useState({});
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    getAllRecipes();
  }, []);

  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var ingredients_include = [];
    var ingredients_exclude = [];
    if (excludeIngredients)
      for (let i = 0; i < excludeIngredients.length; i++) {
        ingredients_exclude.unshift(excludeIngredients[i].value);
      }
    if (includeIngredients)
      for (let i = 0; i < includeIngredients.length; i++) {
        ingredients_include.unshift(includeIngredients[i].value);
      }
    console.log({
      keyword,
      category: category ? category.value : null,
      ingredients_include,
      ingredients_exclude,
    });
    getFilteredRecipes({
      keyword,
      category: category ? category.value : null,
      ingredients_include,
      ingredients_exclude,
    });
  };

  return !recipes ? (
    <Loading />
  ) : (
    <Fragment>
      <div class='recipebrowsesec'>
        <h1>
          <span>Browse Recipes</span>
        </h1>
        <hr class='my-3' />
      </div>

      <div class='container browse-container'>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class='flexbox'>
            <div class='column1'>
              <div id='searchheads'>
                <p>Choose Catogory.</p>
                <Select
                  style={{ height: '20px' }}
                  className='m-1'
                  onChange={setCategory}
                  isClearable
                  closeMenuOnSelect={true}
                  noOptionsMessage={() => 'Nothing'}
                  components={animatedComponents}
                  autoFocus
                  options={categories}
                />
              </div>
            </div>
            <div class='column2'>
              <div id='searchheads'>
                <p>Select Ingredients to include in recipe</p>
                <Select
                  style={{ height: '20px' }}
                  className='m-1'
                  onChange={setIncludeIngredients}
                  isClearable
                  closeMenuOnSelect={false}
                  noOptionsMessage={() => 'Nothing'}
                  components={animatedComponents}
                  isMulti
                  autoFocus
                  options={ingredients}
                />
              </div>
            </div>
            <div class='column3'>
              <div id='searchheads'>
                <p>Select Ingredients to exclude from recipe</p>
                <Select
                  style={{ height: '20px' }}
                  className='m-1'
                  onChange={setExcludeIngredients}
                  isClearable
                  closeMenuOnSelect={false}
                  noOptionsMessage={() => 'Nothing'}
                  components={animatedComponents}
                  isMulti
                  autoFocus
                  options={ingredients}
                />
              </div>
            </div>
          </div>
          <div class='flexbox2'>
            <input
              class='form-control mr-sm-2'
              type='search'
              placeholder='Search by Keyword'
              aria-label='Search'
              name='keyword'
              value={keyword}
              onChange={(e) => onChange(e)}
            />
            <button class='btn btn-outline-danger my-2 my-sm-0' type='submit'>
              Search
            </button>
          </div>
        </form>
      </div>
      <div class='resultblock'>
        <h1>RESULT</h1>
        <hr class='my-3' />
      </div>
      <div className='container cards2-containertwo'>
        <div
          className='row cards2-rowtwo'
          style={recipes.length === 0 ? { justifyContent: 'center' } : null}
        >
          {recipes.length === 0 ? (
            <p style={{ display: 'block', textAlign: 'center !important' }}>
              No recipes found...
            </p>
          ) : (
            recipes.map((r) => (
              <div
                key={r._id}
                className='col-lg-4 col-md-6 col-sm-12 cards2-columntwo'
              >
                <CardBig data={r} />
              </div>
            ))
          )}
        </div>
      </div>
      <LoadMore />
    </Fragment>
  );
};

Browse.propTypes = {
  recipe: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ recipe: state.recipe });

export default connect(mapStateToProps, { getAllRecipes, getFilteredRecipes })(
  Browse
);
