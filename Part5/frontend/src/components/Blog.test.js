/* eslint-disable no-undef */
import Blog from './Blog'
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


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
})