import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Map from './map'
import Typography from '@material-ui/core/Typography'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <div style={{marginBottom: '.5em', textAlign: 'center', fontSize: '2em'}}>
        <Typography variant="p">Welcome, {email}!</Typography>
      </div>
      <div>
        <Map />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
