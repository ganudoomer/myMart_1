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

const useStyles = makeStyles({
	table: {
		minWidth: 700
	}
});

const Tables = (props) => {
	const onEditHandler = (id) => {
		console.log('yess');
		props.history.push(`/admin/dash/dealer/${id}`);
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
			<StyledTableCell align="right">
				<img src={data.image} />
			</StyledTableCell>
			<StyledTableCell align="right">{data._id}</StyledTableCell>
			<StyledTableCell align="left">{data.name}</StyledTableCell>
			<StyledTableCell align="right"> ₹{data.price}</StyledTableCell>
			<StyledTableCell align="right">{data.unit}</StyledTableCell>
			<StyledTableCell align="right">{data.cat}</StyledTableCell>
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
						<StyledTableCell>ID </StyledTableCell>
						<StyledTableCell align="left">Image</StyledTableCell>
						<StyledTableCell align="right">Product</StyledTableCell>
						<StyledTableCell align="right">Price </StyledTableCell>
						<StyledTableCell align="right">Unit </StyledTableCell>
						<StyledTableCell align="right">Category</StyledTableCell>
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
