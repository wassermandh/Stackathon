import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {setPicture} from '../store/selectedPicture'

const images = props =>
  props.images.map((image, i) => (
    <div id="picList " key={i} className="fadein">
      <div onClick={() => props.removeImage(image)} className="delete">
        <FontAwesomeIcon icon={faTimesCircle} size="2x" />
      </div>
      <h2>
        <Link to="/picUpdate" onClick={() => props.setPicture(image)}>
          {image.url}
        </Link>
      </h2>
      <img src={image.url} alt="" />
    </div>
  ))

const mapDispatchToProps = dispatch => {
  return {
    setPicture: pic => {
      dispatch(setPicture(pic))
    }
  }
}

export default connect(null, mapDispatchToProps)(images)
