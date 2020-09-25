import React, { useState } from 'react';
import { Input } from '@material-ui/core';
import axios from 'axios';
const Logout = () => {
	const [ file, setFile ] = useState({
		select: null
	});
	const onChangeHandler = (event) => {
		console.log(event.target.files[0]);
		setFile({
			select: event.target.files[0]
		});
	};
	const onsubmit = () => {
		const data = new FormData();
		data.append('file', file.select);
		axios.post('http://localhost:5050/upload', data).then((res) => {
			console.log(res.data);
		});
	};
	return (
		<div>
			<Input type="file" name="file" onChange={onChangeHandler} />
			<button onClick={onsubmit} />
		</div>
	);
};

export default Logout;
