import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Homepage from './pages/homepage';
import Recipe from './pages/recipe';
import Browse from './pages/browse';
import Navbar from './components/navbar';

import './css/homepage.css';
import './css/recipe.css';
import './css/browse.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/recipe/:id' component={Recipe} />
            <Route exact path='/browse' component={Browse} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
