import React from 'react';
import clsx from 'clsx';
import { Container, Paper, Checkbox, makeStyles, withWidth } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
	paper: {
		margin: 100,
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	},
	fixedHeight: {
		height: 100,
		width: '50%'
	}
}));

function Settings() {
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	console.log(fixedHeightPaper);
	return (
		<Container>
			<Paper className={fixedHeightPaper}>
				Store online
				<Checkbox checked={true} inputProps={{ 'aria-label': 'primary checkbox' }} />
			</Paper>
		</Container>
	);
}

export default Settings;
