import React, {Component} from 'react'
import Spinner from './spinner'
import {connect} from 'react-redux'
import axios from 'axios'
import Images from './images'
import Buttons from './buttons'

class UploadImages extends Component {
  // state = {
  //   uploading: false,
  //   images: []
  // }

  onChange = async e => {
    const files = Array.from(e.target.files)
    this.setState({uploading: true})

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })
    const {data} = await axios.post('/api/uploadPic', formData)
    const imageData = data[0]
    const meta = await axios.post('/api/picInfo', data)
    const metaData = meta.data
    const allImageInfo = {...imageData, ...metaData}
    console.log(allImageInfo)
    // fetch('api/uploadPic', {
    //   method: 'POST',
    //   body: formData
    // })
    //   .then(res => res.json())
    //   .then(images => {
    //     this.setState({
    //       uploading: false,
    //       images
    //     })
    //   })
  }

  removeImage = id => {
    // this.setState({
    //   images: this.state.images.filter(image => image.public_id !== id)
    // })
  }

  render() {
    const {uploading, images} = this.state

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />
        case images.length > 0:
          return <Images images={images} removeImage={this.removeImage} />
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

export default connect(null, null)(UploadImages)
