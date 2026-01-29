import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';

const ProductCard = ({ title, image, items }) => {
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-stone-100"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3
          className="text-2xl font-bold text-stone-900 mb-3"
          style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
        >
          {title}
        </h3>
        <ul
          className="space-y-1 text-stone-600"
          style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
        >
          {items.slice(0, 3).map((item, index) => (
            <li key={index} className="text-sm">
              • {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ProductCard;