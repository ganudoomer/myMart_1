import React, { useState } from 'react';
import logo from '../../SuperMart.svg';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/user/action';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
	const [ state, setState ] = useState({ phone: '91', name: '', location: '' });

	const onSubmitHandler = (e) => {
		e.preventDefault();
		console.log('He');
		props.onSubmitForm(state.username, state.password);
	};
	const onChangeHandeler = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};

	return (
		<Container component="main" maxWidth="xs">
			{props.token ? <Redirect to="/dealer/dash" /> : null}
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<AccountCircleIcon />
				</Avatar>
				<img src={logo} />
				{props.error ? <Typography>Wrong Password or Username or Server Down</Typography> : null}
				<Typography component="h1" variant="h5">
					Register with your phone number
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
						label="Phone"
						name="phone"
					/>
					<TextField
						value={state.name}
						onChange={onChangeHandeler}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="name"
						label="Name"
						id="name"
					/>
					<TextField
						value={state.location}
						onChange={onChangeHandeler}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="location"
						label="Location"
						id="name"
					/>
					<Button type="submit" variant="contained" color="primary" className={classes.submit}>
						Send OTP
					</Button>
				</form>
				<Typography component="h4">
					{' '}
					if you have an account <Link to="/register">Sign in</Link>
				</Typography>
			</div>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.user.token,
		error: state.user.error,
		loading: state.user.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSubmitForm: (userame, password) => dispatch(actionCreators.authUser(userame, password))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dealer);
