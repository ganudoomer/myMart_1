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
	const [ state, setState ] = useState({
		select: '',
		store: null,
		data: null,
		select: null
	});
	const [ open, setSate ] = useState({
		card: null
	});
	const [ count, setCount ] = useState();
	useEffect(() => {
		let cart = JSON.parse(localStorage.getItem('cart'));
		if (cart) {
			const totalArrCount = cart.map((item) => item.count);
			const totalCount = totalArrCount.reduce((a, b) => a + b, 0);
			setCount(totalCount);
		}
		(function getData() {
			axios.get('http://localhost:5050/user/store/').then((res) => {
				setState({
					...state,
					store: res.data
				});
			});
		})();
	}, []);
	let select = null;
	if (state.store) {
		select = state.store.map((data) => <MenuItem value={data.dealer_name}>{data.dealer_name}</MenuItem>);
	}
	const onSelectChange = (e) => {
		console.log(e.target.value);
		if (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).length > 0) {
			let cart = JSON.parse(localStorage.getItem('cart'));
			if (cart[0].dealer_name !== e.target.value) {
				localStorage.removeItem('cart');
				setCount(null);
			}
		}
		setState({
			...state,
			select: e.target.value
		});
		axios.get(`http://localhost:5050/user/items/${e.target.value}`).then((res) => {
			console.log(res.data);
			setState({
				...state,
				select: e.target.value,
				data: res.data[0].products,
				live: res.data[0].live
			});
		});
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
			<Link style={{ textDecoration: 'none' }} onClick={() => props.onLogout()} to="/logout">
				<Button className={classes.button}>Logout</Button>
			</Link>
		);
	}
	const [ cart, setCart ] = useState(false);

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
								<Typography variant="subtitle1">{count}</Typography>
								<img width="30px" src={Shop} />
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
				<Card />
			</div>
		</React.Fragment>
	);
};

export default Home;
