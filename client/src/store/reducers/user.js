import * as actionTypes from '../actions/user/actionTypes';

const initialState = {
	token: false,
	login: false,
	error: false,
	loading: false,
	otp: null,
	otpToken: null,
	otperror: false,
	success: false,
	errorOtp: null,
	loadingOtp: false,
	sendOtp: false,
	loadingVerify: false,
	verifyError: null,
	verifySuccess: false,
	otpStart: false,
	otpLoading: false,
	otpSend: false,
	verifyOtp: false,
	verifyOtpLoading: false,
	verifyOtpFail: false,
	verifyOtpSuccess: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.OTP_USER_START:
			return {
				...state,
				loadingVerify: true,
				verifyError: null,
				verifySuccess: false
			};

		case actionTypes.OTP_USER_OTP_SUCCESS:
			return {
				...state,
				loadingVerify: false,
				verifyError: null,
				verifySuccess: true,
				sendOtp: false
			};
		case actionTypes.OTP_FAIL:
			return {
				...state,
				loadingVerify: false,
				verifyError: action.message,
				verifySuccess: false
			};

		case actionTypes.REGISTER_USER_START:
			return {
				...state,
				loadingOtp: true,
				errorOtp: null,
				sendOtp: false
			};

		case actionTypes.REGISTER_USER_OTP_SEND:
			return {
				...state,
				errorOtp: null,
				loadingOtp: false,
				sendOtp: true
			};
		case actionTypes.REGISTER_USER_OTP_FAIL:
			return {
				...state,
				errorOtp: action.message,
				loadingOtp: false,
				sendOtp: false
			};
		case actionTypes.AUTH_START_USER:
			return {
				...state,
				loading: true,
				error: null
			};
		case actionTypes.AUTH_SUCCESS_USER:
			return {
				...state,
				login: true,
				error: null,
				loading: false
			};
		case actionTypes.AUTH_FAIL_USER:
			return {
				...state,
				error: true,
				loading: false
			};
		case actionTypes.AUTH_LOGOUT_USER:
			return {
				...state,
				token: null,
				login: null,
				error: false,
				loading: false,
				otp: null,
				otpToken: null,
				otperror: false
			};
		case actionTypes.LOGIN_OTP_START:
			return {
				...state,
				otpStart: true,
				otpLoading: true
			};
		case actionTypes.LOGIN_OTP_SEND:
			return {
				...state,
				otpStart: false,
				otpLoading: false,
				otpSend: true
			};
		case actionTypes.LOGIN_OTP_FAIL:
			return {
				...state,
				otpStart: false,
				otpLoading: false
			};
		case actionTypes.LOGIN_OTP_VERIFY_START:
			return {
				...state,
				verifyOtp: true,
				verifyOtpLoading: true
			};
		case actionTypes.LOGIN_OTP_VERIFY_SUCCESS:
			return {
				...state,
				verifyOtp: false,
				verifyOtpLoading: false,
				verifyOtpSuccess: true,
				login: true
			};
		case actionTypes.LOGIN_OTP_VERIFY_FAIL:
			return {
				...state,
				verifyOtp: false,
				verifyOtpLoading: false,
				verifyOtpFail: true
			};
		default:
			return state;
	}
};

export default reducer;
