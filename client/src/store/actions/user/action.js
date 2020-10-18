import * as actionTypes from './actionTypes';
import * as Axios from '../../../fetchApi/userAxios';

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
		Axios.authUser(authData)
			.then((response) => {
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
		Axios.checkAuth(data)
			.then((response) => {
				const token = localStorage.getItem('uToken');
				dispatch(authSuccessUser(token));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

//LoginOTP

export const loginOTPStart = () => {
	return {
		type: actionTypes.LOGIN_OTP_START
	};
};

export const loginOtpsend = () => {
	return {
		type: actionTypes.LOGIN_OTP_SEND
	};
};

export const loginOTPFail = (message) => {
	return {
		message: message,
		type: actionTypes.LOGIN_OTP_FAIL
	};
};

export const loginOTP = (phone) => {
	return (dispatch) => {
		dispatch(loginOTPStart());
		const authData = {
			phone: phone
		};
		Axios.otpLogin(authData)
			.then((response) => {
				localStorage.setItem('LToken', response.data.temp);
				if (response.data.status === 'error') {
					dispatch(loginOTPFail(response.data.message));
				} else {
					console.log(response.data);
					dispatch(loginOtpsend());
				}
			})
			.catch((err) => {
				console.log(err);
				dispatch(loginOTPFail('Server Down'));
			});
	};
};

//CHECK OTP

export const UserOtpVerify = (otp) => {
	return (dispatch) => {
		dispatch(otpVerifyCheckStart());
		const authData = {
			token: localStorage.getItem('LToken'),
			otp: otp
		};
		Axios.otpVerify(authData)
			.then((response) => {
				if (response.data.status === 'error') {
					dispatch(failUserOtp(response.data.message));
				} else {
					localStorage.setItem('uToken', response.data.token);
					dispatch(verifyOTPsuccess());
				}
			})
			.catch((err) => {
				console.log(err);
				dispatch(failUserOtp('Server Down Try after sometime '));
			});
	};
};
export const otpVerifyCheckStart = () => {
	console.log('Start');
	return {
		type: actionTypes.LOGIN_OTP_VERIFY_START
	};
};

export const failUserOtp = (message) => {
	console.log('fail');
	return {
		message: message,
		type: actionTypes.LOGIN_OTP_VERIFY_FAIL
	};
};

export const verifyOTPsuccess = () => {
	console.log('success');
	return {
		type: actionTypes.LOGIN_OTP_VERIFY_SUCCESS
	};
};
