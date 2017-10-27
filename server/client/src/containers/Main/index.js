import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from './actions';

import Main from '../../components/Main';
import './Main.css';

const mapStateToProps = state => ({
	user: state.LoginReducer.user,
	currentBoard: state.MainReducer.currentBoard,
	boardList: state.MainReducer.boardList,
	error: state.MainReducer.error,
	isWorking: state.MainReducer.isWorking
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getBoards: Actions.getBoards }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
