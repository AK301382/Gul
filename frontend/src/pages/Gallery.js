import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';
import { Button } from '../components/ui/button';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Gallery = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { key: 'all', value: 'all' },
    { key: 'pickles', value: 'pickles' },
    { key: 'herbalDistillates', value: 'herbal_distillates' },
    { key: 'vinegars', value: 'vinegars' },
  ];

  useEffect(() => {
    fetchGallery();
  }, [selectedCategory]);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${API}/gallery?category=${selectedCategory}`);
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-stone-900 mb-12"
          style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
        >
          {getTranslation('galleryTitle', language)}
        </motion.h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              data-testid={`filter-${cat.value}`}
              variant={selectedCategory === cat.value ? 'default' : 'outline'}
              className={`rounded-full px-6 ${
                selectedCategory === cat.value
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'border-stone-300 hover:border-amber-500'
              }`}
              style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
            >
              {getTranslation(cat.key, language)}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedImage(image)}
              data-testid={`gallery-image-${index}`}
            >
              <img
                src={image.image_url}
                alt={image[`alt_${language}`]}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 end-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
              data-testid="lightbox-close"
            >
              <X className="h-6 w-6 text-white" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage.image_url}
              alt={selectedImage[`alt_${language}`]}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;