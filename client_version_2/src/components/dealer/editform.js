import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { Button, Paper, Container } from '@material-ui/core/';
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

const Edit = (props) => {
	let params = props.match.params.id ? props.match.params.id : '';
	useEffect(
		() => {
			(async function getData() {
				const data = {
					token: localStorage.getItem('dToken')
				};
				const res = await axios.post(`http://localhost:5050/dealer/productsingle/${params}`, data);
				const result = res.data[0];
				setState({
					name: result.name,
					title: result.title,
					description: result.description,
					image: result.image,
					price: result.price,
					unit: result.unit,
					cat: result.cat
				});
			})();
		},
		[ params ]
	);

	const [ state, setState ] = useState({
		name: '',
		title: '',
		description: '',
		image: '',
		price: '',
		unit: '',
		cat: ''
	});

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
			.put(`http://localhost:5050/dealer/product/${props.match.params.id}`, data)
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
				<h1>Edit Form</h1>
				<form onSubmit={onSubmitHandler} autoComplete="off">
					<TextField
						name="name"
						value={state.name}
						onChange={onChangeHandeler}
						className={classes.form}
						label="Product name"
					/>
					<TextField
						onChange={onChangeHandeler}
						name="title"
						value={state.title}
						type="text"
						className={classes.form}
						label="Title for the product"
					/>
					<TextField
						onChange={onChangeHandeler}
						name="description"
						value={state.description}
						className={classes.form}
						label="Description"
					/>
					<TextField
						onChange={onChangeHandeler}
						name="image"
						value={state.image}
						className={classes.form}
						label="Image URl"
					/>
					<TextField
						onChange={onChangeHandeler}
						name="price"
						value={state.price}
						className={classes.form}
						type="number"
						label="Price: ₹"
					/>
					<TextField
						onChange={onChangeHandeler}
						name="unit"
						value={state.unit}
						className={classes.form}
						type="text"
						label="Unit eg:Kg,Ltr"
					/>
					<TextField
						onChange={onChangeHandeler}
						name="cat"
						value={state.cat}
						className={classes.form}
						type="text"
						label="category"
					/>
					<br />
					<br />
					<Button type="submit" variant="contained" color="primary">
						Edit
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default withRouter(Edit);
