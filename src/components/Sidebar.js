import React from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Dashboard from './Dashboard'
import Client from './Client'
import Campaigns from './Campaigns'
import Mailer from './Mailer'
import { logOutUser } from '../redux/actionCreators/authActions'

const Sidebar = ({ history }) => {
  const auth = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const handleClick = () => {
    logOutUser(dispatch, auth.userInfo.userId, history)
  }
  return (
    <Router>
      <div>
        <div
          class='w3-sidebar w3-light-white w3-bar-block'
          style={{ position: 'fixed', width: '20%', top: '0', left: '0' }}
        >
          <h3 class='w3-bar-item ' style={{ top: '48px', left: '20px' }}>
            {' '}
            <img
              width='200px'
              height='36px'
              src='/img/NavLogo.svg'
              alt='logo'
            />{' '}
          </h3>
          <Link
            to='/'
            class='w3-bar-item w3-button'
            style={{ marginTop: '20px', padding: '15px' }}
          >
            <span
              style={{
                margin: '3px',
                padding: '10px',
                fontSize: '16px',
                fontFamily: 'karla',
              }}
            >
              <img src='/img/dashboard.svg' alt='dashboard' /> Dashboard
            </span>
          </Link>

          <Link
            to='/client'
            class='w3-bar-item w3-button'
            style={{ padding: '15px' }}
          >
            <span
              style={{
                margin: '3px',
                padding: '10px',
                fontSize: '16px',
                fontFamily: 'karla',
              }}
            >
              {' '}
              <img src='/img/users.svg' alt='users' /> Client
            </span>
          </Link>
          <Link
            to='/campaigns'
            class='w3-bar-item w3-button'
            style={{ padding: '15px' }}
          >
            <span
              style={{
                margin: '3px',
                padding: '10px',
                fontSize: '16px',
                fontFamily: 'karla',
              }}
            >
              {' '}
              <img src='/img/campaigns.svg' alt='campaigns' /> Campaigns
            </span>
          </Link>
          <Link
            to='/mailer'
            class='w3-bar-item w3-button'
            style={{ padding: '15px' }}
          >
            <span
              style={{
                margin: '3px',
                padding: '10px',
                fontSize: '16px',
                fontFamily: 'karla',
              }}
            >
              {' '}
              <img src='/img/mail.svg' alt='mail' /> Mailers
            </span>
          </Link>
          <button onClick={handleClick} class="w3-bar-item w3-button"
          style={{
            margin:"5px" ,
             padding:"15px",
             marginTop:"360px",
          
             bottom:"0",
             left:"0",
             }}>
            <img src="/img/log-out.svg" alt="log"/> Logout
          </button>
        </div>

        <div style={{ marginLeft: '20%' }}>
          <div style={{ marginTop: '0px' }}>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/client' component={Client} />
              <Route path='/campaigns' component={Campaigns} />
              <Route path='/mailer' component={Mailer} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  )
}

Sidebar.propTypes = {}

export default withRouter(Sidebar)
