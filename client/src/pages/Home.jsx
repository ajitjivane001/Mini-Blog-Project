import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import BlogCard from '../components/BlogCard';
import { Sparkles, Loader2 } from 'lucide-react';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await api.get('/blogs');
                if (data.success) {
                    setBlogs(data.blogs);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <header className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold mb-4">
                    <Sparkles size={16} />
                    Latest Stories
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Explore New Perspectives
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    A collection of stories, thoughts, and ideas from our growing community of writers.
                </p>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                    <p className="text-gray-500 font-medium">Loading amazing stories...</p>
                </div>
            ) : blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map(blog => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">No blogs found. Be the first to write something!</p>
                </div>
            )}
        </div>
    );
};

export default Home;
