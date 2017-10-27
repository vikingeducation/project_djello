import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'purecss/build/base-min.css';
import 'purecss/build/grids-min.css';
import './pure-css-offsets.css';
import './index.css';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import store from './store';

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
