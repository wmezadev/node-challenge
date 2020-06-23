import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";

import { history } from './helpers';
import PrivateRoute from './components/PrivateRoute';

import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [userToken, setUserToken] = useState(JSON.parse(localStorage.getItem('chatroom-jobsity-user')));

  return (
      <Router history={history}>
      <div className="App">
        <Switch>
          {!!userToken !== true && (
            <Route
              exact
              path="/login"
              render={props => <Login {...props} setUserToken={setUserToken} />}
            />
          )}
          <PrivateRoute
            path="/"
            component={withRouter(Home)}
          />
        </Switch>
      </div>
    </Router>
  );
  
}

export default App;
