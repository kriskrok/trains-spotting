import axios from 'axios'
const baseUrl = '/api/users'

const create = async (userObject) => {
  const postedUser = await axios.post(baseUrl, userObject)
  return postedUser.data
}

const find = async (username) => {
  const result = await axios.get(`${baseUrl}/${username}`)
  return result.data
}

const getAttributes = async () => {
  const result = await axios.get(`${baseUrl}/protected`)
  return result.data
}

const getToken = async () => {
  const result = await axios.get(`${baseUrl}/token`)
  return result.data
}

const getIDToken = async () => {
  const result = await axios.get(`${baseUrl}/id-token`)
  return result.data
}

const getSessionIndex = async () => {
  const result = await axios.get(`${baseUrl}/session-index`)
  return result.data
}

export default { create, find, getAttributes, getSessionIndex, getToken, getIDToken }
