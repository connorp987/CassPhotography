import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { withAuthentication } from './Session';

import admin from './Admin/admin'

function App() {
  const NotFound = () => (
    <div>
      <h1>404 - Not Found!</h1>
      <Link to="/">
        Go Home
      </Link>
    </div>
  );

  const Home = () => (
    <div>test11</div>
  )

  //<Route path='/test/:id' component={ProductView} />
  return (
    <Router>
      <div className="App">

        <Switch>
          <Route
            exact
            path={ROUTES.LANDING}
            component={Home}
          />
          <Route
            exact
            path={ROUTES.ADMIN}
            component={admin}
          />


          <Route component={NotFound} />

        </Switch>
      </div>


    </Router>
  );
}

export default withAuthentication(App);
