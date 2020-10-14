import axios from 'axios';

const uri = 'https://api.sreeganesh.co/admin/';

export const getDealer = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}dealers`, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
export const submitEdit = (params, data) => {
	return new Promise((resolve, reject) => {
		axios
			.put(`${uri}dealers/${params}`, data)
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

export const getSingleDealer = (id, data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}dealers/${id}`, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const submit = (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}dealer`, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getUnit = (data, url) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${uri}${url}`, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const deleteDealer = (id, token) => {
	return new Promise((resolve, reject) => {
		axios
			.delete(`${uri}dealers/${id}`, {
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
