import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import PageviewIcon from '@material-ui/icons/Pageview';
export default function AlertDialog(props) {
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
						{props.data.map((item, index) => (
							<List key={item._id}>
								<ListItem key={index}>
									<ListItemAvatar>
										<Avatar>
											<img height="100%" width="100%" src={item.image.thumbnail} />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={item.name}
										secondary={item.count + ' X ' + '₹ ' + item.price}
									/>
								</ListItem>
							</List>
						))}
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
