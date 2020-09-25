import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import logo from '../../SuperMart.svg';

export default function FormDialog(props) {
	const [ open, setOpen ] = React.useState(true);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		props.clcikOn();
		setOpen(false);
	};
	return (
		<div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle style={{ margin: 'auto' }} id="form-dialog-title">
					<img src={logo} />
				</DialogTitle>
				<DialogContent>
					<Typography variant="h5" gutterBottom>
						Congratulations,you have successfully registered{' '}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button type="submit" onClick={handleClose} color="primary">
						Login to your new account
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
