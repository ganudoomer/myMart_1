import React, { useState } from 'react';
import { Button, Paper, Container, Typography, Input, Avatar } from '@material-ui/core/';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import clsx from 'clsx';
import { SliderPicker } from 'react-color';

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

const Add = (props) => {
	const [ state, setState ] = useState({
		dealer_name: '',
		username: '',
		phone: '',
		email: '',
		address: '',
		password: '',
		color: ''
	});
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	const onChangeHandeler = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};
	const onColorChange = (color) => {
		console.log(color.hex);
		setState({ ...state, color: color.hex });
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		const data = {
			token: localStorage.getItem('aToken'),
			dealer_name: state.dealer_name,
			username: state.username,
			phone: state.phone,
			email: state.email,
			address: state.address,
			password: state.passwordf,
			color: state.password
		};
		axios
			.post('http://localhost:5050/admin/dealer', data)
			.then((res) => {
				console.log(res);
				props.history.push('/admin/dash/');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [ progress, setProgress ] = useState(0);
	const [ file, setFile ] = useState({
		select: null
	});
	const [ url, setUrl ] = useState();
	const onChangeHandler = (event) => {
		const file = URL.createObjectURL(event.target.files[0]);
		setUrl(file);
		setProgress(0);
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
		const config = {
			onUploadProgress: (progressEvent) => {
				const totalLength = progressEvent.lengthComputable
					? progressEvent.total
					: progressEvent.target.getResponseHeader('content-length') ||
						progressEvent.target.getResponseHeader('x-decompressed-content-length');
				console.log('onUploadProgress', totalLength);
				if (totalLength !== null) {
					setProgress(Math.round(progressEvent.loaded * 100 / totalLength));
				}
			}
		};
		const data = new FormData();
		data.append('file', file.select);
		axios.post('http://localhost:5050/dealer/upload', data, config).then((res) => {
			console.log(res.data.imageName);
			console.log(res.data.thumbnail);

			setImage({
				image: res.data.imageName,
				thumbnail: res.data.thumbnail
			});
		});
	};

	return (
		<Container>
			<Paper className={fixedHeightPaper}>
				<h1>Add Form</h1>
				<Avatar alt="Upload the image" src={url} className={classes.large}>
					PHOTO
				</Avatar>
				<form onSubmit={onSubmitHandler} autoComplete="off">
					<Input required type="file" name="file" onChange={onChangeHandler} />
					<Button onClick={onsubmit}>Upload Photo</Button>
					<TextField
						required
						name="username"
						value={state.username}
						onChange={onChangeHandeler}
						className={classes.form}
						label="Username"
					/>
					<TextField
						required
						onChange={onChangeHandeler}
						name="password"
						value={state.password}
						type="password"
						className={classes.form}
						label="Password"
					/>
					<TextField
						required
						onChange={onChangeHandeler}
						name="address"
						value={state.address}
						className={classes.form}
						label="Address"
					/>
					<TextField
						required
						onChange={onChangeHandeler}
						name="dealer_name"
						value={state.dealer_name}
						className={classes.form}
						label="Dealer_name"
					/>

					<TextField
						required
						onChange={onChangeHandeler}
						name="phone"
						value={state.phone}
						className={classes.form}
						type="number"
						label="Phone"
					/>
					<TextField
						required
						onChange={onChangeHandeler}
						name="email"
						value={state.email}
						className={classes.form}
						type="email"
						label="Email"
					/>
					<br />
					<br />

					<Typography>Pick a color</Typography>
					<SliderPicker
						onChange={(e) => setState({ ...state, color: e.hex })}
						color={state.color}
						onChangeComplete={onColorChange}
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

export default Add;
