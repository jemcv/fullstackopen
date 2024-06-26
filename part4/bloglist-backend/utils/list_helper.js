var _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog);
}

const mostBlogs = (blogs) => {  
    const count = _.countBy(blogs, 'author')
    return blogs.reduce((authorWithMostBlogs, currentBlog) => {
        if(count[currentBlog.author] > count[authorWithMostBlogs.author]) {
            return currentBlog;
        } else {
            return authorWithMostBlogs;
        }
    })
}

const mostLikes = (blogs) => {
    return blogs.reduce((blogWithMostLikes, currentBlog) => {
        if(currentBlog.likes > blogWithMostLikes.likes) {
            return currentBlog;
        } else {
            return blogWithMostLikes;
        }
    });
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
