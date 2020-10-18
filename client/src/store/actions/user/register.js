import * as actionTypes from './actionTypes';
import * as Axios from '../../../fetchApi/userAxios';

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
		Axios.register(authData)
			.then((response) => {
				localStorage.setItem('OToken', response.data.temp);
				if (response.data.status === 'error') {
					dispatch(registerFail(response.data.message));
				} else {
					console.log(response.data);
					dispatch(registerOtpsend());
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
		Axios.registerVerify(authData)
			.then((response) => {
				if (response.data.status === 'error') {
					dispatch(failUserOtp(response.data.message));
				} else {
					dispatch(verifyOTPsuccess());
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
