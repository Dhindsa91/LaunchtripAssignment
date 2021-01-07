import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import todoReducer from "./todos/todoReducer";

const rootReducer = combineReducers({ user: userReducer, todo: todoReducer });

export default rootReducer;
