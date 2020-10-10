import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import * as actionCreators from '../../../store/actions/user/action';
import { connect } from 'react-redux';
import Layout from '../layout/layout';
import OrderHistory from '../../../components/user/Card';
import { Typography } from '@material-ui/core';

const History = (props) => {
	let redirect = <Redirect to="/" />;
	if (props.token) {
		redirect = null;
	}

	return (
		<Fragment>
			<Layout>
				<div style={{ width: '50px', marginLeft: '25%', marginTop: '2%' }}>
					<Typography> Order History</Typography>
					<OrderHistory />
				</div>
			</Layout>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.user.login
	};
};

export default connect(mapStateToProps)(History);
