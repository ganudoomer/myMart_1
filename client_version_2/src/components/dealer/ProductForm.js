import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@material-ui/core';
import {
	Button,
	Avatar,
	Paper,
	Container,
	Select,
	LinearProgress,
	Dialog,
	Typography,
	Slider
} from '@material-ui/core/';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import * as Axios from '../../fetchApi/dealerAxios';
import clsx from 'clsx';
import getCroppedImg from '../common/createImage';
import Cropper from 'react-easy-crop';
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
	const [ progress, setProgress ] = useState(0);
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
		[ croppedAreaPixels, rotation, url ]
	);

	const onClose = useCallback(() => {
		setCroppedImage(null);
	}, []);

	const onChangeHandler = (event) => {
		console.log(event.target.files[0].size);
		let Extension = event.target.files[0].name
			.substring(event.target.files[0].name.lastIndexOf('.') + 1)
			.toLowerCase();
		console.log(Extension);
		if (event.target.files[0].size > 2000000) {
			alert('File is too big!');
		} else if (
			Extension === 'gif' ||
			Extension === 'png' ||
			Extension === 'bmp' ||
			Extension === 'jpeg' ||
			Extension === 'jpg'
		) {
			const file = URL.createObjectURL(event.target.files[0]);
			setUrl(file);
			setProgress(0);
			console.log(event.target.files[0]);
			setFile({
				select: event.target.files[0]
			});
		} else {
			alert('Upload an image file');
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
		Axios.upload(data, config).then((res) => {
			console.log(res.data.imageName);
			console.log(res.data.thumbnail);

			setImage({
				image: res.data.imageName,
				thumbnail: res.data.thumbnail
			});
		});
	};
	const [ unit, setUnit ] = useState({
		units: null
	});
	const [ state, setState ] = useState({
		name: '',
		title: '',
		description: '',
		image: '',
		price: '',
		unit: 'Unit',
		cat: '',
		inventory: ''
	});
	useEffect(() => {
		const data = {
			token: localStorage.getItem('dToken')
		};
		Axios.getUnit(data).then((res) => {
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
		console.log(images.image);
		e.preventDefault();
		const data = {
			token: localStorage.getItem('dToken'),
			name: state.name,
			title: state.title,
			description: state.description,
			price: state.price,
			unit: state.unit,
			cat: state.cat,
			stock: state.inventory,
			image: images.image,
			thumbnail: images.thumbnail
		};
		Axios.submitProduct(data)
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
				<Avatar alt="Upload the image" src={croppedImage} className={classes.large}>
					PHOTO
				</Avatar>
				<form onSubmit={onSubmitHandler} autoComplete="off">
					<Input
						accept="image/x-png,image/gif,image/jpeg"
						required
						type="file"
						name="file"
						onChange={onChangeHandler}
					/>
					{croppedImage ? <Button onClick={onsubmit}>Upload Photo</Button> : null}
					<br />
					<br />
					<LinearProgress style={{ width: '60%' }} variant="determinate" value={progress} />
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
						label="Category"
					/>
					<TextField
						required
						onChange={onChangeHandeler}
						name="inventory"
						value={state.inventory}
						className={classes.form}
						type="number"
						label="Stock"
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
				<div />
			</Paper>
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
							Crop Image
						</Button>
					</div>
				</Dialog>
			) : null}
		</Container>
	);
};

export default Add;
