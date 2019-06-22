import React, {useState, Component, useEffect} from 'react'
import {connect} from 'react-redux'
import {Navbar} from './navbar'
import Routes from '../routes'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import env from '../../secrets'
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
    return (
      <div>
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
              <div>
                <h2>{this.state.selectedPic.brand}</h2>
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
    pictures: state.pictures.allPics
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
