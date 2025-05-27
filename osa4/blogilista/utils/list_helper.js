const dummy = (blogs) => {
    return 1
}

const totalVotes = (blogs) => {
    let total = 0
    blogs.map(blog => {
        total += blog.votes
    })

    return total
}

module.exports = {
    dummy,
    totalVotes
}