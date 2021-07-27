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
    right: -930,
    top: -450
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
          <Grid container spacing={1}>
            {gLoading ? (
              <CircularProgress size={25} thickness={5} color="secondary" />
            ) : (
              <Button className={classes.button}
                onClick={handleGoogleLogin}
                variant="contained"
                color="primary"
                disableElevation
              >
                Login with Google
              </Button>
              
            )}
          </Grid>
    </div>
  );
};

export default memo(Login);
