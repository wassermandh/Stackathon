import axios from 'axios'
import history from '../history'
import {runInNewContext} from 'vm'
import env from '../../secrets'

/**
 * ACTION TYPES
 */
const GOT_PICTURES = 'GOT_PICTURES'
const ADDED_PICTURE = 'ADDED_PICTURE'
const REMOVED_PIC = 'REMOVED_PIC'

/**
 * INITIAL STATE
 */
const defaultState = []

/**
 * ACTION CREATORS
 */
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

const removedPic = pic => {
  return {
    type: REMOVED_PIC,
    pic
  }
}

/**
 * THUNK CREATORS
 */

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

export const addPicture = formData => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/pics/uploadPic', formData)
      const imageData = data[0]
      const meta = await axios.post('/api/pics/picInfo', data)
      const metaData = meta.data
      const allImageInfo = {...imageData, ...metaData}
      const newPic = await axios.post('/api/pics/storePic', allImageInfo)
      dispatch(addedPicture(newPic.data))
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

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GOT_PICTURES:
      return action.pics
    case ADDED_PICTURE:
      state.push(action.pic)
      return [...state]
    case REMOVED_PIC:
      const newState = state.filter(pic => {
        return pic.id !== action.pic.id
      })
      return [...newState]
    default:
      return state
  }
}
