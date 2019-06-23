import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {gettingMyPics, removePic, setPicture} from '../store/picture'

class images extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getMyPics(this.props.user.id)
  }
  render() {
    return (
      <div>
        {this.props.pictures.map((image, i) => {
          return (
            <div id="picList " key={i} className="fadein">
              <div
                onClick={() => this.props.removePic(image)}
                className="delete"
              >
                <FontAwesomeIcon icon={faTimesCircle} size="2x" />
              </div>
              <h2>
                <Link
                  to="/picUpdate"
                  onClick={() => this.props.setPicture(image)}
                >
                  {image.title ? image.title : image.url}
                </Link>
              </h2>
              <img src={image.url} alt="" />
            </div>
          )
        })}
      </div>
    )
  }
}
// props.images.map((image, i) => (
//   <div id="picList " key={i} className="fadein">
//     <div onClick={() => props.removeImage(image)} className="delete">
//       <FontAwesomeIcon icon={faTimesCircle} size="2x" />
//     </div>
//     <h2>
//       <Link to="/picUpdate" onClick={() => props.setPicture(image)}>
//         {image.url}
//       </Link>
//     </h2>
//     <img src={image.url} alt="" />
//   </div>
// ))

const mapStateToProps = state => {
  return {
    pictures: state.pictures.myPics,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMyPics: id => {
      dispatch(gettingMyPics(id))
    },
    removePic: pic => {
      dispatch(removePic(pic))
    },
    setPicture: pic => {
      dispatch(setPicture(pic))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(images)
