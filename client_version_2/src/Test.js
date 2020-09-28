import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { Toolbar, ListItem, IconButton, Card, CardContent, TextField, Select } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from './SuperMart.svg';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	paper: {
		height: 500,
		width: 500
	},
	paper1: {
		maxWidth: 400,
		margin: `${theme.spacing(1)}px auto`,
		padding: theme.spacing(2)
	},
	control: {
		padding: theme.spacing(2)
	},
	gridList: {
		width: 500,
		height: 450
	}
}));

const Test = (props) => {
	const [ order, setData ] = useState({
		data: []
	});
	const [ price, setPrice ] = useState();
	const [ count, setCount ] = useState();
	const [ select, setSelect ] = useState();
	const [ address, setAddress ] = useState();
	useEffect(() => {
		let cart = JSON.parse(localStorage.getItem('cart'));
		setData({
			data: cart
		});
		if (cart) {
			const totalArrCount = cart.map((item) => item.count);
			const totalCount = totalArrCount.reduce((a, b) => a + b, 0);
			setCount(totalCount);
			const totalArr = cart.map((item) => item.count * item.price);
			const total = totalArr.reduce((a, b) => a + b, 0);
			setPrice(total);
		}
	}, []);

	//=======================================================================//
	const paymentHandler = async () => {
		const API_URL = 'http://localhost:5050/user/';
		const datas = {
			price: price
		};
		const response = await axios.post('http://localhost:5050/user/order', datas);
		const { data } = response;
		const options = {
			key: 'rzp_test_pD7pyj5JpXOA5a',
			name: 'Your App Name',
			description: 'Some Description',
			order_id: data.id,
			handler: async (response) => {
				try {
					const data = {
						price: price,
						order: localStorage.getItem('cart'),
						address: address,
						token: localStorage.getItem('uToken')
					};
					const paymentId = response.razorpay_payment_id;
					const url = `${API_URL}capture/${paymentId}`;
					const captureResponse = await axios.post(url, data);
					console.log(captureResponse.data);
					props.history.push('/');
				} catch (err) {
					console.log(err);
				}
			},
			theme: {
				color: '#686CFD'
			}
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};
	//=======================================================================//
	const onOrder = () => {
		if (select === 'ONLINE') {
			paymentHandler();
		} else {
			const data = {
				price: price,
				order: localStorage.getItem('cart'),
				address: address,
				token: localStorage.getItem('uToken')
			};
			axios.post('http://localhost:5050/user/ordercod', data).then((res) => {
				console.log(res);
				props.history.push('/');
			});
		}
	};

	//=======================================================================//
	const onAddHandler = (index) => {
		const item = order.data[index];
		item.count = order.data[index].count + 1;
		const arr = order.data;
		arr[index] = item;
		localStorage.setItem('cart', JSON.stringify(arr));
		setData({
			data: arr
		});
		const totalArrCount = arr.map((item) => item.count);
		const totalCount = totalArrCount.reduce((a, b) => a + b, 0);
		setCount(totalCount);
		const totalArr = arr.map((item) => item.count * item.price);
		const total = totalArr.reduce((a, b) => a + b, 0);
		setPrice(total);
	};
	const onRemoveHandler = (index) => {
		const item = order.data[index];
		item.count = order.data[index].count - 1;
		const arr = order.data;
		if (item.count <= 0) {
			arr.splice(index, 1);
			localStorage.setItem('cart', JSON.stringify(arr));
			setData({
				data: arr
			});
		} else {
			arr[index] = item;
			localStorage.setItem('cart', JSON.stringify(arr));
			setData({
				data: arr
			});
		}
		const totalArrCount = arr.map((item) => item.count);
		const totalCount = totalArrCount.reduce((a, b) => a + b, 0);
		setCount(totalCount);
		const totalArr = arr.map((item) => item.count * item.price);
		const total = totalArr.reduce((a, b) => a + b, 0);
		setPrice(total);
	};
	const onSelect = (e) => {
		console.log(e.target.value);
		setSelect(e.target.value);
	};
	const classes = useStyles();
	let button = (
		<Fragment>
			<Link style={{ textDecoration: 'none' }} to="/login">
				<Button className={classes.button}>Login</Button>
			</Link>
			<Link style={{ textDecoration: 'none' }} to="/register">
				<Button className={classes.button}>Register</Button>
			</Link>
		</Fragment>
	);
	if (props.token) {
		button = (
			<Link onClick={() => props.onLogout()} to="/logout">
				<Button className={classes.button}>Logout</Button>
			</Link>
		);
	}
	let cards = <h1>....Add items to use the card</h1>;
	if (order.data) {
		cards = (
			<main>
				<Container style={{ marginTop: '10px' }}>
					<Grid container className={classes.root} spacing={2}>
						<Grid item xs={12}>
							<Grid container justify="center" spacing={5}>
								{' '}
								<Grid key="1" item>
									<div>
										<Paper elevation={3} className={classes.paper}>
											{order.data.map((item, index) => (
												<Paper className={classes.paper1}>
													<Grid container wrap="nowrap" spacing={2}>
														<Grid item>
															<Avatar>
																<img
																	height="100%"
																	width="100%"
																	src={item.image.thumbnail}
																/>
															</Avatar>
														</Grid>
														<Grid item xs>
															<Typography>
																{item.title} X{' '}
																<Typography
																	variant="button"
																	display="inline"
																	color="textSecondary"
																>
																	{item.count}
																</Typography>
															</Typography>
															<Typography>
																₹{item.price}/{item.unit}
															</Typography>
														</Grid>
														<Grid>
															<IconButton onClick={() => onRemoveHandler(index)}>
																<RemoveIcon />
															</IconButton>
														</Grid>
														<Grid>
															<IconButton onClick={() => onAddHandler(index)}>
																<AddIcon />
															</IconButton>
														</Grid>
													</Grid>
												</Paper>
											))}
										</Paper>
									</div>
								</Grid>
								<Grid key="1" item>
									<Paper component="div" elevation={3} className={classes.paper}>
										<Grid>
											<div style={{ margin: 10 }}>
												<Card style={{ marginTop: 10 }}>
													<CardContent>
														<Typography variant="h6">Total Amount : {price}</Typography>
														<Typography style={{ marginTop: 10 }} variant="h5">
															Total Items : {count}
														</Typography>
													</CardContent>
												</Card>
												<Card style={{ marginTop: 10 }}>
													<CardContent>
														<Typography variant="h6">Address</Typography>
														<TextField
															required
															name="address"
															className={classes.form}
															label="Address"
															value={address}
															onChange={(e) => setAddress(e.target.value)}
														/>
													</CardContent>
												</Card>
												<Card style={{ marginTop: 10 }}>
													<CardContent>
														<Typography variant="h6">Mode of payment</Typography>
														<Select onChange={onSelect} style={{ minWidth: 150 }} native>
															<option value="COD">Cash on Delivery</option>
															<option value="ONLINE">Online Payment</option>
														</Select>
													</CardContent>

													<CardContent style={{ margin: 'auto' }}>
														<Button variant="contained" color="primary" onClick={onOrder}>
															ORDER NOW
														</Button>
													</CardContent>
												</Card>
											</div>
										</Grid>
									</Paper>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</main>
		);
	}
	return (
		<Fragment>
			<CssBaseline />
			<AppBar color="transparent" position="relative">
				<Toolbar>
					<Typography variant="h6" color="inherit" noWrap>
						<img alt="logo" src={logo} />
					</Typography>
					<div style={{ marginLeft: 'auto' }}>{button}</div>
				</Toolbar>
			</AppBar>
			{cards}
			<button onClick={paymentHandler}>Pay Now</button>
		</Fragment>
	);
};

export default Test;

// import React, { useState, useEffect } from 'react';
// import { Input } from '@material-ui/core';
// import { Button, Avatar, Paper, Container, Select } from '@material-ui/core/';
// import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
// import axios from 'axios';
// import clsx from 'clsx';

// const Test = (props) => {
// 	const [ cart, setCart ] = useState();
// 	const onChangeHandler = (e) => {
// 		setCart(e.target.value);
// 		console.log(localStorage.getItem('orders').orders);
// 	};
// 	const onSubmit = () => {
// 		const mass = { orders: 'massdaf', order: 'adfa;sd' };
// 		localStorage.setItem('orders', JSON.stringify(mass));
// 		console.log(cart);
// 	};
// 	return (
// 		<div style={{ margin: 'auto' }}>
// 			<input onChange={onChangeHandler} type="text" placeholder="cart" />
// 			<button onClick={onSubmit}>add</button>
// 		</div>
// 	);
// };

// export default Test;
// if (localStorage.getItem('cart')) {
// 	localCart = JSON.parse(localStorage.getItem('cart'));
// 	const mass = Boolean(localCart.find((item) => item._id === cart._id));
// 	console.log(mass);
// } else {
// 	localCart.push(cart);
// 	console.log(localCart);
// 	localStorage.setItem('cart', JSON.stringify(localCart));
// }
