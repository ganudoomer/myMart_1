import React, { useState } from 'react';
import logo from '../../../SuperMart.svg';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/admin';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

const Admin = (props) => {
	const classes = useStyles();
	const [ state, setState ] = useState({ username: '', password: '' });
	const onUsernameChange = (e) => {
		setState({ username: e.target.value, password: state.password });
	};
	const onPasswordChange = (e) => {
		setState({ username: state.username, password: e.target.value });
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		props.onSubmitForm(state.username, state.password);
	};

	return (
		<Container component="main" maxWidth="xs">
			{props.token ? <Redirect to="/admin/dash" /> : null}
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<img alt="logo" src={logo} />
				{props.error ? <Typography>Wrong Password or Username</Typography> : null}
				<Typography component="h1" variant="h5">
					Admin Panel
				</Typography>
				<form className={classes.form} onSubmit={onSubmitHandler}>
					<TextField
						value={state.username}
						onChange={onUsernameChange}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="Username"
						label="Username"
						name="Username"
						autoComplete="Username"
						autoFocus
					/>
					<TextField
						value={state.password}
						onChange={onPasswordChange}
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
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Sign In
					</Button>
				</form>
			</div>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.admin.token,
		error: state.admin.error,
		loading: state.admin.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSubmitForm: (userame, password) => dispatch(actionCreators.auth(userame, password))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
