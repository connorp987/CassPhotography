import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { withAuthentication } from './Session';

import SignInPage from './SignIn/admin';
import admin from './Admin/admin'
import Navigation from './Navigation/nav'
import { Image } from 'antd';

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
    <div><Image
      width={200}
      src='./CassAndI.jpg'
      preview={{
        src: './CassAndI.jpg',
      }}
    /></div>
  )

  //<Route path='/test/:id' component={ProductView} />
  return (
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
  );
}

export default withAuthentication(App);
