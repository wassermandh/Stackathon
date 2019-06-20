import React, {useState} from 'react'
import {Navbar} from './components'
import Routes from './routes'
import ReactMapGL, {Marker} from 'react-map-gl'
import env from '../secrets'

const App = () => {
  const [viewport, setViewport] = useState({
    latitude: 40.7047,
    longitude: -74.0094,
    width: '100vw',
    height: '100vh',
    zoom: 10
  })
  return (
    <div>
      <Navbar />
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
      <Routes />
    </div>
  )
}

export default App
