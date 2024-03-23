/* eslint-disable no-undef */
import Blog from './Blog'
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './addBlog'

test('renders blog title and author', () => {
  const blog = {
    title: 'Test Title',
    url: 'www.test.com',
    author: 'Test Author',
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Test Title Test Author')
  expect(element).toBeDefined()
},)

test('renders blog title and author using CSS querySelector', () => {
  const blog = {
    title: 'Test Title',
    url: 'www.test.com',
    author: 'Test Author',
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('Test Title Test Author')

},)

test('renders url and likes when button is clicked', async () => {
  const blog = {
    title: 'Test Title',
    url: 'www.test.com',
    author: 'Test Author',
    likes: 25,
  }

  render(<Blog blog={blog} />)

  const user=userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const urlElement = await screen.findByText(`URL: ${blog.url}`)
  const likesElement = await screen.findByText(`Likes: ${blog.likes}`)

  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
}),

test('clicks like button twice', async () => {
  const blog = {
    title: 'Test Title',
    url: 'www.test.com',
    author: 'Test Author',
    likes: 25,
  }

  const addLikesMock = jest.fn()

  render(<Blog blog={blog} addLikes={addLikesMock}/>)

  const user=userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(addLikesMock).toHaveBeenCalledTimes(2)
}),

test('call event handler with right details when a new blog is created', async () => {

  const CreateBlogHandlerMock = jest.fn()

  const user=userEvent.setup()

  const { container } = render(
    <AddBlogForm
      setBlogs={() => {}}
      setNotificationMessage={() => {}}
      setErrorMessage={() => {}}
      CreateBlogHandler={CreateBlogHandlerMock}
    />
  )


  const titleInput = container.querySelector('#Title-input')
  const authorInput = container.querySelector('#Author-input')
  const urlInput = container.querySelector('#URL-input')

  await user.type(titleInput, 'Test Title')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'www.test.com')

  const button = screen.getByText('Create')
  await user.click(button)

  expect(CreateBlogHandlerMock.mock.calls[0][0].title).toBe('Test Title')
  expect(CreateBlogHandlerMock.mock.calls[0][0].author).toBe('Test Author')
  expect(CreateBlogHandlerMock.mock.calls[0][0].url).toBe('www.test.com')
}
)