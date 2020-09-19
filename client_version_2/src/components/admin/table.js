import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
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

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData(
		'Frozen yoghurt',
		159,
		6.0,
		<IconButton aria-label="delete">
			<DeleteIcon />
		</IconButton>,
		<IconButton aria-label="delete">
			<EditIcon />
		</IconButton>
	),
	createData(
		'Ice cream sandwich',
		237,
		9.0,
		<IconButton aria-label="delete">
			<DeleteIcon />
		</IconButton>,
		<IconButton aria-label="delete">
			<EditIcon />
		</IconButton>
	),
	createData(
		'Eclair',
		262,
		16.0,
		<IconButton aria-label="delete">
			<DeleteIcon />
		</IconButton>,
		<IconButton aria-label="delete">
			<EditIcon />
		</IconButton>
	),
	createData(
		'Cupcake',
		305,
		3.7,
		<IconButton aria-label="delete">
			<DeleteIcon />
		</IconButton>,
		<IconButton aria-label="delete">
			<EditIcon />
		</IconButton>
	),
	createData(
		'Gingerbread',
		356,
		16.0,
		<IconButton aria-label="delete">
			<DeleteIcon />
		</IconButton>,
		<IconButton aria-label="delete">
			<EditIcon />
		</IconButton>
	)
];

const useStyles = makeStyles({
	table: {
		minWidth: 700
	}
});

const Tables = (props) => {
	const onEditHandler = (id) => {
		console.log('yess');
		props.history.push(`/dealer/products/${id}`);
	};
	const onDeleteHandler = (id) => {
		const token = localStorage.getItem('aToken');
		axios
			.delete(`http://localhost:5050/admin/dealers/${id}`, {
				headers: {
					authorization: `Brearer ${token}`
				}
			})
			.then((res) => {
				props.del(id);
				console.log(res);
			});
	};

	const classes = useStyles();
	console.log(props.data + '{Tabele');
	let table = null;
	table = props.data.map((data) => (
		<StyledTableRow key={data._id}>
			<StyledTableCell align="left">{data.dealer_name}</StyledTableCell>
			<StyledTableCell align="right">{data.username}</StyledTableCell>
			<StyledTableCell align="right">{data.address}</StyledTableCell>
			<StyledTableCell align="right">{data.phone}</StyledTableCell>
			<StyledTableCell align="right">{data.live ? 'live' : 'close'}</StyledTableCell>
			<StyledTableCell align="right">
				<IconButton onClick={() => onDeleteHandler(data._id)} aria-label="delete">
					<DeleteIcon />
				</IconButton>
			</StyledTableCell>
			<StyledTableCell align="right">
				<IconButton onClick={() => onEditHandler(data._id)} aria-label="delete">
					<EditIcon />
				</IconButton>
			</StyledTableCell>
		</StyledTableRow>
	));

	return (
		<TableContainer component={Paper}>
			<Typography component="h2" variant="h6" color="secondary" gutterBottom>
				All Dealers
			</Typography>
			<Table className={classes.table} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Dealer Mart </StyledTableCell>
						<StyledTableCell align="right">Dealer Name</StyledTableCell>
						<StyledTableCell align="right">Address </StyledTableCell>
						<StyledTableCell align="right">Phone</StyledTableCell>
						<StyledTableCell align="right">Status</StyledTableCell>
						<StyledTableCell align="right">Delete</StyledTableCell>
						<StyledTableCell align="right">Edit</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>{table}</TableBody>
			</Table>
		</TableContainer>
	);
};

export default withRouter(Tables);
