import * as actionTypes from './actionTypes';
import axios from 'axios';

export const registerStart = () => {
	return {
		type: actionTypes.REGISTER_USER_START
	};
};

export const registerOtpsend = () => {
	return {
		type: actionTypes.REGISTER_USER_OTP_SEND
	};
};

export const registerFail = (message) => {
	return {
		message: message,
		type: actionTypes.REGISTER_USER_OTP_FAIL
	};
};

export const register = (phone, name, location, password) => {
	return (dispatch) => {
		dispatch(registerStart);
		const authData = {
			phone: phone,
			name: name,
			location: location,
			password: password
		};
		axios
			.post('http://localhost:5050/user/register/', authData)
			.then((response) => {
				if (!response.status === 'error') {
					console.log(response);
					localStorage.setItem('OToken', response.data.temp);
					dispatch(registerOtpsend());
				} else {
					dispatch(registerFail(response.message));
				}
			})
			.catch((err) => {
				console.log(err);
				dispatch(registerFail('Server Down'));
			});
	};
};
