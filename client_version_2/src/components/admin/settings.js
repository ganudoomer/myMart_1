import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Container, Paper, makeStyles, Typography, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
	paper: {
		margin: 100,
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	},
	fixedHeight: {
		height: 400,
		width: '50%'
	}
}));

function Settings() {
	const [ unit, setUnit ] = useState({
		units: null
	});
	useEffect(() => {
		const data = {
			token: localStorage.getItem('aToken')
		};
		axios.post('http://localhost:5050/admin/unit', data).then((res) => {
			console.log(res.data[0].units);
			setUnit({
				units: res.data[0].units
			});
		});
	}, []);
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	return (
		<Container>
			<Paper className={fixedHeightPaper}>
				<Typography>UNITS</Typography>
				<List component="nav" className={classes.root} aria-label="mailbox folders">
					<ListItem button>
						<ListItemText primary="Inbox" />
					</ListItem>
					<Divider />
				</List>
			</Paper>
		</Container>
	);
}

export default Settings;
