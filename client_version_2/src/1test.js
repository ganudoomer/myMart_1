import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
const useStyles = makeStyles({
	root: {
		minWidth: 500,
		marginTop: 20
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
	}
});

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
					if (data.status === 'Delivered' || data.status === 'Rejected') {
						return (
							<Card className={classes.root}>
								<CardContent>
									<Typography className={classes.title} color="textSecondary" gutterBottom>
										{data.status}
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
