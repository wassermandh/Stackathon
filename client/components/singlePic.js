import React from 'react'
import {connect} from 'react-redux'
import {updateUsers} from '../store/user'
import {updatingPicture} from '../store/picture'

class PictureUpdateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      location: '',
      caption: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updatingPicture(
      this.props.selectedPic.id,
      this.state.title,
      this.state.location,
      this.state.caption
    )
  }

  render() {
    return (
      <div>
        <h1> Update Your Pic Info!</h1>
        <img src={this.props.selectedPic.url} />
        <form className="form" onSubmit={this.handleSubmit}>
          <ul>
            <div>
              <label> Title: </label>
              <input
                defaultValue={this.props.selectedPic.title}
                name="title"
                type="text"
                onChange={evt => this.setState({title: evt.target.value})}
              />
              <label>Location: </label>
              <input
                defaultValue={this.props.selectedPic.location}
                name="location"
                type="text"
                onChange={evt => this.setState({location: evt.target.value})}
              />
              <label>Caption: </label>
              <textarea
                placeholder={this.props.selectedPic.caption}
                name="caption"
                onChange={evt => this.setState({caption: evt.target.value})}
              />
            </div>
            <button
              type="submit"
              onClick={evt => {
                this.handleSubmit(evt)
              }}
            >
              Submit
            </button>
          </ul>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedPic: state.pictures.selectedPic
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatingPicture: (id, title, location, caption) => {
      dispatch(updatingPicture(id, title, location, caption))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureUpdateForm)
