import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaFilter, FaSort, FaCopy, FaCheck, FaTrash } from 'react-icons/fa';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [filterType, setFilterType] = useState('all');
    const [copiedId, setCopiedId] = useState(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/content/history', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setHistory(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch history');
            setLoading(false);
        }
    };

    const handleCopy = async (content, id) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token not found. Please login again.');
                return;
            }

            const response = await axios.delete(`http://localhost:5000/api/content/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setHistory(history.filter(item => item._id !== id));
                setDeleteConfirmId(null);
            }
        } catch (err) {
            console.error('Delete error:', err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(err.response.data.message || 'Failed to delete content');
            } else if (err.request) {
                // The request was made but no response was received
                setError('No response from server. Please check your connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('Error setting up the request');
            }
        }
    };

    const filteredHistory = history
        .filter(item => {
            const matchesSearch = item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.content.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'all' || item.type === filterType;
            return matchesSearch && matchesType;
        })
        .sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
            return 0;
        });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">Content History</h1>
                        <div className="flex gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search history..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Types</option>
                                <option value="blog">Blog Posts</option>
                                <option value="tweet">Tweets</option>
                                <option value="linkedin">LinkedIn Posts</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 text-red-500">{error}</div>
                    ) : filteredHistory.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">No content found</div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredHistory.map((item) => (
                                <div key={item._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                            </span>
                                            <p className="text-sm text-gray-500 mt-2">
                                                {formatDate(item.createdAt)}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleCopy(item.content, item._id)}
                                                className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                                            >
                                                {copiedId === item._id ? (
                                                    <>
                                                        <FaCheck className="text-green-500" />
                                                        <span>Copied!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaCopy />
                                                        <span>Copy</span>
                                                    </>
                                                )}
                                            </button>
                                            {deleteConfirmId === item._id ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-medium"
                                                    >
                                                        Confirm
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteConfirmId(null)}
                                                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700 font-medium"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setDeleteConfirmId(item._id)}
                                                    className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:text-red-700"
                                                >
                                                    <FaTrash />
                                                    <span>Delete</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.topic}</h3>
                                    <p className="text-gray-600 line-clamp-3">{item.content}</p>
                                    <div className="mt-4 flex gap-2">
                                        <span className="text-sm text-gray-500">Tone: {item.tone}</span>
                                        <span className="text-sm text-gray-500">Length: {item.length}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;
