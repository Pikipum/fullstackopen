const User = require ('../models/user')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        blogUrl: "https://reactpatterns.com/",
        votes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        blogUrl: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        votes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        blogUrl: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        votes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        blogUrl: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        votes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        blogUrl: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        votes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        blogUrl: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        votes: 2,
        __v: 0
    }
]

const testBlog = {
    'id': "1234567789",
    'title': "Testing API",
    'author': "John Tester",
    'blogUrl': "https://testingstuff.com/",
    'votes': 7,
    '__v': 0
}

const blogWithNoVotes = {
    'id': "333333333",
    'title': "Testing API",
    'author': "John Tester",
    'blogUrl': "https://testingstuff.com/"
}

const blogWithNoTitle = {
    'id': "22222222222",
    'author': "John TitleTester",
    'blogUrl': "https://testingstuff.com/",
    'votes': 7,
    '__v': 0
}

const blogWithNoUrl = {
    'id': "11111111111",
    'title': "Testing URL",
    'author': "John UrlTester",
    'votes': 7,
    '__v': 0
}

const updatedBlog = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction VERSION 2",
    author: "Edsger W. Dijkstra Jr.",
    blogUrl: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    votes: 200,
    __v: 0
}

const initialUsers = [
    {
        _id: "423425252357",
        name: "Michel Chan",
        username: "MichaelChan12",
        passwordHash: "michaelspassword",
        notes: [],
        __v: 0
    },
    {
        _id: "422412432357",
        name: "Edsger Dijkstra",
        username: "BigD12",
        passwordHash: "dijsktraspassword",
        notes: [],
        __v: 0
    },
    {
        _id: "42321157",
        name: "John User",
        username: "User1337",
        passwordHash: "password123",
        notes: [],
        __v: 0
    }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = { 
    initialBlogs, 
    testBlog, 
    blogWithNoVotes, 
    blogWithNoTitle, 
    blogWithNoUrl, 
    updatedBlog,
    usersInDb,
    initialUsers
 }