import * as actionTypes from './actionTypes';
import { login } from '../../fetchApi/adminAxios';

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
		login(authData, 'login')
			.then((response) => {
				console.log(response);
				localStorage.setItem('aToken', response.data.token);
				dispatch(authSuccess(response.data.token));
			})
			.catch((err) => {
				console.log(err);
				dispatch(authFail('Server Down'));
			});
	};
};

export const check = () => {
	return (dispatch) => {
		dispatch(authStart());
		const data = {
			token: localStorage.getItem('aToken')
		};
		login(data, 'auth')
			.then((response) => {
				console.log(response);
				const token = localStorage.getItem('aToken');
				dispatch(authSuccess(token));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
