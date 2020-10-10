import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
	Container,
	TextField,
	Button,
	Paper,
	makeStyles,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemText
} from '@material-ui/core';
import { getUnit } from '../../fetchApi/adminAxios';
const useStyles = makeStyles((theme) => ({
	paper: {
		margin: 100,
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	},
	fixedHeight: {
		height: '100%',
		width: '50%'
	}
}));

function Settings() {
	const [ unit, setUnit ] = useState({
		units: null
	});
	const [ uni, setUni ] = useState({
		unit: ''
	});
	const onChangeHandeler = (e) => {
		setUni({
			unit: e.target.value
		});
	};
	const onAddUnit = () => {
		if (uni.unit) {
			const arr = unit.units;
			const units = uni.unit;
			console.log(uni.unit);
			arr.push(units);
			setUnit({
				units: arr
			});
			const data = {
				token: localStorage.getItem('aToken'),
				unit: uni.unit
			};
			getUnit(data, 'addunit').then((res) => {
				setUni({ unit: '' });
			});
		}
	};
	useEffect(() => {
		const data = {
			token: localStorage.getItem('aToken')
		};
		getUnit(data, 'unit').then((res) => {
			console.log(res.data[0].units);
			setUnit({
				units: res.data[0].units
			});
		});
	}, []);
	let list = null;
	if (unit.units) {
		list = unit.units.map((unit) => (
			<div>
				<ListItem button>
					<ListItemText primary={unit} />
				</ListItem>
				<Divider />
			</div>
		));
	}
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	return (
		<Container>
			<Paper className={fixedHeightPaper}>
				<Typography>UNITS</Typography>
				<List component="nav" className={classes.root} aria-label="mailbox folders">
					{list}
				</List>
				<TextField onChange={onChangeHandeler} required value={uni.unit} type="text" label="Add a unit" />
				<br />
				<Button
					onClick={onAddUnit}
					type="submit"
					variant="contained"
					style={{ margin: 10, width: 100 }}
					size="small"
					color="primary"
				>
					Add unit
				</Button>
			</Paper>
		</Container>
	);
}

export default Settings;
