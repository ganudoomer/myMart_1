import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PageviewIcon from '@material-ui/icons/Pageview';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles({
	table: {
		minWidth: 650
	}
});

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

export default function AlertDialog(props) {
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<IconButton onClick={handleClickOpen} aria-label="delete">
				<PageviewIcon />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Items'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<TableContainer component={Paper}>
							<Table className={classes.table} size="small" aria-label="a dense table">
								<TableHead>
									<TableRow>
										<TableCell align="left">Image</TableCell>
										<TableCell>Item Name </TableCell>
										<TableCell align="right">Count</TableCell>
										<TableCell align="right">Price </TableCell>
										<TableCell align="right">Descrp.</TableCell>
										<TableCell align="left">ID</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{props.data.map((item, index) => (
										<TableRow key={index}>
											<TableCell align="right">
												<Avatar>
													<img width="100%" height="100%" src={item.image.thumbnail} />
												</Avatar>
											</TableCell>
											<TableCell align="right">{item.name}</TableCell>
											<TableCell align="right">{item.count}</TableCell>
											<TableCell align="right">{item.price + ' per ' + item.unit}</TableCell>
											<TableCell component="th" scope="row">
												{item.description}
											</TableCell>
											<TableCell align="right">{item._id}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
