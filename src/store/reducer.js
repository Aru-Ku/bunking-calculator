import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import individualReducer from "./individualReducer";
import institutionalReducer from "./institutionalReducer";

const reducer = combineReducers({
	ind: individualReducer,
	ins: institutionalReducer,
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store };
