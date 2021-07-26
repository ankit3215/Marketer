import {
  Typography,
  makeStyles,
  Button,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { errorAlert } from "../redux/actionCreators/alertActions";
import {
  loginWithGoogle
} from "../redux/actionCreators/authActions";
import "./login.css";
import { Center } from "@chakra-ui/react";

const styles = makeStyles((theme) => ({
  heading: {
    fontWeight: 500,
  },
  link: {
    textDecoration: "none",
  },
  button: {
    padding: "1em",
    textTransform: "capitalize",
  },
}));

const Login = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const [gLoading, setgLoading] = useState(false);

  
  const handleGoogleLogin = async () => {
    setgLoading(true);
    try {
      await loginWithGoogle(dispatch);
    } catch (error) {
      switch (error.code) {
        case "auth/email-not-registered":
          errorAlert(dispatch, "Email not Registered. Try signing up");
          break;
        case "auth/popup-closed-by-user":
          errorAlert(dispatch, "Connection closed");
          break;
        default:
          console.log(error);
          break;
      }
    }

    setgLoading(false);
  };

  return (
    <div className="login1">
        <div className="login">
        <Center><Typography
        variant="h5"
        className={classes.heading}
        gutterBottom={true}
      >
        Login
      </Typography></Center>
          
          <br />
          <br />
          <Grid container spacing={1} justify="center">
            {gLoading ? (
              <CircularProgress size={25} thickness={5} color="primary" />
            ) : (
              <Button
                onClick={handleGoogleLogin}
                variant="outlined"
                color="secondary"
              >
                Login with Google
              </Button>
              
            )}
          </Grid>
        </div>
    </div>
  );
};

export default memo(Login);
