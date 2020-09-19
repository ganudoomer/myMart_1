import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Button, Paper, Container } from '@material-ui/core/';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
	paper: {
		margin: 100,
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	},
	fixedHeight: {
		height: '100%'
	},
	form: {
		margin: theme.spacing(1),
		width: '100ch'
	}
}));

const Add = (props) => {
	const [ state, setState ] = useState({
		dealer_name: ' ',
		username: ' ',
		phone: '',
		email: '',
		address: '',
		password: ''
	});
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	const onChangeHandeler = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		const data = {
			token: localStorage.getItem('aToken'),
			dealer_name: state.dealer_name,
			username: state.username,
			phone: state.phone,
			email: state.email,
			address: state.address,
			password: state.password
		};
		axios
			.post('http://localhost:5050/admin/dealer', data)
			.then((res) => {
				console.log(res);
				props.history.push('/admin/dash/');
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<Container>
			<Paper className={fixedHeightPaper}>
				<h1>Add Form</h1>
				<form onSubmit={onSubmitHandler} autoComplete="off">
					<TextField
						name="username"
						value={state.username}
						onChange={onChangeHandeler}
						className={classes.form}
						label="Username"
					/>
					<TextField
						onChange={onChangeHandeler}
						name="password"
						value={state.password}
						type="password"
						className={classes.form}
						label="Password"
					/>
					<TextField
						onChange={onChangeHandeler}
						name="address"
						value={state.address}
						className={classes.form}
						label="Address"
					/>
					<TextField
						onChange={onChangeHandeler}
						name="dealer_name"
						value={state.dealer_name}
						className={classes.form}
						label="Dealer_name"
					/>
					<TextField
						onChange={onChangeHandeler}
						name="phone"
						value={state.phone}
						className={classes.form}
						type="number"
						label="Phone"
					/>
					<TextField
						onChange={onChangeHandeler}
						name="email"
						value={state.email}
						className={classes.form}
						type="email"
						label="Email"
					/>
					<br />
					<br />
					<Button type="submit" variant="contained" color="primary">
						Add Dealer
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default Add;
