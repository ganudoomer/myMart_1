import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from './table';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/admin';
import { getDealer } from '../../fetchApi/adminAxios';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	toolbar: {
		paddingRight: 24
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

const Dashboard = (props) => {
	const [ state, setState ] = useState({
		data: null
	});

	useEffect(() => {
		(async function getData() {
			const data = {
				token: localStorage.getItem('aToken')
			};
			const result = await getDealer(data);
			setState({
				data: result.data
			});
		})();
	}, []);
	const classes = useStyles();

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	if (state.data) {
		console.log(state.data);
	}
	const delHandler = (id) => {
		console.log(state.data);
		console.log(id);
		let result = state.data.filter((dealer) => dealer._id !== id);
		console.log(result);
		setState({
			data: result
		});
	};
	const countItemsTrue = (arry) => {
		if (arry) {
			var result = 0;
			for (let x = 0; arry.length - 1 >= x; x++) {
				if (arry[x]['live']) {
					result++;
				}
			}
			return result;
		}
	};
	const countItemsFalse = (arry) => {
		if (arry) {
			var result = 0;
			for (let x = 0; arry.length - 1 >= x; x++) {
				if (arry[x]['live'] === false) {
					result++;
				}
			}
			return result;
		}
	};
	let open = null;
	let close = null;
	if (state.data) {
		open = countItemsTrue(state.data);
		close = countItemsFalse(state.data);
	}
	return (
		<main className={classes.content}>
			<div className={classes.appBarSpacer} />

			<Container maxWidth="lg" className={classes.container}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6} lg={4}>
						<Paper className={fixedHeightPaper}>
							<Typography component="h2" variant="h6" color="primary" gutterBottom>
								Total
							</Typography>
							<Typography component="p" variant="h4">
								{state.data ? state.data.length : 0}
							</Typography>
							<Typography color="textSecondary" className={classes.depositContext}>
								Dealers
							</Typography>
						</Paper>
					</Grid>
					{/* Recent Deposits */}
					<Grid item xs={12} md={4} lg={4}>
						<Paper className={fixedHeightPaper}>
							<Typography component="h2" variant="h6" color="primary" gutterBottom>
								Open
							</Typography>
							<Typography component="p" variant="h4">
								{open}
							</Typography>
							<Typography color="textSecondary" className={classes.depositContext}>
								Dealers
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} md={3} lg={4}>
						<Paper className={fixedHeightPaper}>
							<Typography component="h2" variant="h6" color="primary" gutterBottom>
								Close
							</Typography>
							<Typography component="p" variant="h4">
								{close}
							</Typography>
							<Typography color="textSecondary" className={classes.depositContext}>
								Dealers
							</Typography>
						</Paper>
					</Grid>
				</Grid>
				<Box pt={4} />
				<NavLink to="/admin/dash/add">
					<Button variant="contained" color="primary">
						Add
					</Button>
				</NavLink>
				<br />
				<br />
				{state.data ? <Table data={state.data} del={delHandler} /> : <Typography>Loading....</Typography>}
			</Container>
		</main>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
