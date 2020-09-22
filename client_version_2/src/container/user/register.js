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
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > * + *': {
			marginLeft: theme.spacing(10)
		}
	},
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
	const [ state, setState ] = useState({ phone: '91', name: '', location: '', password: '', otp: '' });
	const onOtpsubmit = (e) => {
		e.preventDefault();
		console.log(state.otp);
		console.log(state.password);
		props.onOtpsubmitHandler(state.otp, state.password);
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		console.log('He');
		props.onSubmitForm(state.phone, state.name, state.location);
	};
	const onChangeHandeler = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};
	let otp = null;
	if (props.loading) {
		otp = <CircularProgress color="secondary" />;
	}
	let verify = null;
	if (props.loading) {
		verify = (
			<form onSubmit={onOtpsubmit}>
				<TextField
					type="number"
					name="otp"
					value={state.otp}
					onChange={onChangeHandeler}
					required
					label="otp"
				/>
				<TextField
					name="password"
					onChange={onChangeHandeler}
					value={state.password}
					required
					type="password"
					label="password  for your account"
				/>
				<Button type="submit">Verify OTP</Button>
			</form>
		);
	}
	return (
		<Container component="main" maxWidth="xs">
			{props.success ? <Redirect to="/login" /> : null}
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<AccountCircleIcon />
				</Avatar>
				<img alt="" src={logo} />
				{props.otperror ? <Typography>OTP ERROR</Typography> : null}
				{props.error ? <Typography>Server Down Try again after some time</Typography> : null}
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
					{!props.loading ? (
						<Button type="submit" variant="contained" color="primary" className={classes.submit}>
							Send OTP
						</Button>
					) : null}
				</form>
				{verify}
				<br />
				{otp}
				{!props.loading ? (
					<Typography component="h4">
						{' '}
						if you have an account <Link to="/register">Sign in</Link>
					</Typography>
				) : null}
			</div>
			<div className={classes.root} />
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.user.token,
		error: state.user.error,
		loading: state.user.loading,
		otperror: state.user.otperror,
		success: state.user.success
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOtpsubmitHandler: (otp, password) => dispatch(actionCreators.authUserOtpVerify(otp, password)),
		onSubmitForm: (phone, name, location) => dispatch(actionCreators.authUserOtp(phone, name, location))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dealer);
