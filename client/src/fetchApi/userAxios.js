import axios from 'axios';

const uri = 'https://api.sreeganesh.co/user/';

export const getStore = () => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${uri}/store/`)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getItems = (e) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${uri}/items/${e.target.value}`)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getUserInfo = (token) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}/userinfo`, { token: token })
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getOrderId = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}/order`, data)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const capturePayment = (id, data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}/capture/${id}`, data)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getLiveInfo = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}/live`, data)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const placeOrder = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}/ordercod`, data)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getOrders = (token) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}/orders`, token)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

//==============LOGIN AND SIGN UP===========================//

export const authUser = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}/login`, data)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const checkAuth = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}/auth`, data)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const otpLogin = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}/login/otp`, data)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
export const otpVerify = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}/login/verify`, data)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const register = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}/register`, data)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const registerVerify = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}/register/auth`, data)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
