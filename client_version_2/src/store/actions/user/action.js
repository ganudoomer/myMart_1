import * as actionTypes from './actionTypes';
import axios from 'axios';

//Login

export const authSuccessUser = (token) => {
	return {
		type: actionTypes.AUTH_SUCCESS_USER,
		token: token
	};
};

export const authStartUser = () => {
	return {
		type: actionTypes.AUTH_START_USER
	};
};

export const authFailUSer = (error) => {
	return {
		type: actionTypes.AUTH_FAIL_USER,
		error: error
	};
};

export const logoutUser = () => {
	localStorage.removeItem('uToken');
	return {
		type: actionTypes.AUTH_LOGOUT_USER
	};
};

export const authUSer = (phone, password) => {
	return (dispatch) => {
		dispatch(authStartUser());
		const authData = {
			phone: phone,
			password: password
		};
		axios
			.post('http://localhost:5050/user/login', authData)
			.then((response) => {
				console.log(response);
				localStorage.setItem('uToken', response.data.token);
				dispatch(authSuccessUser(response.data.token));
			})
			.catch((err) => {
				console.log(err);
				dispatch(authFailUSer('Server Down'));
			});
	};
};

export const check = () => {
	return (dispatch) => {
		const data = {
			token: localStorage.getItem('uToken')
		};
		axios
			.post('http://localhost:5050/user/auth', data)
			.then((response) => {
				console.log('mass');
				const token = localStorage.getItem('uToken');
				dispatch(authSuccessUser(token));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
