import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Edit, Trash2, Plus, Loader2, FileText, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMyBlogs = async () => {
            try {
                const { data } = await api.get('/blogs/myblogs');
                if (data.success) {
                    setBlogs(data.blogs);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyBlogs();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                await api.delete(`/blogs/${id}`);
                setBlogs(blogs.filter(blog => blog._id !== id));
            } catch (error) {
                alert('Failed to delete blog.');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Personal Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage your stories and see how they're performing.</p>
                </div>
                <Link to="/create" className="btn-primary flex items-center gap-2">
                    <Plus size={20} /> Create New Post
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                </div>
            ) : blogs.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Story</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {blogs.map(blog => (
                                    <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <Link to={`/blog/${blog._id}`} className="font-bold text-gray-900 hover:text-indigo-600 block mb-1">
                                                {blog.title}
                                            </Link>
                                            <p className="text-sm text-gray-500 line-clamp-1">{blog.content}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                                Published
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link 
                                                    to={`/edit/${blog._id}`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit Story"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Story"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
                    <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="text-indigo-600" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No stories yet</h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                        You haven't published any blog posts. Start sharing your ideas with the world!
                    </p>
                    <Link to="/create" className="btn-primary inline-flex items-center gap-2">
                        <Plus size={20} /> Write your first story
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
