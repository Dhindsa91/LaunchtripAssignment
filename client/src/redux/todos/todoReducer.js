import { SET_TODO, LOG_OUT_TODO } from "./todoTypes";

const initialState = {
  todo: [],
};

const todoReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todo: action.payload,
      };

    case LOG_OUT_TODO:
      //Different way to return a new state
      return Object.assign({}, state, { todo: null });

    default:
      return state;
  }
};

export default todoReducer;
