import React from 'react'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {gettingMyPics, removePic, setPicture} from '../store/picture'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import GridList from '@material-ui/core/GridList'
import ListSubheader from '@material-ui/core/ListSubheader'
import TextField from '@material-ui/core/TextField'
import * as contentful from 'contentful'
import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
// import InfoIcon from '@material-ui/icons/Info'
import Typography from '@material-ui/core/Typography'
// import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
// import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
// import Button from '@material-ui/core/Button'

const classes = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
}

// const classes = useStyles()

class images extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getMyPics(this.props.user.id)
  }
  titleClick(image) {
    this.props.setPicture(image)
  }
  render() {
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="subheader" cols={2} style={{height: 'auto'}}>
            <ListSubheader component="div" style={{margin: '.5em'}}>
              <Typography variant="h4">Your Pics</Typography>
            </ListSubheader>
          </GridListTile>
          {this.props.pictures.map((image, i) => {
            return (
              <GridListTile key={image.id}>
                <img src={image.url} />
                <GridListTileBar
                  title={
                    <div>
                      <span onClick={() => this.titleClick(image)}>
                        {image.title ? image.title : image.url}
                      </span>
                      <Button
                        style={{color: 'red'}}
                        onClick={() => this.titleClick(image)}
                      >
                        Edit
                      </Button>
                    </div>
                  }
                  subtitle={image.caption}
                  actionIcon={
                    <div
                      className="font-icon-wrapper"
                      onClick={() => this.props.removePic(image)}
                    >
                      <IconButton aria-label="Remove" className={classes.icon}>
                        Remove
                      </IconButton>
                    </div>
                  }
                />
              </GridListTile>
            )
          })}
        </GridList>
      </div>
    )
  }
}
//            {this.props.pictures.map((image, i) => {
//             return (
//               <GridListTileBar item id="picList " key={i} className="fadein">
//                 <div
//                   onClick={() => this.props.removePic(image)}
//                   className="delete"
//                 >
//                   <FontAwesomeIcon icon={faTimesCircle} size="2x" />
//                 </div>
//                 <h2>
//                   <Link
//                     to="/picUpdate"
//                     onClick={() => this.props.setPicture(image)}
//                   >
//                     {image.title ? image.title : image.url}
//                   </Link>
//                 </h2>
//                 <img src={image.url} alt="" />
//               </GridListTileBar>
//             )
//           })}
//         </GridListTileBar>
//       </div>
//     )
//   }
// }
// props.images.map((image, i) => (
//   <div id="picList " key={i} className="fadein">
//     <div onClick={() => props.removeImage(image)} className="delete">
//       <FontAwesomeIcon icon={faTimesCircle} size="2x" />
//     </div>
//     <h2>
//       <Link to="/picUpdate" onClick={() => props.setPicture(image)}>
//         {image.url}
//       </Link>
//     </h2>
//     <img src={image.url} alt="" />
//   </div>
// ))

const mapStateToProps = state => {
  return {
    pictures: state.pictures.myPics,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMyPics: id => {
      dispatch(gettingMyPics(id))
    },
    removePic: pic => {
      dispatch(removePic(pic))
    },
    setPicture: pic => {
      dispatch(setPicture(pic))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(images)
