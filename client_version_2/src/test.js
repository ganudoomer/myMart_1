import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Container, Select, Paper, Checkbox, makeStyles, Button } from '@material-ui/core';
import axios from 'axios';

const Settings = () => {
	const [ state, setState ] = useState({ data: null });
	useEffect(() => {
		axios.post('http://localhost:5050/dealer/orders', { token: localStorage.getItem('dToken') }).then((res) => {
			console.log(res.data);
			setState({ data: res.data });
		});
	}, []);
	let name = (
		<div>
			<h1>Loading......</h1>
		</div>
	);
	if (state.data) {
	}

	return <div>{name}</div>;
};

export default Settings;
