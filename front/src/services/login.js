import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const oauthLogin = async  () => {
  const response = await axios.get(`${baseUrl}/oauth`)

  return response.data.url
}

const logout = async () => {
  const response = await  axios.get('/api/logout')

  return response.data.logoutURI
}

export default { login, logout, oauthLogin }
