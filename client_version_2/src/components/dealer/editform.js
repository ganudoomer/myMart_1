import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from 'react-router-dom';
import { Button, Paper, Container } from '@material-ui/core/';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
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
	useEffect(() => {
		(async function getData() {
			const data = {
				token: localStorage.getItem('dToken')
			};
			const res = await axios.post(`http://localhost:5050/dealer/productsingle/${props.match.params.id}`, data);
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
	}, []);

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
			token: localStorage.getItem('aToken'),
			name: state.name,
			title: state.title,
			description: state.description,
			image: state.image,
			price: state.price,
			unit: state.unit,
			cat: state.cat
		};
		axios
			.put(`http://localhost:5050/dealers/product/${props.match.params.id}`, data)
			.then((res) => {
				console.log(res);
				props.history.push('/admin/dash/');
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
						Add Dealer
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default withRouter(Edit);
