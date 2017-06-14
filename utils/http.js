import axios from 'axios'
import * as Cookies from 'js-cookie'

var http = axios.create({
  baseURL: 'http://localhost:3002/',
  headers: {
    Authorization: 'bearer ' + Cookies.get('at')
  }
})

export default http
