import axios from 'axios';

const uri = 'https://api.sreeganesh.co/dealer/';

export const getAllProducts = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}products`, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const upload = (data, config) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}upload`, data, config)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getSingelProduct = (params, data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}productsingle/${params}`, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
export const getUnit = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}unit`, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const submitEdit = (id, data) => {
	return new Promise((resolve, reject) => {
		axios
			.put(`${uri}product/${id}`, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const rejectItem = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.put(`${uri}item`, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getAllOrder = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}orders`, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const changeOrderStatus = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.put(`${uri}orders`, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const submitProduct = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}product`, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const deleteItem = (id, token) => {
	return new Promise((resolve, reject) => {
		axios
			.delete(`${uri}product/${id}`, {
				headers: {
					authorization: `Brearer ${token}`
				}
			})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const editSettings = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.put(`${uri}settings`, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getSettings = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}settings`, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const login = (data, url) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}/${url}`, data)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
