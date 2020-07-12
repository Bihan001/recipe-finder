import {
  GET_RECIPE,
  GET_RECIPES,
  GET_TOP_BREAKFAST_RECIPE,
  GET_TOP_LUNCH_RECIPE,
  GET_TOP_DINNER_RECIPE,
} from '../actions/types';

const initialStates = {
  breakfast: null,
  lunch: null,
  dinner: null,
  recipe: null,
  recipes: [],
};

export default function (state = initialStates, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_RECIPE:
      return {
        ...state,
        recipe: payload.recipe,
      };

    case GET_RECIPES:
      return {
        ...state,
        recipes: payload.recipes,
      };
    case GET_TOP_BREAKFAST_RECIPE:
      return {
        ...state,
        breakfast: payload.recipe,
      };
    case GET_TOP_LUNCH_RECIPE:
      return {
        ...state,
        lunch: payload.recipe,
      };
    case GET_TOP_DINNER_RECIPE:
      return {
        ...state,
        dinner: payload.recipe,
      };
    default:
      return state;
  }
}
