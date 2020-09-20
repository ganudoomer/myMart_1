import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStartUser = () => {
	return {
		type: actionTypes.AUTH_START_USER
	};
};
export const authStartUserOtp = () => {
	return {
		type: actionTypes.AUTH_START_USER_REGISTER_OTP
	};
};
export const authSuccessUser = (token) => {
	return {
		type: actionTypes.AUTH_SUCCESS_USER,
		token: token
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

export const authUserOtp = (phone, name, location) => {
	return (dispatch) => {
		dispatch(authStartUser());
		const authData = {
			phone: phone,
			name: name,
			location: location
		};
		axios
			.post('http://localhost:5050/dealer/login', authData)
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

export const authUser = (username, password) => {
	return (dispatch) => {
		dispatch(authStartUser());
		const authData = {
			username: username,
			password: password
		};
		axios
			.post('http://localhost:5050/dealer/login', authData)
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
