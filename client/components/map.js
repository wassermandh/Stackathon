import React, {useState, Component, useEffect} from 'react'
import {connect} from 'react-redux'
import {Navbar} from './navbar'
import Routes from '../routes'
import {Link} from 'react-router-dom'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import env from '../../secrets'
import Typography from '@material-ui/core/Typography'
import {getPictures} from '../store/picture'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'

const classes = {
  card: {
    maxWidth: 345
  }
}
const backgroundImage =
  'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Azure.png'

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
      <div
        style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
      >
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
          mapboxApiAccessToken="pk.eyJ1Ijoid2Fzc2VybWFuZGgiLCJhIjoiY2p4NTF4eGpnMDVwMzN5cGkwazA0MGM0YSJ9.ULU_wkBpnO9Qc6Cx-SWVdg"
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
                offsetLeft={-20}
                offsetTop={-10}
              >
                <button
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer'
                  }}
                  type="button"
                  className="marker-btn"
                  onClick={e => {
                    e.preventDefault()
                    this.setState({
                      selectedPic: pic
                    })
                  }}
                >
                  <img
                    style={{width: '30px', height: '30px', maxWidth: '100%'}}
                    alt="map marker"
                    src="https://www.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png"
                  />
                </button>
              </Marker>
            )
          })}
          {this.state.selectedPic ? (
            <Popup
              id="popup"
              longitude={Number(this.state.selectedPic.longCoo)}
              latitude={Number(this.state.selectedPic.latCoo)}
              onClose={() => this.setState({selectedPic: null})}
            >
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    style={{margin: 'auto'}}
                    image={selectedPic.url}
                    title={selectedPic.title}
                  />
                  <CardContent>
                    <Typography
                      style={{textAlign: 'center'}}
                      variant="h4"
                      color="black"
                      component="h3"
                    >
                      {selectedPic.title}
                    </Typography>
                    <Typography variant="h5" color="black" component="h4">
                      {selectedPic.caption}
                    </Typography>
                    <Typography color="black" component="p">
                      This picture was taken with the {selectedPic.brand}{' '}
                      {selectedPic.model} at {selectedPic.location}
                    </Typography>
                    <Typography
                      style={{fontStyle: 'italic'}}
                      color="black"
                      component="p"
                    >
                      Time of photo: {selectedPic.time}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
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
