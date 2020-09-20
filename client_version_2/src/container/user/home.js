import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Link from '@material-ui/core/Link';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import logo from '../../SuperMart.svg';
import axios from 'axios';
import Model from '../../components/user/model';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: 'auto',
		marginLeft: 125,
		minWidth: 300
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

const cards = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

export default function Album() {
	const [ state, setState ] = useState({
		select: '',
		store: null,
		data: null
	});
	useEffect(() => {
		axios.get('http://localhost:5050/user/store/').then((res) => {
			setState({
				...state,
				store: res.data
			});
		});
	}, []);
	let select = null;
	if (state.store) {
		select = state.store.map((data) => <MenuItem value={data.dealer_name}>{data.dealer_name}</MenuItem>);
	}
	const onSelectChange = (e) => {
		console.log(e.target.value);
		setState({
			...state,
			select: e.target.value
		});
		axios.get(`http://localhost:5050/user/items/${e.target.value}`).then((res) => {
			setState({
				...state,
				select: e.target.value,
				data: res.data[0].products
			});
		});
	};
	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar color="transparent" position="relative">
				<Toolbar>
					<Typography variant="h6" color="inherit" noWrap>
						<img src={logo} />
					</Typography>
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
						<div className={classes.heroButtons} />
					</Container>
				</div>
				<Container className={classes.cardGrid} maxWidth="md">
					{/* End hero unit */}
					<Grid container spacing={4}>
						{state.data ? (
							state.data.map((card) => (
								<Grid item key={card} xs={12} sm={6} md={4}>
									<Card className={classes.card}>
										<CardMedia
											className={classes.cardMedia}
											image={card.image}
											title="Image title"
										/>
										<CardContent className={classes.cardContent}>
											<Typography gutterBottom variant="h5" component="h2">
												{card.name}
											</Typography>
											<Typography>({card.title})</Typography>
											<Typography>{card.description}</Typography>
										</CardContent>
										<CardActions>
											<Model />
											<Button size="small" color="primary">
												₹{card.price}/{card.unit}
											</Button>
											<Button size="small" color="primary">
												{card.cat}
											</Button>
											<Button size="small" color="primary">
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
}
