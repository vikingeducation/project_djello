import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';
import App from '../../components/App';

import * as Actions from './actions';

export default connect(state => state, null)(App);
