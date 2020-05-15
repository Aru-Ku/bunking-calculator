institutionalReducer;

const initialState = {
	isInstitutionalLoggedIn: false,
	adminID: "",
	stuID: "",
	dname: "",
	name: "",
	attendanceData: {},
};

const institutionalReducer = (state = initialState, action) => {
	switch (action.type) {
		case "INS_LOGGED_IN":
			return {
				...state,
				isInstitutionalLoggedIn: true,
				stuID: action.id,
				dname: action.dname,
			};
		case "INS_LOGGED_OUT":
			return {
				...state,
				isInstitutionalLoggedIn: false,
				adminID: "",
				stuID: "",
				dname: "",
				name: "",
				attendanceData: {},
			};
		case "SET_ADMIN_ID":
			return {
				...state,
				adminID: action.id,
			};
		case "SET_NAME":
			return {
				...state,
				name: action.name,
			};
		case "SET_ATT_DATA":
			return {
				...state,
				attendanceData: { ...action.data },
			};
	}
	return state;
};

export default institutionalReducer;
