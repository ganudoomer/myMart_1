import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
import logo from '../../SuperMart.svg';
import axios from 'axios';
import Model from '../../components/user/model';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/user/action';
import Shop from '../../Buy.svg';
import IconButton from '@material-ui/core/IconButton';

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
	props.checkAuth();
	useEffect(() => {
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
		if (localStorage.getItem('cart')) {
			let cart = JSON.parse(localStorage.getItem('cart'));
			if (cart[0].dealer_name !== e.target.value) {
				localStorage.removeItem('cart');
			}
		}
		setState({
			...state,
			select: e.target.value
		});
		axios.get(`http://localhost:5050/user/items/${e.target.value}`).then((res) => {
			console.log(res.data[0].products);
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
			<Link onClick={() => props.onLogout()} to="/logout">
				<Button className={classes.button}>Logout</Button>
			</Link>
		);
	}
	const onCartClick = (cart) => {
		let localCart = [];
		if (localStorage.getItem('cart')) {
			localCart = JSON.parse(localStorage.getItem('cart'));
			const exist = Boolean(localCart.find((item) => item._id === cart._id));
			if (!exist) {
				cart.count = 1;
				cart.dealer_name = state.select;
				localCart.push(cart);
				localStorage.removeItem('cart');
				localStorage.setItem('cart', JSON.stringify(localCart));
				console.log(localCart);
			}
		} else {
			cart.dealer_name = state.select;
			cart.count = 1;
			localCart.push(cart);
			localStorage.setItem('cart', JSON.stringify(localCart));
		}
	};
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar color="transparent" position="relative">
				<Toolbar>
					<Typography variant="h6" color="inherit" noWrap>
						<img alt="logo" src={logo} />
					</Typography>
					<div style={{ marginLeft: 'auto' }}>
						<IconButton>
							<img width="30px" src={Shop} />
						</IconButton>
						{button}
					</div>
				</Toolbar>
			</AppBar>
			<main>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<Container maxWidth="sm">
						<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
							My Mart
						</Typography>
						<Typography variant="h5" align="center" color="textSecondary" paragraph>
							Order from your nearest supermarket
						</Typography>
						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Select your mart </InputLabel>
							<Select
								labelId="demo-simple-select-label"
								onChange={onSelectChange}
								value={state.select}
								id="demo-simple-select"
							>
								{select}
							</Select>
						</FormControl>
						<div className={classes.heroButtons}>
							{state.data ? state.live ? (
								<Button variant="contained" color="primary">
									Open
								</Button>
							) : (
								<Button variant="contained">Closed</Button>
							) : null}
						</div>
					</Container>
				</div>
				<Container className={classes.cardGrid} maxWidth="md">
					{/* End hero unit */}
					<Grid container spacing={4}>
						{state.data ? (
							state.data.map((card) => (
								<Grid item key={card} xs={12} sm={6} md={4}>
									<Card className={classes.card}>
										<Model view data={card}>
											<CardMedia
												className={classes.cardMedia}
												image={card.image.thumbnail}
												title="Image title"
											/>
											<CardContent className={classes.cardContent}>
												<Typography gutterBottom variant="h5" component="h2">
													{card.name}
													<Typography style={{ display: 'inline ', marginLeft: '40%' }}>
														₹{card.price}/{card.unit}
													</Typography>
												</Typography>
												<Typography>({card.title})</Typography>
												<Typography variant="caption">{card.description}</Typography>
											</CardContent>
										</Model>

										<Divider className={classes.divider} light />
										<CardActions>
											<Model data={card} />
											<Button
												style={{
													borderRadius: 30,
													backgroundColor: '#2FEF92',
													padding: '15px 15px',
													fontSize: '10px',
													marginLeft: 20
												}}
												variant="contained"
											>
												{card.cat}
											</Button>
											<Button
												onClick={() => onCartClick(card)}
												style={{
													borderRadius: 35,
													backgroundColor: '#2FEF92',
													padding: '18px 36px',
													fontSize: '10px',
													marginLeft: 20
												}}
												variant="contained"
											>
												<AddShoppingCartIcon />
											</Button>
										</CardActions>
									</Card>
								</Grid>
							))
						) : (
							<Typography>Select a store</Typography>
						)}
					</Grid>
				</Container>
			</main>
		</React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
