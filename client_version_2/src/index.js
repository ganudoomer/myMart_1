import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import adminReducer from './store/reducers/admin';
import dealerReducer from './store/reducers/dealer';
import userReducer from './store/reducers/user';
const rootReduser = combineReducers({
	admin: adminReducer,
	dealer: dealerReducer,
	user: userReducer
});
// const composeEnhancers =
// 	process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

let composeEnhancers = null;
if (process.env.NODE_ENV === 'development') {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
	composeEnhancers = compose;
}
const store = createStore(rootReduser, composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
