/* globals fetch */

export const GET_CONNECTION_REQUEST = 'GET_CONNECTION_REQUEST'
export const GET_CONNECTION_SUCCESS = 'GET_CONNECTION_SUCCESS'
export const GET_CONNECTION_FAILURE = 'GET_CONNECTION_FAILURE'
export const getConnection = () => fetchAPI(
  {
    request: () => ({type: GET_CONNECTION_REQUEST}),
    success: data => ({type: GET_CONNECTION_SUCCESS, payload: data}),
    failure: reason => ({type: GET_CONNECTION_FAILURE, payload: reason})
  },
  {
    endpoint: 'connection',
    method: 'get',
    body: null
  }
)

export const GET_FILES_REQUEST = 'GET_FILES_REQUEST'
export const GET_FILES_SUCCESS = 'GET_FILES_SUCCESS'
export const GET_FILES_FAILURE = 'GET_FILES_FAILURE'
export const getFiles = () => fetchAPI(
  {
    request: () => ({type: GET_FILES_REQUEST}),
    success: data => ({type: GET_FILES_SUCCESS, payload: data}),
    failure: reason => ({type: GET_FILES_FAILURE, payload: reason})
  },
  {
    endpoint: 'files',
    method: 'get',
    body: null
  }
)

export const GET_JOB_REQUEST = 'GET_JOB_REQUEST'
export const GET_JOB_SUCCESS = 'GET_JOB_SUCCESS'
export const GET_JOB_FAILURE = 'GET_JOB_FAILURE'
export const getJob = () => fetchAPI(
  {
    request: () => ({type: GET_JOB_REQUEST}),
    success: data => ({type: GET_JOB_SUCCESS, payload: data}),
    failure: reason => ({type: GET_JOB_FAILURE, payload: reason})
  },
  {
    endpoint: 'job',
    method: 'get',
    body: null
  }
)

export const GET_PRINTER_REQUEST = 'GET_PRINTER_REQUEST'
export const GET_PRINTER_SUCCESS = 'GET_PRINTER_SUCCESS'
export const GET_PRINTER_FAILURE = 'GET_PRINTER_FAILURE'
export const getPrinter = () => fetchAPI(
  {
    request: () => ({type: GET_PRINTER_REQUEST}),
    success: data => ({type: GET_PRINTER_SUCCESS, payload: data}),
    failure: reason => ({type: GET_PRINTER_FAILURE, payload: reason})
  },
  {
    endpoint: 'printer',
    method: 'get',
    body: null
  }
)

// utility functions
const apiKey = window.localStorage.getItem('api_key')
const fetchAPI = (actions, request) => function (dispatch, getState) {
  dispatch(actions.request())
  fetch(`http://localhost:5000/api/${request.endpoint}`, {
    method: request.method,
    headers: {
      'X-Api-Key': apiKey,
      'Content-Type': 'application/json'
    },
    body: request.body && JSON.stringify(request.body)
  })
    .then(res => {
      switch (res.status) {
        case 200:
          return res.json().then(data => dispatch(actions.success(data)))
        default:
          return res.text().then(text => { throw Error(`${res.statusText}: ${text}`) })
      }
    })
    .catch(reason => dispatch(actions.failure(reason.message)))
}
