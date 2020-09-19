import * as actionTypes from './actionTypes';
import axios from 'axios';

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
	localStorage.removeItem('aToken');
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
		axios
			.post('http://localhost:5050/dealer/login', authData)
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
