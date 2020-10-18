import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/admin';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import { Route, Switch } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import { Link } from 'react-router-dom';
import Dash from '../../components/admin/dash';
import Settings from '../../components/admin/settings';
import Form from '../../components/admin/from';
import Edit from '../../components/admin/editform';

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
					<a href="/">
						<IconButton onClick={props.logoutHandler} color="inherit">
							<ExitToAppIcon />
						</IconButton>
					</a>
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
						Admin
					</Typography>
					<DesktopWindowsIcon />
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem to="/admin/dash" component={Link} button>
						<ListItemIcon>
							<PeopleIcon style={{ color: '#3f51b5' }} />
						</ListItemIcon>
						<ListItemText primary="Dealers" />
					</ListItem>
					<ListItem to="/admin/dash/setting" component={Link} button>
						<ListItemIcon>
							<ToggleOffIcon style={{ color: '#3f51b5' }} />
						</ListItemIcon>
						<ListItemText primary="Settings" />
					</ListItem>
				</List>
				<Divider />
			</Drawer>
			<div className={classes.appBarSpacer} />
			<Switch>
				<Route path="/admin/dash/dealer/:id" component={Edit} />
				<Route path="/admin/dash/setting" exact component={Settings} />
				<Route path="/admin/dash/add" exact component={Form} />
				<Route path="/admin/dash" component={Dash} />
			</Switch>
		</div>
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
		logoutHandler: () => dispatch(actionCreators.logout)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
