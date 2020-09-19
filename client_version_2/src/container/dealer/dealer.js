import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/dealer/action';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
	AppBar
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import { Route, Switch, NavLink } from 'react-router-dom';
import PeopleIcon from '@material-ui/icons/People';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import { Link } from 'react-router-dom';
import Dash from '../../components/dealer/Dash';
import ProductForm from '../../components/dealer/ProductForm';
const drawerWidth = 240;
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
		flexGrow: 1
	},
	drawerPaper: {
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
	}
}));

const Admin = (props) => {
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
					<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
						Dashboard
					</Typography>
					<IconButton onClick={props.logoutHandler} color="inherit">
						<a href="/admin/logout">
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
					<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
						Dealer Panel
					</Typography>
					<DesktopWindowsIcon />
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button>
						<ListItemIcon>
							<Link to="/admin/dash">
								<StorefrontIcon />
							</Link>
						</ListItemIcon>
						<ListItemText primary="Products" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<Link to="/admin/dash/setting">
								<ToggleOffIcon />
							</Link>
						</ListItemIcon>
						<ListItemText primary="Settings" />
					</ListItem>
				</List>
				<Divider />
			</Drawer>
			<div className={classes.appBarSpacer} />
			<Switch>
				<Route path="/dealer/dash/product/add" exact component={ProductForm} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
