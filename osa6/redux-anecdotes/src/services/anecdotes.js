import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async (request) => {
    console.log(request)
    const response = await axios.post(baseUrl, {
        content: request.content,
        id: request.id,
        votes: request.votes
    })
    return response.data
}

export default { getAll, addNew }