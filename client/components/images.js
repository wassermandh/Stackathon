import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {gettingMyPics, removePic, setPicture} from '../store/picture'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import * as contentful from 'contentful'

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
        <Grid container spacing={12} style={{padding: 24}}>
          {this.props.pictures.map((image, i) => {
            return (
              <Grid
                item
                xs={6}
                sm={4}
                lg={3}
                xl={2}
                id="picList "
                key={i}
                className="fadein"
              >
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
              </Grid>
            )
          })}
        </Grid>
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
