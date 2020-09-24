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
		dispatch(registerStart());
		const authData = {
			phone: phone,
			name: name,
			location: location,
			password: password
		};
		axios
			.post('http://localhost:5050/user/register/', authData)
			.then((response) => {
				console.log(response.data);
				dispatch(registerOtpsend());
				localStorage.setItem('OToken', response.data.temp);
				if (response.data.status === 'error') {
					dispatch(registerFail(response.data.message));
				}
			})
			.catch((err) => {
				console.log(err);
				dispatch(registerFail('Server Down'));
			});
	};
};

//CHECK OTP

export const UserOtpVerify = (otp) => {
	return (dispatch) => {
		dispatch(otpCheckStart());
		const authData = {
			token: localStorage.getItem('OToken'),
			otp: otp
		};
		axios
			.post('http://localhost:5050/user/register/auth', authData)
			.then((response) => {
				dispatch(verifyOTPsuccess());
				if (response.data.status === 'error') {
					dispatch(failUserOtp(response.data.message));
				}
			})
			.catch((err) => {
				console.log(err);
				dispatch(failUserOtp('Server Down Try after sometime '));
			});
	};
};
export const otpCheckStart = () => {
	console.log('Start');
	return {
		type: actionTypes.OTP_USER_START
	};
};

export const failUserOtp = (message) => {
	console.log('fail');
	return {
		message: message,
		type: actionTypes.OTP_FAIL
	};
};

export const verifyOTPsuccess = () => {
	console.log('success');
	return {
		type: actionTypes.OTP_USER_OTP_SUCCESS
	};
};
