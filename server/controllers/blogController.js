const Blog = require('../models/Blog');
const User = require('../models/User');

const createBlog = async (req, res) => {
  const { title, content, summary, tags, imageUrl } = req.body;
  try {
    if (!title || !content) return res.status(400).json({ message: 'Title and content are required' });
    const authorId = req.user.id;
    const newBlog = await Blog.create({ title, content, summary, tags, imageUrl: imageUrl || null, authorId });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      order: [['createdAt', 'DESC']],
      include: { model: User, attributes: ['name'] },
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      include: { model: User, attributes: ['name'] },
    });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.authorId !== req.user.id) return res.status(403).json({ message: 'User not authorized' });
    const updatedBlog = await blog.update(req.body);
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.authorId !== req.user.id) return res.status(403).json({ message: 'User not authorized' });
    await blog.destroy();
    res.status(200).json({ message: 'Blog removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };