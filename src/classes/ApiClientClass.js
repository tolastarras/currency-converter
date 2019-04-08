import axios from 'axios'

export default class Api {
  client (baseURL) {
    return axios.create({
      baseURL,
      withCredentials: false,
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}
