
import React        from 'react';
import { Provider } from 'react-redux';
import { Router }   from 'react-router';

import { getMembers, cleanMembers } from './actions/member';
import { getBlogs, cleanBlogs } from './actions/blog';

const createRoutes = store => ({
	path: '/',
	getComponent: (nextState, cb) => require.ensure([], (require) => {
		const component = require('./components/App').default;
		cb(null, component);
	}, 'App'),
	indexRoute: {
		getComponent: (nextState, cb) => require.ensure([], (require) => {
			const component = require('./components/Pages/Home').default;
			cb(null, component);
		}, 'Home'),
	},
	childRoutes: [{
		path: '/members',
		indexRoute: {
			getComponent: (nextState, cb) => require.ensure([], (require) => {
				const component = require('./containers/Pages/Members').default;
				cb(null, component);
			}, 'Members'),
			onEnter: () => {
				store.dispatch(cleanMembers());
				store.dispatch(getMembers());
			},
		},
	}, {
		path: '/blogs',
		indexRoute: {
			getComponent: (nextState, cb) => require.ensure([], (require) => {
				const component = require('./containers/Pages/Blogs').default;
				cb(null, component);
			}, 'Blogs'),
			onEnter: () => {
				store.dispatch(cleanBlogs());
				store.dispatch(getBlogs());
			},
		},
	}],
});

const Routes = ({ store, history }) => (
	<Provider store={store}>
		<Router key={Math.random()} history={history} routes={createRoutes(store)} />
	</Provider>
);

export default Routes;
