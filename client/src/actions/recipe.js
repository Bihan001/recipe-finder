import axios from 'axios';
import {
  GET_RECIPE,
  GET_RECIPES,
  GET_TOP_BREAKFAST_RECIPE,
  GET_TOP_LUNCH_RECIPE,
  GET_TOP_DINNER_RECIPE,
} from './types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const HOST = 'http://localhost:5000';

export const getRecipe = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/getRecipe/${id}`);
    dispatch({
      type: GET_RECIPE,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getAllRecipes = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/getAllRecipes`);
    dispatch({
      type: GET_RECIPES,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getFilteredRecipes = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/advancedSearch`, formData, config);
    dispatch({
      type: GET_RECIPES,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getTopBreakfastRecipe = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/topBreakfastRecipe`);
    dispatch({
      type: GET_TOP_BREAKFAST_RECIPE,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getTopLunchRecipe = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/topLunchRecipe`);
    dispatch({
      type: GET_TOP_LUNCH_RECIPE,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getTopDinnerRecipe = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/topDinnerRecipe`);
    dispatch({
      type: GET_TOP_DINNER_RECIPE,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};
