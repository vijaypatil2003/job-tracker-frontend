import API from './axios'

export const createJob = async (data) => {
  const response = await API.post('/jobs', data)
  return response.data
}

export const getAllJobs = async () => {
  const response = await API.get('/jobs')
  return response.data
}

export const getSingleJob = async (id) => {
  const response = await API.get(`/jobs/${id}`)
  return response.data
}

export const updateJob = async (id, data) => {
  const response = await API.put(`/jobs/${id}`, data)
  return response.data
}

export const deleteJob = async (id) => {
  const response = await API.delete(`/jobs/${id}`)
  return response.data
}