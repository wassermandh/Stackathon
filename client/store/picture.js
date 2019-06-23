import axios from 'axios'
import history from '../history'
import {runInNewContext} from 'vm'
import env from '../../secrets'
import {faTrophy} from '@fortawesome/free-solid-svg-icons'

/**
 * ACTION TYPES
 */
const GOT_PICTURES = 'GOT_PICTURES'
const ADDED_PICTURE = 'ADDED_PICTURE'
const REMOVED_PIC = 'REMOVED_PIC'
const SET_PICTURE = 'SET_PICTURE'
const UPDATE_PICTURE = 'UPDATE_PICTURE'
const GOT_MY_PICS = 'GOT_MY_PICS'

/**
 * INITIAL STATE
 */
const defaultState = {allPics: [], selectedPic: {}, myPics: []}

/**
 * ACTION CREATORS
 */

export const updatePicture = (
  id,
  title,
  location,
  caption,
  latCoo,
  longCoo
) => {
  return {
    type: UPDATE_PICTURE,
    id,
    title,
    location,
    caption,
    latCoo,
    longCoo
  }
}

const gotPictures = pics => {
  return {
    type: GOT_PICTURES,
    pics
  }
}

const addedPicture = pic => {
  return {
    type: ADDED_PICTURE,
    pic
  }
}

export const setPicture = pic => {
  return {
    type: SET_PICTURE,
    pic
  }
}

const removedPic = pic => {
  return {
    type: REMOVED_PIC,
    pic
  }
}

const gotMyPics = pics => {
  return {
    type: GOT_MY_PICS,
    pics
  }
}

/**
 * THUNK CREATORS
 */
export const updatingPicture = (id, title, location, caption) => {
  return async dispatch => {
    try {
      const payload = {id, title, location, caption}
      const {data} = await axios.put('/api/pics/updatePic', payload)
      dispatch(
        updatePicture(id, title, location, caption, data.latCoo, data.longCoo)
      )
    } catch (err) {
      console.error(err)
    }
  }
}

export const getPictures = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/pics/getPics')
      dispatch(gotPictures(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addPicture = (formData, id) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/pics/uploadPic', formData)
      const imageData = data[0]
      const meta = await axios.post('/api/pics/picInfo', data)
      const metaData = meta.data
      const allImageInfo = {...imageData, ...metaData}
      const newPic = await axios.post('/api/pics/storePic', {allImageInfo, id})
      dispatch(addedPicture(newPic.data))
      history.push('/picUpdate')
    } catch (err) {
      console.log(err)
    }
  }
}

export const removePic = pic => {
  return async dispatch => {
    try {
      await axios.put('/api/pics/deletePic', pic)
      dispatch(removedPic(pic))
    } catch (err) {
      console.log(err)
    }
  }
}

export const gettingMyPics = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`api/pics/${id}/getMypics`)
      dispatch(gotMyPics(data))
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GOT_PICTURES:
      if (action.pics) {
        return {...state, allPics: action.pics}
      } else {
        return {...state}
      }
    case ADDED_PICTURE:
      state.allPics.push(action.pic)
      state.selectedPic = action.pic
      state.myPics.push(action.pic)
      return {...state}
    case REMOVED_PIC:
      let newAllPics = state.allPics.filter(pic => {
        return pic.id !== action.pic.id
      })
      let newMyPics = state.myPics.filter(pic => {
        return pic.id !== action.pic.id
      })
      if (state.selectedPic.id === action.pic.id) {
        state.selectedPic = null
      }
      return {...state, allPics: newAllPics, myPics: newMyPics}
    case UPDATE_PICTURE:
      if (action.title) {
        state.selectedPic.title = action.title
      }
      if (action.location) {
        state.selectedPic.location = action.location
        state.selectedPic.latCoo = action.latCoo
        state.selectedPic.longCoo = action.longCoo
      }
      if (action.caption) {
        state.selectedPic.caption = action.caption
      }
      return {...state}
    case GOT_MY_PICS:
      state.myPics = action.pics
      return {...state}
    case SET_PICTURE:
      state.selectedPic = action.pic
      return {...state}
    default:
      return state
  }
}

// export default function(state = defaultState, action) {
//   switch (action.type) {
//     case SET_PICTURE:
//       return action.pic
//     case UPDATE_PICTURE:
//       if (action.title) {
//         state.title = action.title
//       }
//       if (action.location) {
//         state.location = action.location
//         state.latCoo = action.latCoo
//         state.longCoo = action.longCoo
//       }
//       if (action.caption) {
//         state.caption = action.caption
//       }
//       return {...state}
//     default:
//       return state
//   }
// }
