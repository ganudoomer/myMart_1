import React, { useState, useEffect } from 'react';
import { Button, Paper, Container, Select } from '@material-ui/core/';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
	paper: {
		margin: 100,
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	},
	fixedHeight: {
		height: '100%'
	},
	form: {
		margin: theme.spacing(1),
		width: '100ch'
	}
}));

const Add = (props) => {
	const [ state, setState ] = useState({
		name: '',
		title: '',
		description: '',
		image: '',
		price: '',
		unit: '',
		cat: ''
	});
	const [ unit, setUnit ] = useState({
		units: null
	});
	useEffect(() => {
		const data = {
			token: localStorage.getItem('dToken')
		};
		axios.post('http://localhost:5050/dealer/unit', data).then((res) => {
			console.log(res.data[0].units);
			setUnit({
				units: res.data[0].units
			});
		});
	}, []);

	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	const onChangeHandeler = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		const data = {
			token: localStorage.getItem('dToken'),
			name: state.name,
			title: state.title,
			description: state.description,
			image: state.image,
			price: state.price,
			unit: state.unit,
			cat: state.cat
		};
		axios
			.post('http://localhost:5050/dealer/product', data)
			.then((res) => {
				console.log(res);
				props.history.push('/dealer/dash/');
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<Container>
			<Paper className={fixedHeightPaper}>
				<h1>Add Product</h1>
				<form onSubmit={onSubmitHandler} autoComplete="off">
					<TextField
						name="name"
						value={state.name}
						onChange={onChangeHandeler}
						className={classes.form}
						label="Product name"
						required
					/>
					<TextField
						required
						onChange={onChangeHandeler}
						name="title"
						value={state.title}
						type="text"
						className={classes.form}
						label="Title for the product"
					/>
					<TextField
						required
						onChange={onChangeHandeler}
						name="description"
						value={state.description}
						className={classes.form}
						label="Description"
					/>
					<TextField
						required
						onChange={onChangeHandeler}
						name="image"
						value={state.image}
						className={classes.form}
						label="Image URl"
					/>
					<TextField
						required
						onChange={onChangeHandeler}
						name="price"
						value={state.price}
						className={classes.form}
						type="number"
						label="Price: ₹"
					/>
					<TextField
						required
						onChange={onChangeHandeler}
						name="cat"
						value={state.cat}
						className={classes.form}
						type="text"
						label="category"
					/>
					<br />
					<br />
					<Select
						name="unit"
						onChange={onChangeHandeler}
						value={state.unit}
						style={{ minWidth: 500, marginLeft: 10 }}
						native
					>
						{unit.units ? unit.units.map((unit) => <option value={unit}>{unit}</option>) : null}
					</Select>
					<br />
					<br />
					<Button type="submit" variant="contained" color="primary">
						Add Product
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default Add;
