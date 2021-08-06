import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import { hideAlert } from "./redux/actionCreators/alertActions";
import { setUserData } from "./redux/actionCreators/authActions";
import { Alert } from "@material-ui/lab";
import Login from './components/Login';
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import PrivateRoute from './routers/PrivateRoute';
import PublicRoute from './routers/PublicRoute';
import Sidebar from './components/Sidebar';

const App = () => {
  const alert = useSelector((state) => state.alert)
  const auth = useSelector((state) => state.auth)
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
    <>
      {alert.isRequired && (
        <Alert
          variant='filled'
          severity={alert.alertType}
          style={{
            width: "20%",
            position: "absolute",
            right: "5%",
            top: "5%",
          }}
        >
          {alert.message}
        </Alert>
      )}
      <Router>
        <Switch>
          <PublicRoute path='/' component={Login} restricted={true} exact={true} />

          <PrivateRoute 
            path='/' 
            component={
              auth.isLoggedIn ? Sidebar : 'null'
          } 
          />
        
        </Switch>
      </Router>
    </>
  );
};

export default App
