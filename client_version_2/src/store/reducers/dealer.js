import * as actionTypes from '../actions/dealer/actionTypes';

const initialState = {
	token: null,
	error: false,
	loading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START_DEALER:
			return {
				...state,
				loading: true,
				error: null
			};
		case actionTypes.AUTH_SUCCESS_DEALER:
			return {
				...state,
				token: action.token,
				error: null,
				loading: false
			};
		case actionTypes.AUTH_FAIL_DEALER:
			return {
				...state,
				error: true,
				loading: false
			};
		case actionTypes.AUTH_LOGOUT_DEALER:
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
