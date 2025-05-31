import React, { useState } from 'react';
import axios from 'axios';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaArrowUp, FaCopy, FaCheck } from 'react-icons/fa';

const CopyButton = ({ content }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
            {copied ? (
                <>
                    <FaCheck className="text-green-500" />
                    <span>Copied!</span>
                </>
            ) : (
                <>
                    <FaCopy />
                    <span>Copy Content</span>
                </>
            )}
        </button>
    );
};

const ContentDisplay = ({ content }) => {
    if (!content) return null;

    // Split content into lines and process each line
    const formattedContent = content.split('\n').map((line, index) => {
        // Handle headings
        if (line.startsWith('# ')) {
            return <h1 key={index} className="text-3xl font-bold mb-4">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-bold mb-3">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-bold mb-2">{line.substring(4)}</h3>;
        }
        // Handle paragraphs
        if (line.trim()) {
            return <p key={index} className="mb-4">{line}</p>;
        }
        return <br key={index} />;
    });

    return (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
            {formattedContent}
            <div className="mt-6 flex justify-end">
                <CopyButton content={content} />
            </div>
        </div>
    );
};

const ContentForm = () => {
    const [formData, setFormData] = useState({
        type: 'blog',
        topic: '',
        tone: 'professional',
        length: 'medium',
        useEmoji: 'yes',
        format: {
            tweet: {
                includeHashtags: true,
                includeCallToAction: true
            },
            linkedin: {
                includeHashtags: true,
                includeCallToAction: true,
                includeProfessionalTitle: true
            }
        }
    });

    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult('');

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                'http://localhost:5000/api/content/generate',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setResult(res.data.content);
        } catch (error) {
            console.error('Error generating content:', error);
            setError(error.response?.data?.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <div className="relative flex bg-white shadow-[0_0_1px_rgba(24,94,224,0.15),0_6px_12px_rgba(24,94,224,0.15)] px-3 py-2 rounded-full w-fit">
                <span
                    className={`absolute top-2 left-2 h-[30px] w-[100px] rounded-full bg-[#e6eef9] transition-transform duration-300 ease-out z-0 ${formData.type === "tweet"
                        ? "translate-x-[100%]"
                        : formData.type === "linkedin"
                            ? "translate-x-[200%]"
                            : "translate-x-0"
                        }`}
                />
                {["blog", "tweet", "linkedin"].map((type) => (
                    <label
                        key={type}
                        htmlFor={`type-${type}`}
                        className={`relative z-10 flex items-center justify-center h-[30px] w-[100px] text-[0.85rem] font-medium cursor-pointer rounded-full transition-colors duration-150 ${formData.type === type ? "text-blue-600" : "text-black"
                            }`}
                    >
                        <input
                            type="radio"
                            id={`type-${type}`}
                            name="content-type"
                            value={type}
                            checked={formData.type === type}
                            onChange={() => setFormData({ ...formData, type })}
                            className="hidden"
                        />
                        {type === "blog"
                            ? "Blog Post"
                            : type === "tweet"
                                ? "Tweet"
                                : "LinkedIn Post"}
                    </label>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mt-8 mb-6">
                    <input
                        type="text"
                        id="topic"
                        name="topic"
                        placeholder="What would you like me to write about?"
                        value={formData.topic}
                        onChange={handleChange}
                        required
                        className="w-full p-6 rounded-lg text-lg bg-white focus:outline-none focus:ring-0 focus:border-none"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-6">
                    <div className="relative flex bg-white shadow-[0_0_1px_rgba(24,94,224,0.15),0_6px_12px_rgba(24,94,224,0.15)] px-3 py-2 rounded-full w-fit">
                        <span
                            className={`absolute top-2 left-2 h-[30px] w-[100px] rounded-full bg-[#e6eef9] transition-transform duration-300 ease-out z-0 ${formData.tone === "witty"
                                ? "translate-x-[100%]"
                                : formData.tone === "friendly"
                                    ? "translate-x-[200%]"
                                    : "translate-x-0"
                                }`}
                        />
                        {["professional", "witty", "friendly"].map((tone) => (
                            <label
                                key={tone}
                                htmlFor={`tone-${tone}`}
                                className={`relative z-10 flex items-center justify-center h-[30px] w-[100px] text-[0.85rem] font-medium cursor-pointer rounded-full transition-colors duration-150 ${formData.tone === tone ? "text-blue-600" : "text-black"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    id={`tone-${tone}`}
                                    name="tone"
                                    value={tone}
                                    checked={formData.tone === tone}
                                    onChange={() => setFormData({ ...formData, tone })}
                                    className="hidden"
                                />
                                {tone.charAt(0).toUpperCase() + tone.slice(1)}
                            </label>
                        ))}
                    </div>

                
                    <div className="relative flex bg-white shadow-[0_0_1px_rgba(24,94,224,0.15),0_6px_12px_rgba(24,94,224,0.15)] px-3 py-2 rounded-full w-fit">
                        <span
                            className={`absolute top-2 left-2 h-[30px] w-[80px] rounded-full bg-[#e6eef9] transition-transform duration-300 ease-out z-0 ${formData.length === "medium"
                                ? "translate-x-[100%]"
                                : formData.length === "long"
                                    ? "translate-x-[200%]"
                                    : "translate-x-0"
                                }`}
                        />
                        {["short", "medium", "long"].map((length) => (
                            <label
                                key={length}
                                htmlFor={`length-${length}`}
                                className={`relative z-10 flex items-center justify-center h-[30px] w-[80px] text-[0.85rem] font-medium cursor-pointer rounded-full transition-colors duration-150 ${formData.length === length ? "text-blue-600" : "text-black"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    id={`length-${length}`}
                                    name="length"
                                    value={length}
                                    checked={formData.length === length}
                                    onChange={() => setFormData({ ...formData, length })}
                                    className="hidden"
                                />
                                {length.charAt(0).toUpperCase() + length.slice(1)}
                            </label>
                        ))}
                    </div>

                    
                    <div className="relative flex-1 min-w-[30px] max-w-[40px] aspect-square">
                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute w-full h-full opacity-0 z-10 cursor-pointer"
                        />
                        <div className="absolute left-1/2 top-1/2 w-[32px] h-[32px] bg-white opacity-20 rounded-full -translate-x-1/2 -translate-y-1/2" />
                        <span
                            className={`absolute left-1/2 top-1/2 w-[48px] h-[48px] rounded-full -translate-x-1/2 -translate-y-1/2 transition-all bg-gray-200 ${loading
                                ? "filter blur-sm shadow-[0_10px_25px_-4px_rgba(0,0,0,0.4),inset_0_-8px_25px_-1px_rgba(255,255,255,0.9)]"
                                : "shadow-[0_15px_25px_-4px_rgba(0,0,0,0.5),inset_0_-3px_4px_-1px_rgba(0,0,0,0.2)]"
                                }`}
                        />
                        <span
                            className={`absolute inset-0 flex items-center justify-center font-bold text-[20px] transition-colors ${loading ? "text-black/80" : "text-black/90"
                                }`}
                        >
                            <FaArrowUp />
                        </span>
                    </div>
                </div>

                {formData.type === 'tweet' && (
                    <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium mb-3">Tweet Format Options</h3>
                        <div className="flex flex-wrap gap-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.format.tweet.includeHashtags}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        format: {
                                            ...formData.format,
                                            tweet: {
                                                ...formData.format.tweet,
                                                includeHashtags: e.target.checked
                                            }
                                        }
                                    })}
                                    className="rounded text-blue-600"
                                />
                                <span className="text-sm">Include Hashtags</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.format.tweet.includeCallToAction}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        format: {
                                            ...formData.format,
                                            tweet: {
                                                ...formData.format.tweet,
                                                includeCallToAction: e.target.checked
                                            }
                                        }
                                    })}
                                    className="rounded text-blue-600"
                                />
                                <span className="text-sm">Include Call to Action</span>
                            </label>
                        </div>
                    </div>
                )}

                {formData.type === 'linkedin' && (
                    <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium mb-3">LinkedIn Format Options</h3>
                        <div className="flex flex-wrap gap-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.format.linkedin.includeHashtags}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        format: {
                                            ...formData.format,
                                            linkedin: {
                                                ...formData.format.linkedin,
                                                includeHashtags: e.target.checked
                                            }
                                        }
                                    })}
                                    className="rounded text-blue-600"
                                />
                                <span className="text-sm">Include Hashtags</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.format.linkedin.includeCallToAction}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        format: {
                                            ...formData.format,
                                            linkedin: {
                                                ...formData.format.linkedin,
                                                includeCallToAction: e.target.checked
                                            }
                                        }
                                    })}
                                    className="rounded text-blue-600"
                                />
                                <span className="text-sm">Include Call to Action</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.format.linkedin.includeProfessionalTitle}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        format: {
                                            ...formData.format,
                                            linkedin: {
                                                ...formData.format.linkedin,
                                                includeProfessionalTitle: e.target.checked
                                            }
                                        }
                                    })}
                                    className="rounded text-blue-600"
                                />
                                <span className="text-sm">Include Professional Title</span>
                            </label>
                        </div>
                    </div>
                )}
            </form>

            {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {result && <ContentDisplay content={result} />}
        </div>
    );
};

export default ContentForm;