import React, { useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './container/admin/login/login';
import Dash from './container/admin/admin';
import Logout from './container/admin/logout';
import LoginDealer from './container/dealer/login';
import DashDealer from './container/dealer/dealer';
import LogoutDealer from './container/dealer/logout';
import Home from './container/user/home';
function App() {
	return (
		<div classNameName="App">
			<Route path="/" exact component={Home} />
			<Route path="/dealer/login" component={LoginDealer} />
			<Route path="/dealer/dash" component={DashDealer} />
			<Route path="/dealer/logout" component={LogoutDealer} />
			<Route path="/admin/login" component={Login} />
			<Route path="/admin/dash" component={Dash} />
			<Route path="/admin/logout" component={Logout} />
		</div>
	);
}

export default App;
