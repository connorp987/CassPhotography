import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { withAuthentication } from './Session';

import SignInPage from './SignIn/admin';
import admin from './Admin/admin'
import Navigation from './Navigation/nav'
import { Image } from 'antd';
import Home from './Home/home'
import { height } from "dom-helpers";

function App() {
  const NotFound = () => (
    <div>
      <h1>404 - Not Found!</h1>
      <Link to="/">
        Go Home
      </Link>
    </div>
  );

  //<Route path='/test/:id' component={ProductView} />
  return (
    <div style={{background: '#ecede8', height: '100'}}>
      <Router>
        <div className="App">
          <Navigation />

          <Switch>
            <Route
              exact
              path={ROUTES.LANDING}
              component={Home}
            />
            <Route path={ROUTES.ADMIN} component={admin} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />

            <Route component={NotFound} />

          </Switch>
        </div>


      </Router>
    </div>

  );
}

export default withAuthentication(App);
