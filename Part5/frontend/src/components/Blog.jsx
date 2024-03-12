/* eslint-disable react/prop-types */
const Blog = ({ blog }) => (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div>
        {blog.title} {blog.author}
    </div>  
);

export default Blog;