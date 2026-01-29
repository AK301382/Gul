import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useLanguage();

  const slides = [
    {
      image: 'https://images.pexels.com/photos/14804699/pexels-photo-14804699.jpeg',
      titleKey: 'heroTitle1',
      subtitleKey: 'heroSubtitle1',
    },
    {
      image: 'https://images.unsplash.com/photo-1617854307432-13950e24ba07?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxqYXIlMjBvZiUyMHBpY2tsZXMlMjB0cmFkaXRpb25hbCUyMGZvb2R8ZW58MHx8fHwxNzY5NTkzOTUyfDA&ixlib=rb-4.1.0&q=85',
      titleKey: 'heroTitle2',
      subtitleKey: 'heroSubtitle2',
    },
    {
      image: 'https://images.unsplash.com/photo-1722931303388-527993417e23?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHw0fHxoZXJiYWwlMjBkaXN0aWxsYXRlJTIwYm90dGxlJTIwZ2xhc3N8ZW58MHx8fHwxNzY5NTkzOTU0fDA&ixlib=rb-4.1.0&q=85',
      titleKey: 'heroTitle3',
      subtitleKey: 'heroSubtitle3',
    },
    {
      image: 'https://images.unsplash.com/photo-1561907583-564843de311c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwyfHxmcmVzaCUyMGxlbW9uJTIwanVpY2UlMjBib3R0bGV8ZW58MHx8fHwxNzY5NTkzOTU4fDA&ixlib=rb-4.1.0&q=85',
      titleKey: 'heroTitle4',
      subtitleKey: 'heroSubtitle4',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative h-full flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 text-center text-white">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
                style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
              >
                {getTranslation(slides[currentSlide].titleKey, language)}
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg sm:text-xl text-stone-200"
                style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
              >
                {getTranslation(slides[currentSlide].subtitleKey, language)}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        data-testid="hero-prev"
        className="absolute start-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        data-testid="hero-next"
        className="absolute end-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 rtl:space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            data-testid={`hero-indicator-${index}`}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-amber-500' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;