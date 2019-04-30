import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from '../pages/index';
import AboutPage from '../pages/about';
import FormPage from '../pages/form';
import G6Page from '../pages/g6';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/about" exact component={AboutPage} />
        <Route path="/form" exact component={FormPage} />
        <Route path="/G6" exact component={G6Page} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;