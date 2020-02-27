import axios from 'axios'
const baseUrl = '/trains'

let token = null

const setToken = newToken => {
  newToken === null
    ? token = null
    : token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const req = await axios.get(baseUrl, config)
  return req.data
}

export default { getAll, setToken }
