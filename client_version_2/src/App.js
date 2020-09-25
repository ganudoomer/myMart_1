import React, { useEffect } from 'react';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './container/admin/login/login';
import Dash from './container/admin/admin';
import Logout from './container/admin/logout';
import LoginDealer from './container/dealer/login';
import DashDealer from './container/dealer/dealer';
import LogoutDealer from './container/dealer/logout';
import Home from './container/user/home';
import LoginUser from './container/user/login';
import RegisterUser from './container/user/register';
import LogoutUser from './container/user/logout';
import AdminProtectedRoute from './components/hoc/AdminAuth';
import DealerProtectedRoute from './components/hoc/DealerAuth';
import * as dealerAction from './store/actions/dealer/action';
import * as adminAction from './store/actions/admin';
import * as userAction from './store/actions/user/action';
import Test from './Test';
function App(props) {
	const admin = props.checkAdmin;
	const dealer = props.checkDealer;
	useEffect(
		() => {
			props.checkAdmin();
			props.checkDealer();
		},
		[ admin, dealer ]
	);
	return (
		<div className="App">
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/test" exact component={Test} />
				<Route path="/logout" exact component={LogoutUser} />
				<Route path="/login" exact component={LoginUser} />
				<Route path="/register" exact component={RegisterUser} />
				<Route path="/dealer/login" component={LoginDealer} />
				<DealerProtectedRoute path="/dealer/dash" auth={props.dealerAuth} component={DashDealer} />
				<Route path="/dealer/logout" component={LogoutDealer} />
				<Route path="/admin/login" component={Login} />
				<AdminProtectedRoute path="/admin/dash" auth={props.adminAuth} component={Dash} />
				<Route path="/admin/logout" component={Logout} />
				<Redirect path="/admin" to="/admin/login" />
				<Redirect to="/" />
			</Switch>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		adminAuth: state.admin.token,
		dealerAuth: state.dealer.token
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		checkAdmin: () => dispatch(adminAction.check()),
		checkDealer: () => dispatch(dealerAction.check())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
