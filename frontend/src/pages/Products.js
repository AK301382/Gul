import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation, translations } from '../utils/translations';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Products = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('pickles');
  const [products, setProducts] = useState([]);

  const categories = [
    { key: 'pickles', value: 'pickles' },
    { key: 'herbalDistillates', value: 'herbal_distillates' },
    { key: 'vinegars', value: 'vinegars' },
    { key: 'lemonJuice', value: 'lemon_juice' },
    { key: 'glassJars', value: 'glass_jars' },
  ];

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchProducts = async (category) => {
    try {
      const response = await axios.get(`${API}/products?category=${category}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getProductList = () => {
    switch (selectedCategory) {
      case 'pickles':
        return translations[language].picklesList;
      case 'herbal_distillates':
        return translations[language].herbalsList;
      case 'vinegars':
        return translations[language].vinegarsList;
      default:
        return [];
    }
  };

  const getCategoryImage = () => {
    switch (selectedCategory) {
      case 'pickles':
        return 'https://images.unsplash.com/photo-1733714654311-102cb838ab2c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwyfHxqYXIlMjBvZiUyMHBpY2tsZXMlMjB0cmFkaXRpb25hbCUyMGZvb2R8ZW58MHx8fHwxNzY5NTkzOTUyfDA&ixlib=rb-4.1.0&q=85';
      case 'herbal_distillates':
        return 'https://images.unsplash.com/photo-1571059750558-3d869522f707?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxoZXJiYWwlMjBkaXN0aWxsYXRlJTIwYm90dGxlJTIwZ2xhc3N8ZW58MHx8fHwxNzY5NTkzOTU0fDA&ixlib=rb-4.1.0&q=85';
      case 'vinegars':
        return 'https://images.unsplash.com/photo-1762926627703-63d2dc088d04?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwxfHx2aW5lZ2FyJTIwYm90dGxlJTIwZm9vZCUyMGluZ3JlZGllbnR8ZW58MHx8fHwxNzY5NTkzOTU2fDA&ixlib=rb-4.1.0&q=85';
      case 'lemon_juice':
        return 'https://images.unsplash.com/photo-1739138056344-3c852f4efc28?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGxlbW9uJTIwanVpY2UlMjBib3R0bGV8ZW58MHx8fHwxNzY5NTkzOTU4fDA&ixlib=rb-4.1.0&q=85';
      case 'glass_jars':
        return 'https://images.unsplash.com/photo-1683234803952-bd650e04dcf3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxlbXB0eSUyMGdsYXNzJTIwamFycyUyMG1hbnVmYWN0dXJpbmd8ZW58MHx8fHwxNzY5NTkzOTYwfDA&ixlib=rb-4.1.0&q=85';
      default:
        return '';
    }
  };

  const productList = getProductList();

  return (
    <div className="min-h-screen bg-stone-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-stone-900 mb-12"
          style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
        >
          {getTranslation('ourProducts', language)}
        </motion.h1>

        {/* Category Tabs */}
        <div className="mb-12 overflow-x-auto">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-5 gap-2 bg-white p-2 rounded-lg shadow-md">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  data-testid={`category-${cat.value}`}
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-white rounded-md"
                  style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                >
                  {getTranslation(cat.key, language)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productList.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={getCategoryImage()}
                  alt={product}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3
                  className="text-lg font-semibold text-stone-900 text-center"
                  style={{ fontFamily: language === 'en' ? 'Vazirmatn, sans-serif' : 'Vazirmatn, sans-serif' }}
                  data-testid={`product-${index}`}
                >
                  {product}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;