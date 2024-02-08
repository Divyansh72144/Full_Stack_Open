const listHelper = require('./list_helper');

describe('dummy function', () => {
  test('returns one', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe('totalLikes function', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [];
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(36);
  });
});

describe('favouriteBlog function', () => {
  test('returns the most liked blog', () => {
    const result = listHelper.favouriteBlog(listHelper.sampleBlogs);
    expect(result).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    });
  });
});

describe('mostBlogs function', () => {
  test('returns the author with the most blogs', () => {
    const result = listHelper.mostBlogs(listHelper.sampleBlogs);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('mostLikes function', () => {
  test('returns the author with the most likes', () => {
    const result = listHelper.mostLikes(listHelper.sampleBlogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});
