/*
Mark Davis mjd85
Calvin College CS 336
Fall, 2016
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import CommentBox from './commentBox';

import '../css/base.css';



ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={CommentBox}/>  
  </Router>,
  
  document.getElementById('content')
);