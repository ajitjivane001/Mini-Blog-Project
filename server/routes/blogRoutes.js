import express from 'express';
import { 
    getAllBlogs, 
    getBlogById, 
    getMyBlogs, 
    createBlog, 
    updateBlog, 
    deleteBlog 
} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/myblogs', protect, getMyBlogs);
router.get('/:id', getBlogById);
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

export default router;
