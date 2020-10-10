import React, { useState, useCallback } from 'react';
import {
	Button,
	Paper,
	Container,
	Typography,
	Input,
	Avatar,
	Slider,
	LinearProgress,
	Dialog
} from '@material-ui/core/';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { submit, upload } from '../../fetchApi/adminAxios';
import clsx from 'clsx';
import { SliderPicker } from 'react-color';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../common/createImage';
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
	},
	cropContainer: {
		position: 'relative',
		width: '100%',
		height: 200,
		background: '#333',
		[theme.breakpoints.up('sm')]: {
			height: 400
		}
	},
	cropButton: {
		flexShrink: 0,
		marginLeft: 16
	},
	controls: {
		padding: 16,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		[theme.breakpoints.up('sm')]: {
			flexDirection: 'row',
			alignItems: 'center'
		}
	},
	sliderContainer: {
		display: 'flex',
		flex: '1',
		alignItems: 'center'
	},
	sliderLabel: {
		[theme.breakpoints.down('xs')]: {
			minWidth: 65
		}
	},
	slider: {
		padding: '22px 0px',
		marginLeft: 16,
		[theme.breakpoints.up('sm')]: {
			flexDirection: 'row',
			alignItems: 'center',
			margin: '0 16px'
		}
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
		color: '#FFFAFA'
	});
	const [ file, setFile ] = useState({
		select: null
	});

	const [ url, setUrl ] = useState();

	const [ crop, setCrop ] = useState({ x: 0, y: 0 });
	const [ rotation, setRotation ] = useState(0);
	const [ zoom, setZoom ] = useState(1);
	const [ croppedAreaPixels, setCroppedAreaPixels ] = useState(null);
	const [ croppedImage, setCroppedImage ] = useState(null);

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const showCroppedImage = useCallback(
		async () => {
			setUrl(null);
			try {
				const blob = await getCroppedImg(url, croppedAreaPixels, rotation);
				const croppedImage = URL.createObjectURL(blob);
				let imagefile = new File([ blob ], 'imageg.jpg');
				setFile({ select: imagefile });
				console.log(imagefile);
				setCroppedImage(croppedImage);
			} catch (e) {
				console.error(e);
			}
		},
		[ croppedAreaPixels, rotation ]
	);

	const onClose = useCallback(() => {
		setCroppedImage(null);
	}, []);

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
			password: state.password,
			color: state.color,
			image: images.image,
			thumbnail: images.thumbnail
		};
		submit(data)
			.then((res) => {
				console.log(res);
				props.history.push('/admin/dash/');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [ progress, setProgress ] = useState(0);
	const onChangeHandler = (event) => {
		console.log(event.target.files[0].size);
		if (event.target.files[0].size > 2000000) {
			alert('File is too big!');
		} else {
			const file = URL.createObjectURL(event.target.files[0]);
			setUrl(file);
			setProgress(0);
			console.log(event.target.files[0]);
			setFile({
				select: event.target.files[0]
			});
		}
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
		upload(data, config).then((res) => {
			console.log(res.data.imageName);
			console.log(res.data.thumbnail);

			setImage({
				image: res.data.imageName,
				thumbnail: res.data.thumbnail
			});
		});
	};
	let bar = null;
	bar = <LinearProgress style={{ width: '40%' }} variant="determinate" value={progress} />;

	return (
		<Container>
			<Paper className={fixedHeightPaper}>
				<h1>Add Form</h1>
				<Avatar alt="Upload the image" src={croppedImage} className={classes.large}>
					PHOTO
				</Avatar>
				<br />
				{bar}
				<form onSubmit={onSubmitHandler} autoComplete="off">
					<Input required type="file" name="file" onChange={onChangeHandler} />
					{croppedImage ? <Button onClick={onsubmit}>Upload Photo</Button> : null}
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
					{url ? (
						<Dialog fullScreen open>
							<div style={{ margin: 50 }}>
								<div className={classes.cropContainer}>
									<Cropper
										image={url}
										crop={crop}
										rotation={rotation}
										zoom={zoom}
										aspect={4 / 3}
										onCropChange={setCrop}
										onRotationChange={setRotation}
										onCropComplete={onCropComplete}
										onZoomChange={setZoom}
									/>
								</div>
								<div className={classes.sliderContainer}>
									<Typography variant="overline" className={classes.sliderLabel}>
										Zoom
									</Typography>
									<Slider
										value={zoom}
										min={1}
										max={3}
										step={0.1}
										aria-labelledby="Zoom"
										className={classes.slider}
										onChange={(e, zoom) => setZoom(zoom)}
									/>
								</div>
								<div className={classes.sliderContainer}>
									<Typography variant="overline" className={classes.sliderLabel}>
										Rotation
									</Typography>

									<Slider
										value={rotation}
										min={0}
										max={360}
										step={1}
										aria-labelledby="Rotation"
										className={classes.slider}
										onChange={(e, rotation) => setRotation(rotation)}
									/>
								</div>
								<Button
									onClick={showCroppedImage}
									variant="contained"
									color="primary"
									className={classes.cropButton}
								>
									Crop
								</Button>
							</div>
						</Dialog>
					) : null}

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
