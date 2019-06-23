import React, {useState, Component, useEffect} from 'react'
import {connect} from 'react-redux'
import {Navbar} from './navbar'
import Routes from '../routes'
import {Link} from 'react-router-dom'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import env from '../../secrets'
import Typography from '@material-ui/core/Typography'
import {getPictures} from '../store/picture'

class Map extends Component {
  componentDidMount() {
    this.props.getPictures()
  }
  constructor(props) {
    super(props)
    this.state = {
      latitude: 40.7047,
      longitude: -74.0094,
      width: '75vw',
      height: '75vh',
      zoom: 15,
      selectedPic: null
    }
  }
  render() {
    const {selectedPic} = this.state
    return (
      <div>
        {this.props.user.id ? (
          ''
        ) : (
          <Typography variant="h4" style={{margin: '.5em'}}>
            <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>{' '}
            to upload a picture
          </Typography>
        )}
        <ReactMapGL
          {...this.state}
          mapStyle="mapbox://styles/wassermandh/cjx53ik37a8xl1cqspghlj5v0"
          mapboxApiAccessToken={env.MAP_BOX_TOKEN}
          onViewportChange={state => {
            this.setState(state)
          }}
        >
          {this.props.pictures.map(pic => {
            return (
              <Marker
                key={pic.id}
                longitude={Number(pic.longCoo)}
                latitude={Number(pic.latCoo)}
              >
                <button
                  className="marker-btn"
                  onClick={e => {
                    e.preventDefault()
                    this.setState({
                      selectedPic: pic
                    })
                  }}
                >
                  <img src="https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png" />
                </button>
              </Marker>
            )
          })}
          {this.state.selectedPic ? (
            <Popup
              longitude={Number(this.state.selectedPic.longCoo)}
              latitude={Number(this.state.selectedPic.latCoo)}
              onClose={() => this.setState({selectedPic: null})}
            >
              <div id="popup">
                <Typography>{this.state.selectedPic.title}</Typography>
                <img src={selectedPic.url} />
                <p>{selectedPic.caption}</p>
                <p>
                  Taken with the {selectedPic.brand} {selectedPic.model}
                </p>
                <p>Location: {selectedPic.location}</p>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
    )
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
    getPictures: () => {
      dispatch(getPictures())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
