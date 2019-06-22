import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'

const images = props =>
  props.images.map((image, i) => (
    <div id="picList " key={i} className="fadein">
      <div onClick={() => props.removeImage(image)} className="delete">
        <FontAwesomeIcon icon={faTimesCircle} size="2x" />
      </div>
      <img src={image.url} alt="" />
    </div>
  ))

export default connect(null, null)(images)
