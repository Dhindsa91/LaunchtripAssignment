import { SET_TODO, LOG_OUT_TODO } from "./todoTypes";

export const setTodo = (todo) => {
  return {
    type: SET_TODO,
    payload: todo,
  };
};

export const logOutTodo = () => {
  return {
    type: LOG_OUT_TODO,
  };
};
