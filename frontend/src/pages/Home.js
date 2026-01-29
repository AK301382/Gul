import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { MessageCircle } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation, translations } from '../utils/translations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
    fetchGallery();
    fetchFAQs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API}/blogs`);
      setBlogs(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${API}/gallery`);
      setGalleryImages(response.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  const fetchFAQs = async () => {
    try {
      const response = await axios.get(`${API}/faqs`);
      setFaqs(response.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/contact`, contactForm);
      toast.success('Message sent successfully!');
      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error submitting contact:', error);
    } finally {
      setLoading(false);
    }
  };

  const featuredProducts = [
    {
      title: getTranslation('pickles', language),
      image: 'https://images.unsplash.com/photo-1733714654311-102cb838ab2c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwyfHxqYXIlMjBvZiUyMHBpY2tsZXMlMjB0cmFkaXRpb25hbCUyMGZvb2R8ZW58MHx8fHwxNzY5NTkzOTUyfDA&ixlib=rb-4.1.0&q=85',
      items: translations[language].picklesList,
    },
    {
      title: getTranslation('herbalDistillates', language),
      image: 'https://images.unsplash.com/photo-1571059750558-3d869522f707?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxoZXJiYWwlMjBkaXN0aWxsYXRlJTIwYm90dGxlJTIwZ2xhc3N8ZW58MHx8fHwxNzY5NTkzOTU0fDA&ixlib=rb-4.1.0&q=85',
      items: translations[language].herbalsList,
    },
    {
      title: getTranslation('vinegars', language),
      image: 'https://images.unsplash.com/photo-1762926627703-63d2dc088d04?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwxfHx2aW5lZ2FyJTIwYm90dGxlJTIwZm9vZCUyMGluZ3JlZGllbnR8ZW58MHx8fHwxNzY5NTkzOTU2fDA&ixlib=rb-4.1.0&q=85',
      items: translations[language].vinegarsList,
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Our Products Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-stone-900 mb-12"
            style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
          >
            {getTranslation('ourProducts', language)}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                image={product.image}
                items={product.items}
              />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button
                size="lg"
                data-testid="view-all-products-btn"
                className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-8"
                style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
              >
                {getTranslation('allProducts', language)}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.pexels.com/photos/5953727/pexels-photo-5953727.jpeg"
                alt="About Golnavaz"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4"
                style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
              >
                {getTranslation('aboutTitle', language)}
              </h2>
              <p
                className="text-lg text-stone-600 mb-6 leading-relaxed"
                style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
              >
                {getTranslation('aboutShort', language)}
              </p>
              <Link to="/about">
                <Button
                  variant="outline"
                  data-testid="read-more-about-btn"
                  className="border-amber-500 text-amber-600 hover:bg-amber-50 rounded-full px-6"
                  style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                >
                  {getTranslation('readMore', language)}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      {galleryImages.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-center text-stone-900 mb-12"
              style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
            >
              {getTranslation('galleryTitle', language)}
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <img
                    src={image.image_url}
                    alt={image[`alt_${language}`]}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/gallery">
                <Button
                  variant="outline"
                  data-testid="view-gallery-btn"
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-full px-6"
                  style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                >
                  {getTranslation('moreImages', language)}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Blog Section */}
      {blogs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-center text-stone-900 mb-12"
              style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
            >
              {getTranslation('blogTitle', language)}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/blog/${blog.id}`}>
                    <div className="bg-stone-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={blog.image_url}
                          alt={blog[`title_${language}`]}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3
                          className="text-xl font-bold text-stone-900 mb-2"
                          style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
                        >
                          {blog[`title_${language}`]}
                        </h3>
                        <p
                          className="text-stone-600 line-clamp-3"
                          style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                        >
                          {blog[`excerpt_${language}`]}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-center text-stone-900 mb-12"
              style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
            >
              {getTranslation('faqTitle', language)}
            </motion.h2>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-white rounded-lg shadow-md px-6 border-none"
                >
                  <AccordionTrigger
                    className="text-left"
                    style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                  >
                    {faq[`question_${language}`]}
                  </AccordionTrigger>
                  <AccordionContent
                    style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                  >
                    {faq[`answer_${language}`]}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center text-stone-900 mb-12"
            style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
          >
            {getTranslation('contactTitle', language)}
          </motion.h2>

          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="name"
                style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
              >
                {getTranslation('name', language)}
              </Label>
              <Input
                id="name"
                data-testid="contact-name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label
                htmlFor="email"
                style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
              >
                {getTranslation('email', language)}
              </Label>
              <Input
                id="email"
                type="email"
                data-testid="contact-email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label
                htmlFor="phone"
                style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
              >
                {getTranslation('phone', language)}
              </Label>
              <Input
                id="phone"
                data-testid="contact-phone"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
              />
            </div>
            <div>
              <Label
                htmlFor="message"
                style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
              >
                {getTranslation('message', language)}
              </Label>
              <Textarea
                id="message"
                data-testid="contact-message"
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                required
              />
            </div>
            <Button
              type="submit"
              data-testid="contact-submit-btn"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-full"
              style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
            >
              {getTranslation('send', language)}
            </Button>
          </form>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/93700123456"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="whatsapp-button"
        className="fixed bottom-6 end-6 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
};

export default Home;
