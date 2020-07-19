import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecipe } from '../actions/recipe';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';

import spoon_fork from '../images/spoon_fork.png';

function youtube_parser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

const Recipe = ({ match, getRecipe, recipe: { recipe } }) => {
  useEffect(() => {
    getRecipe(match.params.id);
  }, []);
  return (
    recipe &&
    match.params.id === recipe._id && (
      <Fragment>
        <div className='recipe-detail'>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-lg-12 col-md-8 col-sm-8 text-center'>
                <h5 id='headdate'>
                  {new Date(recipe.dateUploaded).toDateString()}
                </h5>
                <h1 id='head1'>{recipe.recipeName}</h1>
                <div className='head2'>
                  <i className='fas fa-user' aria-hidden='true'></i>{' '}
                  {recipe.ownerName}
                </div>
              </div>

              <div className='col-lg-9  col-md-8  justify-content-center'>
                <img
                  src={recipe.image ? recipe.image : spoon_fork}
                  id='PICX'
                  alt='recipe-image'
                />

                <div className='basicinfo'>
                  <div className='row'>
                    <div className='col-4'>
                      <b>
                        <p className='prep'>Serves:</p>
                      </b>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>
                          <i className='fa fa-users' aria-hidden='true'></i>{' '}
                          {recipe.numberOfServes}
                        </strong>
                      </p>
                    </div>
                    <div className='col-4'>
                      <b>
                        <p className='prep'>Prep Time:</p>
                      </b>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>
                          <i className='fa fa-clock-o' aria-hidden='true'></i>{' '}
                          {recipe.prepTime}
                        </strong>
                      </p>
                    </div>
                    <div className='col-4'>
                      <b>
                        <p className='prep'>Cooking:</p>
                      </b>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>
                          <i className='fa fa-clock-o' aria-hidden='true'></i>{' '}
                          {recipe.cookTime}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>

                <p className='para'>{recipe.description}</p>

                <div className='d-flex justify-content-start selfbtn'>
                  {recipe.tags.map((tag) => (
                    <button
                      type='button'
                      className='tag btn btn-light'
                      style={{ outline: 'none' }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <StarRatings
                  rating={recipe.rating}
                  starRatedColor='#E84125'
                  numberOfStars={5}
                  starDimension='25px'
                  name='rating'
                />
                <div className='ingredient-direction'>
                  <div className='row'>
                    <div className='col-lg-6 col-sm-6'>
                      <h3 className='h-ingredirtn'>Ingredients</h3>
                      <ul className='ingredient'>
                        {recipe.ingredientDetails.map((detail) => (
                          <li>{detail}</li>
                        ))}
                      </ul>
                    </div>
                    <div className='col-lg-6 col-sm-6'>
                      <h3 className='h-ingredirtn'>Directions</h3>
                      <ol className='dirctn'>
                        {recipe.steps.map((step) => (
                          <li>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>

                {recipe.video && (
                  <div className='videoWrapper text-center'>
                    <iframe
                      width='560'
                      height='315'
                      src={
                        'https://www.youtube.com/embed/' +
                        youtube_parser(recipe.video)
                      }
                      frameborder='0'
                      className='my-3'
                      style={{ boxShadow: '1rem 1rem 2rem rgb(0,0,0,0.3)' }}
                      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                      allowfullscreen
                    ></iframe>
                  </div>
                )}

                <div className='diet clearfix'>
                  <h3>Nutritional Facts</h3>
                  <div className='flex'>
                    <p>Calories:</p>
                    <p>
                      <strong>{recipe.nutrition.calorie}</strong>
                    </p>
                  </div>
                  <div className='flex'>
                    <p>Carbohydrate:</p>
                    <p>
                      <strong>{recipe.nutrition.carbohydrate}</strong>
                    </p>
                  </div>
                  <div>
                    <p>Fat:</p>
                    <p>
                      <strong>{recipe.nutrition.fat}</strong>
                    </p>
                  </div>
                  <div>
                    <p>Protein:</p>
                    <p>
                      <strong>{recipe.nutrition.protein}</strong>
                    </p>
                  </div>
                  <div>
                    <p>Cholesterol:</p>
                    <p>
                      <strong>{recipe.nutrition.cholesterol}</strong>
                    </p>
                  </div>
                  <div>
                    <p>Vitamins:</p>
                    <p>
                      <strong>{recipe.nutrition.vitamin}</strong>
                    </p>
                  </div>
                  <div>
                    <p>Minerals:</p>
                    <p>
                      <strong>{recipe.nutrition.mineral}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  );
};

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.recipe,
});

export default connect(mapStateToProps, { getRecipe })(Recipe);
