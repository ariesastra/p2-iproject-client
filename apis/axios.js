import axios from 'axios'

const server = axios.create({
  // baseURL: "http://localhost:5000" // Localhost
  baseURL: "https://tetangga-service.herokuapp.com/" // Production
})

export {
  server
}