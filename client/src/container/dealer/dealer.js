import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/dealer/action';
import clsx from 'clsx';
import EditForm from '../../components/dealer/editform';
import { makeStyles } from '@material-ui/core/styles';
import Setting from '../../components/dealer/setting';
import {
	ListItemText,
	ListItemIcon,
	ListItem,
	IconButton,
	Divider,
	Typography,
	List,
	Toolbar,
	CssBaseline,
	Drawer,
	AppBar,
	Avatar
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import { Link, Route, Switch } from 'react-router-dom';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import Dash from '../../components/dealer/Dash';
import ProductForm from '../../components/dealer/ProductForm';
import Settings from '../../components/admin/settings';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Orders from '../../components/dealer/Orders';
import * as Axios from '../../fetchApi/dealerAxios';

const drawerWidth = 240;

const Dealer = (props) => {
	useEffect(() => {
		(async function getData() {
			const data = {
				token: localStorage.getItem('dToken')
			};
			Axios.getAllProducts(data).then((res) => {
				console.log(res.data[0]);
				const color = invertColor(res.data[0].color);
				function invertColor(hex) {
					if (hex.indexOf('#') === 0) {
						hex = hex.slice(1);
					}
					// convert 3-digit hex to 6-digits.
					if (hex.length === 3) {
						hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
					}
					if (hex.length !== 6) {
						throw new Error('Invalid HEX color.');
					}
					// invert color components
					var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
						g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
						b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
					// pad each with zeros and return
					return '#' + padZero(r) + padZero(g) + padZero(b);
				}
				function padZero(str, len) {
					len = len || 2;
					var zeros = new Array(len).join('0');
					return (zeros + str).slice(-len);
				}
				setDealer({
					color: res.data[0].color,
					font: color,
					name: res.data[0].dealer_name,
					image: res.data[0].image.thumbnail
				});
			});
		})();
	}, []);

	const [ dealer, setDealer ] = useState({
		color: '',
		name: '',
		image: ''
	});
	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex'
		},
		toolbar: {
			paddingRight: 24 // keep right padding when drawer closed
		},
		toolbarIcon: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: '0 8px',
			...theme.mixins.toolbar
		},
		appBar: {
			backgroundColor: dealer.color,
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create([ 'width', 'margin' ], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			})
		},
		appBarShift: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create([ 'width', 'margin' ], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen
			})
		},
		menuButton: {
			marginRight: 36
		},
		menuButtonHidden: {
			display: 'none'
		},
		title: {
			color: dealer.font,
			flexGrow: 1
		},
		drawerPaper: {
			backgroundColor: dealer.color,
			height: '50rem',
			position: 'relative',
			whiteSpace: 'nowrap',
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen
			})
		},
		drawerPaperClose: {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9)
			}
		},
		appBarSpacer: theme.mixins.toolbar,
		content: {
			flexGrow: 1,
			height: '100vh',
			overflow: 'auto'
		},
		container: {
			paddingTop: theme.spacing(4),
			paddingBottom: theme.spacing(4)
		},
		paper: {
			padding: theme.spacing(2),
			display: 'flex',
			overflow: 'auto',
			flexDirection: 'column'
		},
		fixedHeight: {
			height: 150
		},
		large: {
			width: theme.spacing(8),
			height: theme.spacing(8)
		}
	}));

	const classes = useStyles();
	const [ open, setOpen ] = React.useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
					>
						<MenuIcon />
					</IconButton>
					<Typography component="h1" variant="h6" noWrap className={classes.title}>
						Dashboard
					</Typography>
					<IconButton onClick={props.logoutHandler} color="inherit">
						<a href="/">
							<ExitToAppIcon />
						</a>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<Avatar className={classes.large}>
						<img height="100%" width="100%" src={dealer.image} />
					</Avatar>
					<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} />
					<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
						{dealer.name}
					</Typography>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem component={Link} to="/dealer/dash" button>
						<ListItemIcon>
							<StorefrontIcon style={{ color: dealer.font }} />
						</ListItemIcon>
						<ListItemText primary="Products" style={{ color: dealer.font }} />
					</ListItem>
					<ListItem component={Link} to="/dealer/dash/orders" style={{ color: dealer.font }} button>
						<ListItemIcon>
							<AddShoppingCartIcon style={{ color: dealer.font }} />
						</ListItemIcon>
						<ListItemText primary="Orders" />
					</ListItem>

					<ListItem style={{ color: dealer.font }} component={Link} to="/dealer/dash/setting" button>
						<ListItemIcon>
							<ToggleOffIcon style={{ color: dealer.font }} />
						</ListItemIcon>
						<ListItemText primary="Settings" />
					</ListItem>
				</List>
				<Divider />
			</Drawer>

			<div className={classes.appBarSpacer} />
			<Switch>
				<Route path="/dealer/dash/product/add" exact component={ProductForm} />
				<Route path="/dealer/dash/product/:id" component={EditForm} />
				<Route path="/dealer/dash/orders" component={Orders} />
				<Route path="/dealer/dash/setting" component={Setting} />
				<Route path="/dealer/dash" component={Dash} />
			</Switch>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		token: state.dealer.token,
		error: state.dealer.error,
		loading: state.dealer.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logoutHandler: () => dispatch(actionCreators.logoutDealer)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dealer);
