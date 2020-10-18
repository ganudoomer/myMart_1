import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import confirmed from './images/tick.svg';
import pending from './images/pending.png';
import ontheway from './images/ontheway.png';
import packing from './images/packing.png';

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 500,
		marginTop: 20,
		margin: 30
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	},
	large: {
		width: theme.spacing(8),
		height: theme.spacing(8)
	}
}));

export default function SimpleCard() {
	const [ state, setstate ] = useState({ data: null });
	useEffect(() => {
		axios.post('http://localhost:5050/user/orders', { token: localStorage.getItem('uToken') }).then((res) => {
			setstate({ data: res.data });
		});
	}, []);
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;
	return (
		<div
			style={{
				width: 600,
				height: 500,
				overflow: 'scroll'
			}}
		>
			{state.data ? (
				state.data.map((data) => {
					const date = new Date(data.createdOn);
					let logo = null;
					switch (data.status) {
						case 'Pending':
							logo = pending;
							break;
						case 'Confrimed':
							logo = confirmed;
							break;
						case 'On the Way':
							logo = ontheway;
							break;
						case 'Packing':
							logo = packing;
							break;
						default:
							break;
					}
					if (data.status !== 'Delivered' && data.status !== 'Rejected') {
						return (
							<Card raised className={classes.root}>
								<CardContent>
									<Typography className={classes.title} color="textSecondary" gutterBottom>
										{data.status}
										<Avatar className={classes.large}>
											<img width="100%" height="100%" src={logo} />
										</Avatar>
									</Typography>
									<Typography className={classes.title} color="textSecondary" gutterBottom>
										{date.toLocaleDateString()}
									</Typography>
									<Typography className={classes.title} color="textSecondary" gutterBottom>
										{data.address}
									</Typography>
									<Typography className={classes.title} color="textSecondary" gutterBottom>
										{data.price + ' Paid via ' + data.payment.mode}
									</Typography>
									<Typography className={classes.title} color="textSecondary" gutterBottom>
										{data.order.length + ' Items from  ' + data.order[0].dealer_name}
									</Typography>
								</CardContent>
							</Card>
						);
					} else {
						return null;
					}
				})
			) : null}
		</div>
	);
}
