import commonAPI from "./commonAPI"
import { server_url } from "./server_url"

export const registerUserAPI = async (userData) => {
  return await commonAPI('POST', `${server_url}/Users`, userData)
}

export const getUsersAPI = async () => {
  return await commonAPI('GET', `${server_url}/Users`, "")
}

export const addWatchlistAPI = async (listData) => {
  return await commonAPI('POST', `${server_url}/Watchlist`, listData)
}

export const getAllWatchlistsAPI = async () => {
  return await commonAPI('GET', `${server_url}/Watchlist`, "")
}

export const updateWatchlistAPI = async (id, listData) => {
  return await commonAPI('PUT', `${server_url}/Watchlist/${id}`, listData)
}

export const deleteWatchlistAPI = async (id) => {
  return await commonAPI('DELETE', `${server_url}/Watchlist/${id}`, "")
}