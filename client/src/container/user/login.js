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
import OTP from '../../components/user/otp';
import CircularProgress from '@material-ui/core/CircularProgress';
import Recaptcha from 'react-recaptcha';

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
	const [ otp, setOtp ] = useState(false);
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
	const [ captcha, setCap ] = useState(false);
	const captchaVerify = () => {
		setCap(true);
	};
	return (
		<Container component="main" maxWidth="xs">
			{props.token ? <Redirect to="/" /> : null}
			<CssBaseline />
			{props.otpSend ? <OTP onOtpsubmitHandler={(e) => props.onVerifyOTP(e)} /> : null}
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<AccountCircleIcon />
				</Avatar>
				<Link to="/">
					<img alt="logo" src={logo} />
				</Link>
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
					{!otp ? (
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
					) : null}
					{!otp ? (
						<React.Fragment>
							<p style={{ display: 'inline' }}>
								or Login with {'    '}
								<Button onClick={() => setOtp(true)} variant="contained" color="primary" size="small">
									OTP
								</Button>
							</p>
							<Button
								type="submit"
								fullWidth
								variant="outlined"
								color="primary"
								className={classes.submit}
							>
								Sign In
							</Button>
							<Link to="/admin/login">Admin</Link>
							<Link to="/dealer/login">Dealer</Link>
						</React.Fragment>
					) : null}
				</form>
				{props.otpSendLoading ? <CircularProgress /> : null}
				{props.verifyOtpLoading ? <CircularProgress /> : null}
				{otp ? (
					<React.Fragment>
						<br />
						<Recaptcha verifyCallback={captchaVerify} sitekey="6LdO9NMZAAAAAFlviOTgQnWottGfzmTtf7D-eQ-t" />
						<br />

						{captcha ? (
							<Button onClick={() => props.onOTPsubmit(state.phone)} variant="contained" type="submit">
								Send OTP
							</Button>
						) : null}
						<Button onClick={() => setOtp(false)}>Go back</Button>
					</React.Fragment>
				) : null}
				<Typography component="h4">
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
		loading: state.user.loading,
		otpSendLoading: state.user.otpLoading,
		otpSend: state.user.otpSend,
		verifyOtpLoading: state.user.verifyOtpLoading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSubmitForm: (phone, password) => dispatch(actionCreators.authUSer(phone, password)),
		onOTPsubmit: (phone) => dispatch(actionCreators.loginOTP(phone)),
		onVerifyOTP: (otp) => dispatch(actionCreators.UserOtpVerify(otp))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dealer);
