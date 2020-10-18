import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2)
	}
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1)
	}
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
	const [ open, setOpen ] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const onButtonClick = () => {
		props.cart();
		handleClose();
	};
	let click = (
		<Button color="primary" onClick={handleClickOpen}>
			view
		</Button>
	);
	if (props.view) {
		click = <div onClick={() => handleClickOpen()}>{props.children}</div>;
	}
	return (
		<div>
			{click}
			<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					{props.data.name}
				</DialogTitle>
				<div style={{ margin: 'auto' }}>
					<img width="240rem" alt="logo" height="200rem" src={props.data.image.imageName} />
				</div>

				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					{props.data.title} <br /> ₹{props.data.price}/{props.data.unit}
				</DialogTitle>
				<DialogContent dividers>
					<DialogContentText id="alert-dialog-description">{props.data.cat}</DialogContentText>
					<Typography gutterBottom>{props.data.title}</Typography>
					<Typography gutterBottom>{props.data.description}</Typography>
					<Typography gutterBottom>
						Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque
						nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
					</Typography>
				</DialogContent>
				<DialogActions>
					{props.data.stock > 0 ? (
						<Button
							autoFocus
							onClick={onButtonClick}
							style={{
								borderRadius: 35,
								backgroundColor: '#2FEF92',
								padding: '18px 36px',
								fontSize: '10px',
								marginLeft: 20
							}}
							variant="contained"
						>
							<AddShoppingCartIcon />
						</Button>
					) : (
						<Button> Out Of Stock</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
}
