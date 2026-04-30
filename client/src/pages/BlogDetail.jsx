import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, ArrowLeft, Edit, Trash2, Loader2, Share2 } from 'lucide-react';

const BlogDetail = () => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await api.get(`/blogs/${id}`);
                if (data.success) {
                    setBlog(data.blog);
                }
            } catch (err) {
                setError('Story not found or server error.');
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Delete this story?')) {
            try {
                await api.delete(`/blogs/${id}`);
                navigate('/dashboard');
            } catch (error) {
                alert('Failed to delete.');
            }
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        </div>
    );

    if (error || !blog) return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Story not found'}</h2>
            <Link to="/" className="text-indigo-600 font-bold flex items-center justify-center gap-2">
                <ArrowLeft size={18} /> Back to Home
            </Link>
        </div>
    );

    const isOwner = user && user.id === blog.author._id;

    return (
        <div className="container mx-auto px-4 max-w-3xl py-12">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-medium mb-10 transition-colors">
                <ArrowLeft size={18} /> Back to feed
            </Link>

            <article>
                <header className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xl font-bold">
                                {blog.author.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{blog.author.name}</p>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <Calendar size={14} />
                                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {isOwner ? (
                                <>
                                    <Link 
                                        to={`/edit/${blog._id}`}
                                        className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                        title="Edit"
                                    >
                                        <Edit size={20} />
                                    </Link>
                                    <button 
                                        onClick={handleDelete}
                                        className="p-2.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </>
                            ) : (
                                <button className="p-2.5 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
                                    <Share2 size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                <div className="prose prose-indigo prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {blog.content}
                </div>
            </article>

            <footer className="mt-16 pt-8 border-t border-gray-100 text-center">
                <p className="text-gray-500 mb-4">Enjoyed this story?</p>
                <div className="flex justify-center gap-4">
                    <button className="btn-primary px-8">Follow {blog.author.name.split(' ')[0]}</button>
                </div>
            </footer>
        </div>
    );
};

export default BlogDetail;
