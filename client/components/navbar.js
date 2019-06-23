import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
const style = {
  alignitems: 'center'
}

const Navbar = ({handleClick, isLoggedIn}) => (
  <AppBar
    position="static"
    style={{
      alignItems: 'center',
      backgroundColor: 'darkkhaki',
      height: '150px',
      justifyContent: 'space-between'
    }}
  >
    <Toolbar>
      <Typography variant="h1" color="white">
        City Pics
      </Typography>
    </Toolbar>
    {isLoggedIn ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '1000px'
        }}
      >
        {/* The navbar will show these links after you log in */}
        <Typography variant="h4">
          <Link to="/home" className="navLink">
            Home
          </Link>
        </Typography>
        <Typography variant="h4">
          <Link to="/uploadPic" className="navLink">
            Upload a Picture
          </Link>
        </Typography>
        <Typography variant="h4">
          <Link to="/myPics" className="navLink">
            See my pics
          </Link>
        </Typography>
        <Typography variant="h4">
          <a className="navLink" href="#" onClick={handleClick}>
            Logout
          </a>
        </Typography>
      </div>
    ) : (
      <div>
        {
          <Typography variant="h4">
            <Link to="/" className="navLink">
              Back to map
            </Link>
          </Typography>
        }
      </div>
    )}
  </AppBar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
