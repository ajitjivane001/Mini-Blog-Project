import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import { Save, X, Loader2, AlertCircle, FileText, Type, Layout } from 'lucide-react';

const Editor = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState('');
    
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            const fetchBlog = async () => {
                setFetching(true);
                try {
                    const { data } = await api.get(`/blogs/${id}`);
                    if (data.success) {
                        setTitle(data.blog.title);
                        setContent(data.blog.content);
                    }
                } catch (err) {
                    setError('Failed to load blog data.');
                } finally {
                    setFetching(false);
                }
            };
            fetchBlog();
        }
    }, [id, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEditMode) {
                await api.put(`/blogs/${id}`, { title, content });
            } else {
                await api.post('/blogs', { title, content });
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save blog post.');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 max-w-4xl py-12">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        {isEditMode ? 'Edit Your Story' : 'Write a New Story'}
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Capture your thoughts and share them with the world.
                    </p>
                </div>
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Cancel"
                >
                    <X size={24} />
                </button>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-3">
                    <AlertCircle size={20} />
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                            <Type size={16} className="text-indigo-500" /> Story Title
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full text-2xl font-bold px-0 py-2 border-b-2 border-gray-100 focus:border-indigo-600 focus:outline-none transition-colors placeholder:text-gray-300"
                            placeholder="Enter a catchy title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                            <Layout size={16} className="text-indigo-500" /> Story Content
                        </label>
                        <textarea
                            required
                            rows="12"
                            className="w-full px-0 py-2 text-lg text-gray-700 resize-none focus:outline-none placeholder:text-gray-300 border-none"
                            placeholder="Tell your story..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 rounded-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        Discard
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary flex items-center gap-2 px-8 py-2.5"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        {isEditMode ? 'Update Story' : 'Publish Story'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Editor;
