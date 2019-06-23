import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImages, faImage} from '@fortawesome/free-solid-svg-icons'

const buttons = props => (
  <div className="buttons fadein">
    <div className="button">
      <label htmlFor="single">
        <FontAwesomeIcon icon={faImage} color="#3B5998" size="10x" />
      </label>
      <input type="file" id="single" onChange={props.onChange} />
    </div>
  </div>
)

export default connect(null, null)(buttons)
