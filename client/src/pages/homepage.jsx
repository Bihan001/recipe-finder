import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getAllRecipes,
  getTopBreakfastRecipe,
  getTopLunchRecipe,
  getTopDinnerRecipe,
} from '../actions/recipe';

import CardBig from '../components/card_big';

import logo from '../images/logo.svg';
import LoadMore from '../components/loadMore';
import Navbar from '../components/navbar';
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
  return (
    recipes &&
    breakfast &&
    lunch &&
    dinner && (
      <Fragment>
        <Navbar />

        <div className='jumbotron'>
          <div>
            <center>
              <div
                id='carouselExampleCaptions'
                class='carousel slide'
                data-ride='carousel'
                style={{ height: '60%', width: '50%' }}
              >
                <ol class='carousel-indicators'>
                  <li
                    data-target='#carouselExampleCaptions'
                    data-slide-to='0'
                    class='active'
                  ></li>
                  <li
                    data-target='#carouselExampleCaptions'
                    data-slide-to='1'
                  ></li>
                  <li
                    data-target='#carouselExampleCaptions'
                    data-slide-to='2'
                  ></li>
                </ol>
                <div class='carousel-inner'>
                  <div class='carousel-item active'>
                    <img
                      src='https://cdn.downtoearth.org.in/library/large/2019-03-05/0.89399200_1551782137_fast1.jpg'
                      class='d-block w-100'
                      alt='...'
                    />
                    <div class='carousel-caption d-none d-md-block'>
                      <h5>First slide label</h5>
                      <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                      </p>
                    </div>
                  </div>
                  <div class='carousel-item'>
                    <img
                      src='https://cdn.downtoearth.org.in/library/large/2019-03-05/0.89399200_1551782137_fast1.jpg'
                      class='d-block w-100'
                      alt='...'
                    />
                    <div class='carousel-caption d-none d-md-block'>
                      <h5>Second slide label</h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                  </div>
                  <div class='carousel-item'>
                    <img
                      src='https://cdn.downtoearth.org.in/library/large/2019-03-05/0.89399200_1551782137_fast1.jpg'
                      class='d-block w-100'
                      alt='...'
                    />
                    <div class='carousel-caption d-none d-md-block'>
                      <h5>Third slide label</h5>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur.
                      </p>
                    </div>
                  </div>
                </div>
                <a
                  class='carousel-control-prev'
                  href='#carouselExampleCaptions'
                  role='button'
                  data-slide='prev'
                >
                  <span
                    class='carousel-control-prev-icon'
                    aria-hidden='true'
                  ></span>
                  <span class='sr-only'>Previous</span>
                </a>
                <a
                  class='carousel-control-next'
                  href='#carouselExampleCaptions'
                  role='button'
                  data-slide='next'
                >
                  <span
                    class='carousel-control-next-icon'
                    aria-hidden='true'
                  ></span>
                  <span class='sr-only'>Next</span>
                </a>
              </div>
            </center>
          </div>
          <div className='title'>
            <p className='zoom'>Recipe</p>
            <p className='sub'>Create your fill</p>
          </div>
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
    )
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
