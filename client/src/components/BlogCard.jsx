import React from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, ArrowRight } from 'lucide-react';

const BlogCard = ({ blog }) => {
    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <article className="card group">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-4 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1">
                        <User size={14} className="text-indigo-500" />
                        {blog.author?.name || 'Anonymous'}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-1">
                        <Calendar size={14} className="text-indigo-500" />
                        {formattedDate}
                    </span>
                </div>

                <Link to={`/blog/${blog._id}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {blog.title}
                    </h3>
                </Link>

                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {blog.content}
                </p>

                <Link 
                    to={`/blog/${blog._id}`} 
                    className="inline-flex items-center gap-2 text-indigo-600 font-semibold text-sm group/btn"
                >
                    Read More 
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
            </div>
        </article>
    );
};

export default BlogCard;
