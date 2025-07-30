import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async (request) => {
    console.log(request)
    const response = await axios.post(baseUrl, {
        content: request,
        votes: 0
    })
    return response.data
}

const update = async (request) => {
  const response = await axios.put(`${baseUrl}/${request.id}`, request)
  return response.data
}

export default { getAll, addNew, update }