import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { Button, Paper, Avatar, Container, Select, Input } from '@material-ui/core/';
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
	},
	large: {
		width: theme.spacing(20),
		height: theme.spacing(20)
	}
}));

const Edit = (props) => {
	const [ file, setFile ] = useState({
		select: null
	});
	const onChangeHandler = (event) => {
		console.log(event.target.files[0]);
		setFile({
			select: event.target.files[0]
		});
	};
	const [ images, setImage ] = useState({
		image: null,
		thumbnail: null
	});
	const onsubmit = () => {
		const data = new FormData();
		data.append('file', file.select);
		axios.post('http://localhost:5050/dealer/upload', data).then((res) => {
			console.log(res.data.imageName);
			console.log(res.data.thumbnail);
			setState({
				...state,
				image: { imageName: res.data.imageName, thumbnail: res.data.thumbnail }
			});
			setImage({
				image: res.data.imageName,
				thumbnail: res.data.thumbnail
			});
		});
	};
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
			const data = {
				token: localStorage.getItem('dToken')
			};
			axios.post('http://localhost:5050/dealer/unit', data).then((res) => {
				console.log(res.data[0].units);
				setUnit({
					units: res.data[0].units
				});
			});
		},
		[ params ]
	);
	const [ unit, setUnit ] = useState({
		units: null
	});
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
				<Avatar alt="Upload the image" src={state.image.thumbnail} className={classes.large}>
					PHOTO
				</Avatar>
				<Input required type="file" name="file" onChange={onChangeHandler} />
				<Button onClick={onsubmit}>Upload Photo</Button>
				<form onSubmit={onSubmitHandler} autoComplete="off">
					<TextField
						required
						name="name"
						value={state.name}
						onChange={onChangeHandeler}
						className={classes.form}
						label="Product name"
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
						Edit
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default withRouter(Edit);
