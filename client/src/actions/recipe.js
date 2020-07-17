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

export const getRecipe = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/getRecipe/${id}`);
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
    const res = await axios.get(`/getAllRecipes`);
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
    const res = await axios.post(`/advancedSearch`, formData, config);
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
    const res = await axios.get(`/topBreakfastRecipe`);
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
    const res = await axios.get(`/topLunchRecipe`);
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
    const res = await axios.get(`/topDinnerRecipe`);
    dispatch({
      type: GET_TOP_DINNER_RECIPE,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};
