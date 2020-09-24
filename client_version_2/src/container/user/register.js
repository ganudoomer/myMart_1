import React, { useState } from 'react';
import logo from '../../SuperMart.svg';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/user/register';
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
import Otp from '../../components/user/otp';

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
		props.onSubmitForm(state.phone, state.name, state.location, state.password);
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
	if (props.sendOtp) {
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
				<Button type="submit">Verify OTP</Button>
			</form>
		);
	}
	console.log('====================================');
	console.log(props.verifyError + ' ' + props.verifySuccess + ' ' + props.loadingVerify);
	console.log('====================================');
	return (
		<Container component="main" maxWidth="xs">
			{props.success ? <Redirect to="/login" /> : null}
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<AccountCircleIcon />
				</Avatar>
				<img alt="" src={logo} />
				{props.errorOtp ? <Typography>{props.errorOtp}</Typography> : null}
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
					<TextField
						name="password"
						onChange={onChangeHandeler}
						value={state.password}
						required
						variant="outlined"
						margin="normal"
						required
						fullWidth
						type="password"
						label="password  for your account"
					/>
					{props.loadingOtp ? <h1>Sending OTP </h1> : null}
					{!props.loadingOtp ? (
						<Button type="submit" variant="contained" color="primary" className={classes.submit}>
							Send OTP
						</Button>
					) : null}
				</form>
				<br />

				{props.sendOtp ? <Otp onOtpsubmitHandler={(e) => props.verifyOTP(e)} view /> : null}
				{!props.loadingOtp ? (
					<Typography component="h4">
						{' '}
						if you have an account <Link to="/login">Sign in</Link>
					</Typography>
				) : null}
			</div>

			<div className={classes.root} />
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		errorOtp: state.user.errorOtp,
		loadingOtp: state.user.loadingOtp,
		sendOtp: state.user.sendOtp,
		loadingVerify: state.user.loadingVerify,
		verifyError: state.user.verifyError,
		verifySuccess: state.user.verifySuccess
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		verifyOTP: (otp) => dispatch(actionCreators.UserOtpVerify(otp)),
		onSubmitForm: (phone, name, location, password) =>
			dispatch(actionCreators.register(phone, name, location, password))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dealer);
