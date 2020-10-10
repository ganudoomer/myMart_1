import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Container, Select, Paper, Checkbox, makeStyles, Button } from '@material-ui/core';
import { getSettings, editSettings } from '../../fetchApi/dealerAxios';
const useStyles = makeStyles((theme) => ({
	paper: {
		margin: 100,
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	},
	fixedHeight: {
		height: 150,
		width: '55%'
	}
}));

const Settings = () => {
	const [ state, setState ] = useState({
		live: false
	});
	useEffect(() => {
		const data = {
			token: localStorage.getItem('dToken')
		};
		getSettings(data).then((res) => {
			console.log(res);
			setState({
				live: res.data[0]['live']
			});
		});
	}, []);
	const on = () => {
		console.log(state.live);
		editSettings({ set: state.live, token: localStorage.getItem('dToken') }).then((res) => {
			alert('Status Changed');
			console.log(res);
		});
	};
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	return (
		<Container>
			<Paper className={fixedHeightPaper}>
				Store Status
				<form>
					<Select
						onChange={(e) => {
							setState({
								live: e.target.value
							});
						}}
						value={state.live}
						style={{ minWidth: 150 }}
						native
					>
						<option value={true}>Open</option>
						<option value={false}>Close</option>
					</Select>
					<br />
					<br />
					<Button onClick={on} variant="contained" color="primary">
						Change
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default Settings;
