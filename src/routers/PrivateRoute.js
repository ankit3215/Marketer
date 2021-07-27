import { isTokenAvailable } from "../services/authServices";
import { Route, Redirect } from "react-router";
import {useSelector} from 'react-redux';

 const PrivateRoute = ({ component: Component, ...rest }) => {
     const auth = useSelector(state => state.auth);
     
    return (
        <Route {...rest} render={props => (
            isTokenAvailable() ?
                <Component {...props} />
                : <Redirect to="/Dashboard" />
        )} />
    );
};

export default PrivateRoute;