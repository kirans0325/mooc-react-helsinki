const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// GET all blogs
blogRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

// GET blog by ID
blogRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// POST a new blog
blogRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  blog.save()
    .then(savedBlog => {
      response.json(savedBlog)
    })
    .catch(error => next(error))
})

// DELETE a blog by ID
blogRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// UPDATE a blog by ID
blogRouter.put('/:id', (request, response, next) => {
  const { title, author, url, likes } = request.body

  Blog.findById(request.params.id)
    .then(blog => {
      if (!blog) {
        return response.status(404).end()
      }

      blog.title = title
      blog.author = author
      blog.url = url
      blog.likes = likes

      return blog.save().then(updatedBlog => {
        response.json(updatedBlog)
      })
    })
    .catch(error => next(error))
})

module.exports = blogRouter
