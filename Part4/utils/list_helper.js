const dummy = (blogs) => 1;
// eslint-disable-next-line import/no-extraneous-dependencies
const _ = require('lodash');
const User = require('../models/user')


const sampleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const blogCounts = _.countBy(blogs, 'author');

  const maxBlogsAuthor = _.maxBy(Object.keys(blogCounts), (author) => blogCounts[author]);

  return { author: maxBlogsAuthor, blogs: blogCounts[maxBlogsAuthor] };
};

const totalLikes = () => sampleBlogs.reduce((total, blog) => total + blog.likes, 0);

const favouriteBlog = () => {
  if (sampleBlogs.length === 0) {
    return null; // Return null if the list of blogs is empty
  }

  return sampleBlogs.reduce((maxLikedBlog, currentBlog) => (currentBlog.likes > maxLikedBlog.likes ? currentBlog : maxLikedBlog));
};

const mostLikes = (blogs) => {
  const likesByAuthor = {};

  blogs.forEach((blog) => {
    if (!likesByAuthor[blog.author]) {
      likesByAuthor[blog.author] = blog.likes;
    } else {
      likesByAuthor[blog.author] += blog.likes;
    }
  });

  let mostLikedAuthor = null;
  let maxLikes = -1;

  for (const [author, likes] of Object.entries(likesByAuthor)) {
    if (likes > maxLikes) {
      mostLikedAuthor = author;
      maxLikes = likes;
    }
  }

  return { author: mostLikedAuthor, likes: maxLikes };
};

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}



module.exports = {
  dummy,
  sampleBlogs,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  usersInDb
};
