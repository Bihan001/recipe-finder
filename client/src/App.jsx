import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Homepage from './pages/homepage';

import './css/style.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Homepage} />
            {/* <Route exact path='/recipe/:id' component={Homepage} /> */}
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
