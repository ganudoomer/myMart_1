import React, { useEffect, useState } from 'react';
import {
	IconButton,
	Typography,
	Paper,
	TableRow,
	TableHead,
	TableContainer,
	Button,
	TableCell,
	Table,
	TableBody,
	Select
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import * as Axios from '../../fetchApi/dealerAxios';
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
		minWidth: 700,
		overflowY: 'auto'
	},
	large: {
		width: 100,
		height: 100
	},
	paper: {
		overflowY: 'auto'
	}
});

const Test = () => {
	const [ state, setState ] = useState({ data: null });
	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		Axios.getAllOrder({ token: localStorage.getItem('dToken') }).then((res) => {
			console.log(res.data);
			setState({ data: res.data });
		});
	};

	const handleChangeSubmit = (value, id) => {
		const data = {
			token: localStorage.getItem('dToken'),
			status: value,
			id: id
		};
		Axios.changeOrderStatus(data).then(() => {
			alert('Status Changed');
		});

		console.log(value, id);
	};

	const classes = useStyles();
	let table = null;

	if (state.data) {
		table = state.data.map((order) => {
			const item = order.order;
			const totalArr = item.map((items) => items.count);
			const total = totalArr.reduce((a, b) => a + b, 0);
			const date = new Date(order.createdOn);
			let value = null;

			return (
				<StyledTableRow>
					<StyledTableCell align="left">{date.toLocaleTimeString()}</StyledTableCell>
					<StyledTableCell align="left">₹ {order.price}</StyledTableCell>
					<StyledTableCell align="left">{order.address}</StyledTableCell>
					<StyledTableCell align="left">
						Name:- {order.user.name} <br /> Phone :- {order.user.phone}
					</StyledTableCell>
					<StyledTableCell align="left">{order.payment.mode}</StyledTableCell>
					<StyledTableCell align="left">
						<Select
							native
							onChange={(e) => {
								value = e.target.value;
							}}
						>
							<option value={order.status}>{order.status}</option>
							{order.status !== 'Rejected' ? <option value="Rejected">Rejected</option> : null}
							{order.status !== 'Pending' ? <option value="Pending">Pending</option> : null}
							{order.status !== 'Confrimed' ? <option value="Confrimed">Confrimed</option> : null}
							{order.status !== 'Packing' ? <option value="Packing">Packing</option> : null}
							{order.status !== 'On the way' ? <option value="On the Way">On the Way</option> : null}
							{order.status !== 'Delivered' ? <option value="Delivered">Delivered</option> : null}
						</Select>
						<Button onClick={() => handleChangeSubmit(value, order._id)}>Change</Button>
					</StyledTableCell>
					<StyledTableCell align="left">{total} Items</StyledTableCell>
					<StyledTableCell align="right">
						<IconButton aria-label="delete">
							<Model data={item} orderId={order._id} getData={getData} />
						</IconButton>
					</StyledTableCell>
				</StyledTableRow>
			);
		});
	}

	return (
		<TableContainer style={{ marginTop: '80px' }} className={classes.paper} component={Paper}>
			<Typography component="h2" variant="h6" color="secondary" gutterBottom>
				Orders
			</Typography>
			<Table className={classes.table} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell align="left">Ordered on </StyledTableCell>
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
