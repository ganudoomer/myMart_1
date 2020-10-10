import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Model from './ItemModel';
import * as Axios from '../../fetchApi/userAxios';

const useStyles = makeStyles({
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
	}
});

export default function SimpleCard() {
	const [ state, setstate ] = useState({ data: null });
	useEffect(() => {
		Axios.getOrders({ token: localStorage.getItem('uToken') }).then((res) => {
			setstate({ data: res.data });
		});
	}, []);
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<Container>
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
								<Card raised className={classes.root}>
									<Model data={data.order}>
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
												{'₹' + data.price + ' Paid via ' + data.payment.mode}
											</Typography>
											<Typography className={classes.title} color="textSecondary" gutterBottom>
												{data.order.length + ' Items from  ' + data.order[0].dealer_name}
											</Typography>
										</CardContent>
									</Model>
								</Card>
							);
						} else {
							return null;
						}
					})
				) : null}
			</div>
		</Container>
	);
}
