import axios from 'axios'
import history from '../history'
import {runInNewContext} from 'vm'
import env from '../../secrets'

/**
 * ACTION TYPES
 */
const SET_PICTURE = 'SET_PICTURE'
const UPDATE_PICTURE = 'UPDATE_PICTURE'

/**
 * INITIAL STATE
 */
const defaultState = {}

/**
 * ACTION CREATORS
 */
export const setPicture = pic => {
  return {
    type: SET_PICTURE,
    pic
  }
}

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

//
/**
 * THUNK CREATORS
 */

export const updatingPicture = (id, title, location, caption) => {
  return async dispatch => {
    try {
      const payload = {id, title, location, caption}
      const {data} = await axios.put('/api/pics/updatePic', payload)
      console.log('longCoo', data.longCoo)
      console.log('latCoo', data.latCoo)

      dispatch(
        updatePicture(id, title, location, caption, data.latCoo, data.longCoo)
      )
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case SET_PICTURE:
      return action.pic
    case UPDATE_PICTURE:
      if (action.title) {
        state.title = action.title
      }
      if (action.location) {
        state.location = action.location
        state.latCoo = action.latCoo
        state.longCoo = action.longCoo
      }
      if (action.caption) {
        state.caption = action.caption
      }
      return {...state}
    default:
      return state
  }
}
