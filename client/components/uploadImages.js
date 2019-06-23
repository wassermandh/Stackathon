import React, {Component} from 'react'
import Spinner from './spinner'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import Images from './images'
import Buttons from './buttons'
import {me} from '../store/user'
import {getPictures, addPicture, removePic} from '../store/picture'
import {setPicture} from '../store/selectedPicture'

class UploadImages extends Component {
  constructor() {
    super()
    this.state = {
      uploading: false
    }
  }
  componentDidMount() {
    this.props.getPictures()
  }

  onChange = e => {
    const files = Array.from(e.target.files)
    this.setState({uploading: true})

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })
    this.props.addPicture(formData)

    this.setState({
      uploading: false
    })
  }

  removeImage = pic => {
    this.props.removePic(pic)
  }

  render() {
    const {uploading} = this.state

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />
        default:
          return <Buttons onChange={this.onChange} />
      }
    }
    return (
      <div>
        <div className="buttons">{content()}</div>
      </div>
    )
    // } else {
    //   return (
    //     <div>
    //       <h2>
    //         Please <Link to="/login">Login</Link> or{' '}
    //         <Link to="/signup">Signup</Link>
    //       </h2>
    //     </div>
    //   )
    // }
  }
}

const mapStateToProps = state => {
  return {
    pictures: state.pictures.allPics,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPicture: pic => {
      dispatch(addPicture(pic))
    },
    getPictures: () => {
      dispatch(getPictures())
    },
    removePic: pic => {
      dispatch(removePic(pic))
    },
    setPicture: pic => {
      dispatch(setPicture(pic))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadImages)
