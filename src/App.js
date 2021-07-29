import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import { hideAlert } from "./redux/actionCreators/alertActions";
import { setUserData } from "./redux/actionCreators/authActions";
import { Alert } from "@material-ui/lab";
import Login from './components/Login';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import PrivateRoute from './routers/PrivateRoute';
import PublicRoute from './routers/PublicRoute';
import Sidebar from './components/Sidebar';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  const alert = useSelector((state) => state.alert)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    setUserData(dispatch)
  }, [dispatch])

  useEffect(() => {
    setTimeout(() => {
      if (alert.isRequired) {
        hideAlert(dispatch)
      }
    }, 2000)
  })
  return (
    <div>
      {alert.isRequired && (
        <Alert
          variant='filled'
          severity={alert.alertType}
          style={{
            width: '40%',
            position: 'absolute',
            right: '10%',
            top: '7%',
          }}
        >
          {alert.message}
        </Alert>
      )}
      <Router>
        <Switch>
          <PublicRoute path='/' component={Login} exact={true} />
          <PrivateRoute path='/Dashboard' component={Sidebar} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
