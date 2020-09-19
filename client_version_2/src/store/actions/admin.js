import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const logout = () => {
	localStorage.removeItem('aToken');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const auth = (username, password) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			username: username,
			password: password
		};
		axios
			.post('http://localhost:5050/admin/login', authData)
			.then((response) => {
				console.log(response);
				localStorage.setItem('aToken', response.data.token);
				dispatch(authSuccess(response.data.token));
			})
			.catch((err) => {
				console.log(err);
				dispatch(authFail(err.response.data.error));
			});
	};
};
