import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../pages/loading';
import {
  getAllRecipes,
  getTopBreakfastRecipe,
  getTopLunchRecipe,
  getTopDinnerRecipe,
} from '../actions/recipe';

import CardBig from '../components/card_big';

import logo from '../images/logo.svg';
import LoadMore from '../components/loadMore';
import CardSmall from '../components/card_small';

const Homepage = ({
  getAllRecipes,
  getTopBreakfastRecipe,
  getTopLunchRecipe,
  getTopDinnerRecipe,
  recipe: { recipes, breakfast, lunch, dinner },
}) => {
  useEffect(() => {
    getAllRecipes();
    getTopBreakfastRecipe();
    getTopLunchRecipe();
    getTopDinnerRecipe();
  }, []);
  return !(recipes && breakfast && lunch && dinner) ? (
    <Loading />
  ) : (
    <Fragment>
      <div
        id='carouselExampleFade'
        class='carousel slide carousel-fade'
        data-ride='carousel'
      >
        <div className='title'>
          <p className='zoom'>Recipe</p>
          <p className='sub'>Create your fill</p>
        </div>
        <div class='carousel-inner'>
          <div class='carousel-item active' data-interval='2000'>
            <div className='jumbotron slide1'></div>
          </div>
          <div class='carousel-item' data-interval='2000'>
            <div className='jumbotron slide2'>x</div>
          </div>
          <div class='carousel-item' data-interval='2000'>
            <div className='jumbotron slide3'></div>
          </div>
        </div>
        <a
          class='carousel-control-prev'
          href='#carouselExampleFade'
          role='button'
          data-slide='prev'
        >
          <span class='carousel-control-prev-icon' aria-hidden='true'></span>
          <span class='sr-only'>Previous</span>
        </a>
        <a
          class='carousel-control-next'
          href='#carouselExampleFade'
          role='button'
          data-slide='next'
        >
          <span class='carousel-control-next-icon' aria-hidden='true'></span>
          <span class='sr-only'>Next</span>
        </a>
      </div>

      <div className='thebackground'>
        <div className='container my-container'>
          <div className='row my-row'>
            <CardSmall slot='Breakfast' data={breakfast} />
            <CardSmall slot='Lunch' data={lunch} />
            <CardSmall slot='Dinner' data={dinner} />
          </div>
        </div>
      </div>
      <div className='secondcardpart'>
        <div className='secondcardpartheading'>
          <img
            src={logo}
            height='30'
            width='29'
            className='icontwo'
            style={{ marginLeft: '0px', marginTop: '-9px', opacity: '30%' }}
          />
          <div
            className='secondcardparttitle'
            style={{ display: 'inline', marginLeft: '10px' }}
          >
            List Recipes
          </div>
        </div>
      </div>
      <hr className='my-4 sep-2' />
      <div className='container cards2-containertwo'>
        <div className='row cards2-rowtwo'>
          {recipes.map((r) => (
            <div
              key={r._id}
              className='col-lg-4 col-md-6 col-sm-12 cards2-columntwo'
            >
              <CardBig data={r} />
            </div>
          ))}
        </div>
      </div>
      <LoadMore />
    </Fragment>
  );
};

Homepage.propTypes = {
  recipe: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.recipe,
});

export default connect(mapStateToProps, {
  getAllRecipes,
  getTopBreakfastRecipe,
  getTopLunchRecipe,
  getTopDinnerRecipe,
})(Homepage);
