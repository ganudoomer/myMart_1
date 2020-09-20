import * as actionTypes from '../actions/user/actionTypes';

const initialState = {
	token: null,
	error: false,
	loading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START_USER:
			return {
				...state,
				loading: true,
				error: null
			};
		case actionTypes.AUTH_SUCCESS_USER:
			return {
				...state,
				token: action.token,
				error: null,
				loading: false
			};
		case actionTypes.AUTH_FAIL_USER:
			return {
				...state,
				error: true,
				loading: false
			};
		case actionTypes.AUTH_LOGOUT_USER:
			return {
				...state,
				error: false,
				loading: false,
				token: null
			};
		default:
			return state;
	}
};

export default reducer;
