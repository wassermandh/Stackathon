import React from 'react'
import {connect} from 'react-redux'
import {updateUsers} from '../store/user'
import {updatingPicture} from '../store/picture'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
        <h1 style={{textAlign: 'center'}}> Update Your Pic Info!</h1>
        <div style={{display: 'flex'}}>
          <img src={this.props.selectedPic.url} />
          <form className="form" onSubmit={this.handleSubmit}>
            <ul>
              <div>
                <TextField
                  label="Title"
                  defaultValue={this.props.selectedPic.title}
                  name="title"
                  onChange={evt => this.setState({title: evt.target.value})}
                />
                <TextField
                  label="Location"
                  defaultValue={this.props.selectedPic.location}
                  onChange={evt => this.setState({location: evt.target.value})}
                />
                <TextField
                  label="Caption"
                  defaultValue={this.props.selectedPic.caption}
                  onChange={evt => this.setState({caption: evt.target.value})}
                  multiline={true}
                  rows={3}
                />
              </div>
              <Button
                label="Update here"
                style={{marginLeft: '1.6em'}}
                type="submit"
                onClick={evt => {
                  this.handleSubmit(evt)
                }}
              >
                Submit
              </Button>
            </ul>
          </form>
        </div>
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
