import { createStore, applyMiddleware } from "redux";
// import thunkMiddleware from "react-thunk";

const initialState = {
	isLoggedin: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOGGED_IN":
			return { ...state };
	}
	return state;
};

const store = createStore(reducer);

export { store };
