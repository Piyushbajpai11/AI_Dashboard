import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaUser, FaEdit, FaHistory, FaChartBar } from 'react-icons/fa';

const ProfileCard = () => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [userContent, setUserContent] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        profileImageUrl: ''
    });

    useEffect(() => {
        fetchProfile();
        fetchUserContent();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfile(response.data);
            setFormData({
                name: response.data.name,
                bio: response.data.bio || '',
                profileImageUrl: response.data.profileImageUrl || ''
            });
        } catch (err) {
            setError('Failed to fetch profile');
            toast.error('Failed to load profile');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserContent = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/content/history', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserContent(response.data);
        } catch (err) {
            toast.error('Failed to load content history');
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                'http://localhost:5000/api/user/profile',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setProfile(response.data.user);
            setIsEditing(false);
            toast.success('Profile updated successfully');
        } catch (err) {
            toast.error('Failed to update profile');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg shadow-sm">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Profile Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    {isEditing ? (
                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                            <div className="flex items-center space-x-4 mb-6">
                                <FaUser className="text-3xl text-blue-600" />
                                <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                                        Bio
                                    </label>
                                    <textarea
                                        id="bio"
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="profileImageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                                        Profile Image URL
                                    </label>
                                    <input
                                        type="url"
                                        id="profileImageUrl"
                                        value={formData.profileImageUrl}
                                        onChange={(e) => setFormData({ ...formData, profileImageUrl: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <div className="flex items-center space-x-6">
                                <div className="relative">
                                    <img
                                        src={profile.profileImageUrl || 'https://via.placeholder.com/96'}
                                        alt={profile.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                                    />
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <FaEdit />
                                    </button>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
                                    <p className="text-gray-600 mt-1">{profile.email}</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <p className="text-gray-700 text-lg">{profile.bio || 'No bio added yet.'}</p>
                            </div>

                            <div className="mt-8 grid grid-cols-3 gap-6">
                                <div className="bg-blue-50 rounded-xl p-4 text-center">
                                    <FaChartBar className="text-2xl text-blue-600 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">Total Content</p>
                                    <p className="text-2xl font-bold text-gray-800">{profile.contentStats.totalGenerated}</p>
                                </div>
                                <div className="bg-green-50 rounded-xl p-4 text-center">
                                    <FaHistory className="text-2xl text-green-600 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">Last Used Type</p>
                                    <p className="text-2xl font-bold text-gray-800">{profile.contentStats.lastUsedType}</p>
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 text-center">
                                    <FaUser className="text-2xl text-purple-600 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">Most Used Tone</p>
                                    <p className="text-2xl font-bold text-gray-800">{profile.contentStats.mostUsedTone}</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
