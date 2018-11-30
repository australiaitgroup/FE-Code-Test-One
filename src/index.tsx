import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import {Index} from './app/index';

import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Index}/>
  </Router>,
  document.getElementById('root')
);

