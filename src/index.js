import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase/firebase';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);