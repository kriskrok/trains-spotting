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

export default { create, find }
