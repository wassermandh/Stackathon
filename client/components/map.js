import React, {useState, Component} from 'react'
import {connect} from 'react-redux'
import {Navbar} from './navbar'
import Routes from '../routes'
import ReactMapGL, {Marker} from 'react-map-gl'
import env from '../../secrets'

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 40.7047,
    longitude: -74.0094,
    width: '75vw',
    height: '75vh',
    zoom: 12
  })
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/wassermandh/cjx53ik37a8xl1cqspghlj5v0"
        mapboxApiAccessToken={env.MAP_BOX_TOKEN}
        onViewportChange={newViewport => {
          setViewport(newViewport)
        }}
      >
        markers here
      </ReactMapGL>
    </div>
  )
}

export default connect(null, null)(Map)
