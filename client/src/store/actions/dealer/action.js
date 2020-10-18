import * as actionTypes from './actionTypes';
import { login } from '../../../fetchApi/dealerAxios';

export const authStartDealer = () => {
	return {
		type: actionTypes.AUTH_START_DEALER
	};
};

export const authSuccessDealer = (token) => {
	return {
		type: actionTypes.AUTH_SUCCESS_DEALER,
		token: token
	};
};

export const authFailDealer = (error) => {
	return {
		type: actionTypes.AUTH_FAIL_DEALER,
		error: error
	};
};

export const logoutDealer = () => {
	localStorage.removeItem('dToken');
	return {
		type: actionTypes.AUTH_LOGOUT_DEALER
	};
};

export const authDealer = (username, password) => {
	return (dispatch) => {
		dispatch(authStartDealer());
		const authData = {
			username: username,
			password: password
		};

		login(authData, 'login')
			.then((response) => {
				console.log(response);
				localStorage.setItem('dToken', response.data.token);
				dispatch(authSuccessDealer(response.data.token));
			})
			.catch((err) => {
				console.log(err);
				dispatch(authFailDealer('Server Down'));
			});
	};
};

export const check = () => {
	return (dispatch) => {
		const data = {
			token: localStorage.getItem('dToken')
		};
		login(data, 'auth')
			.then((response) => {
				console.log(response);
				const token = localStorage.getItem('dToken');
				dispatch(authSuccessDealer());
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
