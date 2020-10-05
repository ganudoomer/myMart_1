import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from './1test';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import logo from './SuperMart.svg';
import axios from 'axios';
import { connect } from 'react-redux';
import Shop from './Buy.svg';
import IconButton from '@material-ui/core/IconButton';
import DescriptionIcon from '@material-ui/icons/Description';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: 'auto',
		marginLeft: 125,
		minWidth: 300
	},
	button: {
		marginLeft: 20
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	icon: {
		marginRight: theme.spacing(2)
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6)
	},
	heroButtons: {
		marginTop: theme.spacing(4)
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8)
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	cardMedia: {
		paddingTop: '56.25%' // 16:9
	},
	cardContent: {
		flexGrow: 1
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6)
	}
}));

const Home = (props) => {
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
			<Link style={{ textDecoration: 'none' }} onClick={() => props.onLogout()} to="/logout">
				<Button className={classes.button}>Logout</Button>
			</Link>
		);
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar color="transparent" position="relative">
				<Toolbar>
					<Typography variant="h6" color="inherit" noWrap>
						<img alt="logo" src={logo} />
					</Typography>
					<div style={{ marginLeft: 'auto' }}>
						<Link to="/cart" style={{ textDecoration: 'none' }}>
							<IconButton>
								<Typography>Live Orders</Typography>
								<ShoppingBasketIcon style={{ fontSize: 30 }} />
							</IconButton>
						</Link>
						<Link to="/cart" style={{ textDecoration: 'none' }}>
							<IconButton>
								<DescriptionIcon style={{ fontSize: 30 }} />
							</IconButton>
						</Link>
						{button}
					</div>
				</Toolbar>
			</AppBar>
			<div style={{ width: '50px', marginLeft: '25%', marginTop: '2%' }}>
				<Typography>Live Order</Typography>
				<Card />
			</div>
		</React.Fragment>
	);
};

export default Home;
