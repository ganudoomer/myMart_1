import React, { useEffect, useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
import logo from '../../SuperMart.svg';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import * as actionCreators from './../../store/actions/user/action';
import axios from 'axios';
import { connect } from 'react-redux';
import CancelIcon from '@material-ui/icons/Cancel';
import OrderHistory from '../../components/user/Card';
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

const History = (props) => {
	props.checkAuth();
	const classes = useStyles();
	let button = <Redirect to="/" />;
	if (props.token) {
		button = (
			<Link style={{ textDecoration: 'none' }} onClick={() => props.onLogout()} to="/logout">
				<Button className={classes.button}>Logout</Button>
			</Link>
		);
	}

	return (
		<Fragment>
			<CssBaseline />
			<AppBar color="transparent" position="relative">
				<Toolbar>
					<Typography variant="h6" color="inherit" noWrap>
						<Link to="/">
							<img alt="logo" src={logo} />
						</Link>
					</Typography>
					<div style={{ marginLeft: 'auto' }}>{button}</div>
				</Toolbar>
			</AppBar>
			<div style={{ width: '50px', marginLeft: '25%', marginTop: '2%' }}>
				<Typography> Order History</Typography>
				<OrderHistory />
			</div>
		</Fragment>
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
		onLogout: () => dispatch(actionCreators.logoutUser()),
		checkAuth: () => dispatch(actionCreators.check())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
