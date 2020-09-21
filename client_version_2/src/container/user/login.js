import React, { useState } from 'react';
import logo from '../../SuperMart.svg';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/user/action';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect, Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: 'black'
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

const Dealer = (props) => {
	const classes = useStyles();
	const [ state, setState ] = useState({ phone: '91', password: '' });
	const onChangeHandeler = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		props.onSubmitForm(state.phone, state.password);
	};

	return (
		<Container component="main" maxWidth="xs">
			{props.token ? <Redirect to="/" /> : null}
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<AccountCircleIcon />
				</Avatar>
				<img alt="logo" src={logo} />
				{props.error ? <Typography>Wrong Password or Username or Server Down</Typography> : null}
				<Typography component="h1" variant="h5">
					Login if you have an account
				</Typography>
				<form className={classes.form} onSubmit={onSubmitHandler}>
					<TextField
						type="number"
						value={state.phone}
						onChange={onChangeHandeler}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="phone"
						label="phone"
						name="phone"
					/>
					<TextField
						value={state.password}
						onChange={onChangeHandeler}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button type="submit" fullWidth variant="outlined" color="primary" className={classes.submit}>
						Sign In
					</Button>
				</form>
				<Typography component="h4">
					{' '}
					if you don't have an account <Link to="/register">Sign up</Link>
				</Typography>
			</div>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.user.login,
		error: state.user.error,
		loading: state.user.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSubmitForm: (phone, password) => dispatch(actionCreators.authUSer(phone, password))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dealer);
