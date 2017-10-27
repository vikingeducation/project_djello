import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from './actions';

import BoardLists from '../../components/BoardLists';
import './BoardLists.css';

const mapStateToProps = state => ({
	lists: state.ListReducer.lists,
	error: state.ListReducer.error,
	isWorking: state.ListReducer.isWorking
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getBoards: Actions.getBoards }, dispatch);

export default connect(null, mapDispatchToProps)(BoardLists);
