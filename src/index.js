import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import App from './App';
import * as serviceWorker from './serviceWorker';

// Components
import Login from './components/auth/login.component'
import Register from './components/auth/register.component'


const Root = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path="/login" component={Login} />
      <Route path='/register' component={Register} />
    </Switch>
  </Router>
)

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
