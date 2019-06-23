import React, {useState, Component} from 'react'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'
import ReactMapGL, {Marker} from 'react-map-gl'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default connect(null, null)(App)
