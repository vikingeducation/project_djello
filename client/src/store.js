import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import * as Reducers from './containers/App/reducers';

const store = createStore(combineReducers(Reducers), applyMiddleware(thunk));

export default store;
