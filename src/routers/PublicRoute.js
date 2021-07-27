import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";
import { isTokenAvailable } from "../services/authServices";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const auth = useSelector(state => state.auth);
    let RedirectUrl;
    if(isTokenAvailable){
        RedirectUrl = "/Dashboard";
    }
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isTokenAvailable() && restricted ?
                <Redirect to={RedirectUrl} />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;