import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Calendar, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    fetchBlog();
    fetchRelatedBlogs();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${API}/blogs/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
      const response = await axios.get(`${API}/blogs`);
      setRelatedBlogs(response.data.filter(b => b.id !== id).slice(0, 3));
    } catch (error) {
      console.error('Error fetching related blogs:', error);
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-xl text-stone-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Image */}
      <div className="relative h-[400px]">
        <img
          src={blog.image_url}
          alt={blog[`title_${language}`]}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6"
          data-testid="back-to-home"
        >
          <ArrowLeft className="h-4 w-4" />
          <span style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}>
            {getTranslation('home', language)}
          </span>
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 md:p-12"
        >
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4"
            style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
          >
            {blog[`title_${language}`]}
          </h1>

          <div className="flex items-center gap-2 text-stone-500 mb-8">
            <Calendar className="h-4 w-4" />
            <span style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}>
              {new Date(blog.created_at).toLocaleDateString()}
            </span>
          </div>

          <div
            className="prose prose-lg max-w-none text-stone-700 leading-relaxed whitespace-pre-line"
            style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
          >
            {blog[`content_${language}`]}
          </div>
        </motion.article>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16">
            <h2
              className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8"
              style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
            >
              {language === 'fa' ? 'مقالات مرتبط' : language === 'ps' ? 'اړوندې مقالې' : 'Related Articles'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link key={relatedBlog.id} to={`/blog/${relatedBlog.id}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedBlog.image_url}
                        alt={relatedBlog[`title_${language}`]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3
                        className="text-lg font-bold text-stone-900 line-clamp-2"
                        style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
                      >
                        {relatedBlog[`title_${language}`]}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;