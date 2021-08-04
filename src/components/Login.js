import {
  makeStyles,
  Button,
  Grid,
  CircularProgress,
  Typography,
  Avatar,
} from '@material-ui/core'
import { memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { errorAlert } from '../redux/actionCreators/alertActions'
import { loginWithGoogle } from '../redux/actionCreators/authActions'
import './CSS/login.css'
import { useHistory } from 'react-router-dom'
import Logo from '../images/Logo.png'
import GoogleIcon from '../images/Google_Icon.svg'
import { isTokenAvailable } from '../services/authServices'

const styles = makeStyles((theme) => ({
  container: {
    height: '100%',
  },
  heading: {
    fontWeight: 500,
    fontSize: '3.6em',
    color: 'white',
    letterSpacing: '0.02em',
    fontFamily: "'Karla', sans- serif",
  },
  link: {
    textDecoration: 'none',
  },
  Icon: {
    height: '35px',
    width: '35px',
    marginRight: '5px',
  },
  button: {
    padding: '0.5em 1em',
    background: '#4285F4',
    letterSpacing: '0.1em',
    fontSize: '1em',
    textTransform: 'uppercase',
    padding: '0.3em 1.2em 0.3em 0.5em',
    borderRadius: '8px',
    fontFamily: "'Karla', sans- serif",
  },
}))

const Login = () => {
  const classes = styles()
  const dispatch = useDispatch()
  const [gLoading, setgLoading] = useState(false)
  const history = useHistory()

  const handleGoogleLogin = async () => {
    setgLoading(true)

    try {
      await loginWithGoogle(dispatch)
      if (isTokenAvailable()) {
        history.push('/Dashboard')
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorAlert(dispatch, 'Connection closed by client')
          break
        default:
          console.log(error)
          break
      }
    }

    setgLoading(false)
  }

  return (
    <div className='login1'>
      <Grid
        container
        spacing={1}
        justify='space-between'
        alignItems='center'
        className={classes.container}
      >
        <Grid item md={7}>
          <Typography variant='h2' className={classes.heading} align='center'>
            We don't let <br />
            our customers down
          </Typography>
        </Grid>
        <Grid item md={5}>
          <Grid container spacing={5} direction='column' alignItems='center'>
            <Grid item>
              <img src={Logo} alt='Logo' height='120' />
            </Grid>
            <Grid item>
              {gLoading ? (
                <CircularProgress size={25} thickness={5} color='primary' />
              ) : (
                <Button
                  className={classes.button}
                  onClick={handleGoogleLogin}
                  startIcon={
                    <Avatar
                      src={GoogleIcon}
                      variant='square'
                      className={classes.Icon}
                    />
                  }
                  variant='contained'
                  color='primary'
                  disableElevation
                >
                  Login with Google
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default memo(Login)
