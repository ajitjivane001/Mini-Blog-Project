import Blog from '../models/Blog.js';

export const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().populate('author', 'name').sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: blogs.length, blogs });
    } catch (error) {
        next(error);
    }
};

export const getBlogById = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name email');
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({ success: true, blog });
    } catch (error) {
        next(error);
    }
};

export const getMyBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({ author: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: blogs.length, blogs });
    } catch (error) {
        next(error);
    }
};

export const createBlog = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.create({
            title,
            content,
            author: req.user._id
        });
        res.status(201).json({ success: true, blog });
    } catch (error) {
        next(error);
    }
};

export const updateBlog = async (req, res, next) => {
    try {
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        // Make sure user is blog owner
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ success: false, message: 'Not authorized to update this blog' });
        }

        blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, blog });
    } catch (error) {
        next(error);
    }
};

export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        // Make sure user is blog owner
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this blog' });
        }

        await blog.deleteOne();

        res.status(200).json({ success: true, message: 'Blog removed' });
    } catch (error) {
        next(error);
    }
};
