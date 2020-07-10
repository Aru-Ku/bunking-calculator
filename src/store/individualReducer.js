const initialState = {
	isIndividualLoggedIn: false,
	accID: "",
	name: "",
	email: "",
	pic: "",
	data: {},
};

const individualReducer = (state = initialState, action) => {
	switch (action.type) {
		case "IND_LOGGED_IN":
			return {
				...state,
				accID: action.id,
				pic: action.pic,
				email: action.email,
				name: action.name,
				isIndividualLoggedIn: true,
			};
		case "IND_LOGGED_OUT":
			return {
				isIndividualLoggedIn: false,
				...state,
				accID: "",
				name: "",
				email: "",
				pic: "",
			};
		case "SET_DATA":
			return {
				...state,
				data: { ...action.data },
			};
	}
	return state;
};

export default individualReducer;
