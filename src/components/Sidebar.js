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
import Dashboard from './screens/Dashboard'
import Client from './screens/Client'
import Mailer from './screens/Mailer'
import { logOutUser } from '../redux/actionCreators/authActions'
import CreateCampaigns from './screens/CreateCampaigns'
import Campaigns from './screens/Campaigns'
import Test from './screens/test'
import History from './screens/History'

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
          className='w3-sidebar w3-light-white w3-bar-block'
          style={{ position: 'fixed', width: '250px', top: '0', left: '0' }}
        >
          <h3 className='w3-bar-item ' style={{ top: '48px', left: '20px' }}>
            {' '}
            <img
              width='200px'
              height='36px'
              src='/img/NavLogo.svg'
              alt='logo'
            />{' '}
          </h3>
          <Link
            to='/Dashboard'
            className='w3-bar-item w3-button'
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
            className='w3-bar-item w3-button'
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
            className='w3-bar-item w3-button'
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
            className='w3-bar-item w3-button'
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
          <Link
            to='/history'
            className='w3-bar-item w3-button'
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
              <img src='/img/history.png' height='14px' width='14px' alt='mail' /> {" "}History
            </span>
          </Link>
          <button
            onClick={handleClick}
            className='w3-bar-item w3-button'
            style={{
              padding: '15px',
              marginTop: '200px',
            }}
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
              <img src='/img/log-out.svg' alt='log' /> Logout
            </span>
          </button>
        </div>

        <div style={{ marginLeft: '20%' }}>
          <div style={{ marginTop: '0px' }}>
            <Switch>
              <Route exact path='/Dashboard' component={Dashboard} />
              <Route path='/client' component={Client} />
              <Route path='/campaigns' component={Campaigns} />
              <Route path='/create' component={CreateCampaigns} />
              <Route path='/mailer' component={Mailer} />
              <Route path='/history' component={History} />
              <Route path='*' component={Dashboard} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  )
}

Sidebar.propTypes = {}

export default withRouter(Sidebar)
