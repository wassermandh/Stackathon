import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBowlingBall} from '@fortawesome/free-solid-svg-icons'

const spinner = props => (
  <div className="spinner fadein">
    <FontAwesomeIcon icon={faBowlingBall} size="5x" color="#3B5998" />
  </div>
)

export default connect(null, null)(spinner)
