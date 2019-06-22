import React, {Component} from 'react'
import Spinner from './spinner'
import {connect} from 'react-redux'
import axios from 'axios'
import Images from './images'
import Buttons from './buttons'

class UploadImages extends Component {
  state = {
    uploading: false,
    allImageInfo: []
  }

  onChange = async e => {
    const files = Array.from(e.target.files)
    this.setState({uploading: true})

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })
    const {data} = await axios.post('/api/pics/uploadPic', formData)
    const imageData = data[0]
    const meta = await axios.post('/api/pics/picInfo', data)
    const metaData = meta.data
    const allImageInfo = {...imageData, ...metaData}
    console.log(allImageInfo)
    this.setState({
      uploading: false,
      allImageInfo: [allImageInfo]
    })
  }

  removeImage = id => {
    this.setState({
      allImageInfo: this.state.allImageInfo.filter(
        image => image.public_id !== id
      )
    })
  }

  render() {
    const {uploading, allImageInfo} = this.state

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />
        case allImageInfo.length > 0:
          return <Images images={allImageInfo} removeImage={this.removeImage} />
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
