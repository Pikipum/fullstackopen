const dummy = (blogs) => {
    return 1
}

const totalVotes = (blogs) => {

    return blogs.reduce(
        (total, blog) => total + blog.votes, 0)
}

module.exports = {
    dummy,
    totalVotes
}