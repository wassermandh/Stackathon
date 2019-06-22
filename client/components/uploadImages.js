import React, {Component} from 'react'
import Spinner from './spinner'
import {connect} from 'react-redux'
import axios from 'axios'
import Images from './images'
import Buttons from './buttons'
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
        case this.props.pictures.length > 0:
          return (
            <div>
              <Buttons onChange={this.onChange} />
            </div>
          )
        default:
          return <Buttons onChange={this.onChange} />
      }
    }

    return (
      <div>
        <div className="buttons">{content()}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pictures: state.pictures.allPics
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
