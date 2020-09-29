import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import PageviewIcon from '@material-ui/icons/Pageview';
import axios from 'axios';
import Model from './ItemModel';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover
		}
	}
}))(TableRow);

const useStyles = makeStyles({
	table: {
		minWidth: 700
	},
	large: {
		width: 100,
		height: 100
	}
});

const Test = () => {
	const [ state, setState ] = useState({ data: null });
	useEffect(() => {
		axios.post('http://localhost:5050/dealer/orders', { token: localStorage.getItem('dToken') }).then((res) => {
			console.log(res.data);
			setState({ data: res.data });
		});
	}, []);

	const classes = useStyles();
	let table = null;

	if (state.data) {
		table = state.data.map((order) => {
			const item = order.order;
			const totalArr = item.map((items) => items.count);
			const total = totalArr.reduce((a, b) => a + b, 0);

			return (
				<StyledTableRow>
					<StyledTableCell align="left">{order._id}</StyledTableCell>
					<StyledTableCell align="left">₹ {order.price}</StyledTableCell>
					<StyledTableCell align="left">{order.address}</StyledTableCell>
					<StyledTableCell align="left">
						Name:- {order.user.name} <br /> Phone :- {order.user.phone}
					</StyledTableCell>
					<StyledTableCell align="left">{order.payment.mode}</StyledTableCell>
					<StyledTableCell align="left">{order.status}</StyledTableCell>
					<StyledTableCell align="left">{total} Items</StyledTableCell>
					<StyledTableCell align="right">
						<IconButton aria-label="delete">
							<Model data={item} />
						</IconButton>
					</StyledTableCell>
				</StyledTableRow>
			);
		});
	}

	return (
		<TableContainer style={{ marginTop: '80px' }} component={Paper}>
			<Typography component="h2" variant="h6" color="secondary" gutterBottom>
				Orders
			</Typography>
			<Table className={classes.table} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell align="left">ID</StyledTableCell>
						<StyledTableCell align="left">Price</StyledTableCell>
						<StyledTableCell align="left">Address</StyledTableCell>
						<StyledTableCell align="left">Contact Details </StyledTableCell>
						<StyledTableCell align="left">Mode of payment </StyledTableCell>
						<StyledTableCell align="left">Status</StyledTableCell>
						<StyledTableCell align="left">No.</StyledTableCell>
						<StyledTableCell align="right">View</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>{table}</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Test;
