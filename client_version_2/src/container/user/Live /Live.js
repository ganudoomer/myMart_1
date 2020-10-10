import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import LiveOrders from '../../../components/user/Live';
import Layout from '../layout/layout';

const Live = (props) => {
	let redirect = <Redirect to="/" />;
	if (props.token) {
		redirect = null;
	}

	return (
		<Fragment>
			<Layout>
				<div style={{ width: '50px', marginLeft: '25%', marginTop: '2%' }}>
					<Typography> Live Orders</Typography>
					<LiveOrders />
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

export default connect(mapStateToProps)(Live);
