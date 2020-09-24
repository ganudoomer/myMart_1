import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
	const [ open, setOpen ] = React.useState(true);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [ otp, setOtp ] = useState({ otp: '' });
	const onSubmitHandler = (e) => {
		e.preventDefault();
		props.onOtpsubmitHandler(otp.otp);
		handleClose();
	};
	const onOtp = (e) => {
		setOtp({
			otp: e.target.value
		});
	};
	return (
		<div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Enter the OTP</DialogTitle>
				<form onSubmit={onSubmitHandler}>
					<DialogContent>
						<TextField
							value={otp.otp}
							onChange={onOtp}
							autoFocus
							margin="dense"
							id="name"
							label="OTP"
							type="number"
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button type="submit" onClick={handleClose} color="primary">
							Submit
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}
