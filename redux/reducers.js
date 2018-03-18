import { combineReducers } from 'redux'
import { GET_CONNECTION_SUCCESS, GET_FILES_SUCCESS, GET_JOB_SUCCESS } from './actions'

function connection (state = {}, action) {
  switch (action.type) {
    case GET_CONNECTION_SUCCESS:
      return {...action.payload.options, ...action.payload.current}
    default:
      return state
  }
}

function files (state = [], action) {
  switch (action.type) {
    case GET_FILES_SUCCESS:
      return action.payload.files
    default:
      return state
  }
}

function job (state = {}, action) {
  switch (action.type) {
    case GET_JOB_SUCCESS:
      return {...action.payload.job, progress: action.payload.progress}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  connection,
  files,
  job
})

export default rootReducer
