const initialState = {
	isIndividualLoggedIn: false,
	accID: "",
	accessToken: "",
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
				isIndividualLoggedIn: true,
				accID: action.id,
				pic: action.pic,
				email: action.email,
				name: action.name,
				accessToken: action.token,
			};
		case "IND_LOGGED_OUT":
			return {
				...state,
				isIndividualLoggedIn: false,
				accID: "",
				name: "",
				email: "",
				pic: "",
				accessToken: "",
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
