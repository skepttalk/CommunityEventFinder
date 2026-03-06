import axios from "axios"

const API = import.meta.env.VITE_API_URL 

export const getEvents = async (params: any) => {
  const response = await axios.get(`${API}/events`, { params })
  return response.data.data
}

export const getPopularEvents = async (limit: number = 10) => {
  const response = await axios.get(`${API}/events/popular`, { params: { limit } })
  return response.data.data
}




export const getEventById = async (id: string) => {
  const response = await axios.get(`${API}/events/${id}`)
  return response.data.data
}