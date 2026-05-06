import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const shortenUrl = (url, customSlug) =>
  api.post('/shorten', { url, customSlug }).then(r => r.data)

export const getAllUrls = () =>
  api.get('/urls').then(r => r.data)

export const deleteUrl = (slug) =>
  api.delete(`/urls/${slug}`).then(r => r.data)
