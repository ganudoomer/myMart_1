import * as actionTypes from '../actions/actionTypes';

const initialState = {
	token: false,
	error: false,
	loading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return {
				...state,
				loading: true,
				error: null
			};
		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				token: true,
				error: null,
				loading: false
			};
		case actionTypes.AUTH_FAIL:
			return {
				...state,
				error: true,
				loading: false
			};
		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				error: false,
				loading: false,
				token: false
			};
		default:
			return state;
	}
};

export default reducer;
