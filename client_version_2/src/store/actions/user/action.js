import * as actionTypes from './actionTypes';
import axios from 'axios';

//Register
export const authStartUserOtp = () => {
	return {
		type: actionTypes.AUTH_START_USER_REGISTER_OTP
	};
};
export const authStartOtpGet = (token) => {
	return {
		type: actionTypes.AUTH_START_USER_REGISTER_OTP_SUCCESS,
		token: token
	};
};
export const authFailUSerOtp = (error) => {
	return {
		type: actionTypes.AUTH_USER_REGISTER_OTP_FAIL_OTP,
		error: error
	};
};

export const authSuccessOtp = (error) => {
	return {
		type: actionTypes.Auth_USER_OTP_SUCCESS,
		error: error
	};
};

export const authUserOtp = (phone, name, location) => {
	return (dispatch) => {
		dispatch(authStartUserOtp());
		const authData = {
			phone: phone,
			name: name,
			location: location
		};
		axios
			.post('http://localhost:5050/user/register/', authData)
			.then((response) => {
				console.log(response);
				localStorage.setItem('OToken', response.data.temp);
				dispatch(authStartOtpGet(response.data.token));
			})
			.catch((err) => {
				console.log(err);
				dispatch(authFailUSerOtp('Server Down'));
			});
	};
};

export const authUserOtpVerify = (otp, password) => {
	return (dispatch) => {
		const authData = {
			token: localStorage.getItem('OToken'),
			otp: otp,
			password: password
		};
		axios
			.post('http://localhost:5050/user/register/auth', authData)
			.then((response) => {
				console.log(response);
				dispatch(authSuccessOtp());
			})
			.catch((err) => {
				console.log(err);
				dispatch(authFailUSerOtp('Server Down'));
			});
	};
};

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
