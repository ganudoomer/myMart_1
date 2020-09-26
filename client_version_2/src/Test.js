import React, { useState, useEffect } from 'react';
import { Input } from '@material-ui/core';
import { Button, Avatar, Paper, Container, Select } from '@material-ui/core/';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import clsx from 'clsx';

const Test = (props) => {
	const [ cart, setCart ] = useState();
	const onChangeHandler = (e) => {
		setCart(e.target.value);
		console.log(localStorage.getItem('orders').orders);
	};
	const onSubmit = () => {
		const mass = { orders: 'massdaf', order: 'adfa;sd' };
		localStorage.setItem('orders', JSON.stringify(mass));
		console.log(cart);
	};
	return (
		<div style={{ margin: 'auto' }}>
			<input onChange={onChangeHandler} type="text" placeholder="cart" />
			<button onClick={onSubmit}>add</button>
		</div>
	);
};

export default Test;
