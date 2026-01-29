import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const { language, direction } = useLanguage();
  const isRTL = direction === 'rtl';
  const [activeTab, setActiveTab] = useState('contact');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    product_category: '',
    quantity: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

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

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/inquiry`, inquiryForm);
      toast.success('Inquiry submitted successfully!');
      setInquiryForm({
        name: '',
        email: '',
        phone: '',
        product_category: '',
        quantity: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.');
      console.error('Error submitting inquiry:', error);
    } finally {
      setLoading(false);
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
          {getTranslation('contactTitle', language)}
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2
                className="text-2xl font-bold text-stone-900 mb-6"
                style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
              >
                {language === 'fa' ? 'اطلاعات تماس' : language === 'ps' ? 'د اړیکې معلومات' : 'Contact Information'}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 rtl:flex-row-reverse">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-stone-900 mb-1"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('address', language)}
                    </h3>
                    <p
                      className="text-stone-600"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {language === 'fa'
                        ? 'کابل، افغانستان'
                        : language === 'ps'
                        ? 'کابل، افغانستان'
                        : 'Kabul, Afghanistan'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rtl:flex-row-reverse">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-stone-900 mb-1"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('phone', language)}
                    </h3>
                    <p
                      className="text-stone-600"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      +93 (0) 700 123 456
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rtl:flex-row-reverse">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-stone-900 mb-1"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('email', language)}
                    </h3>
                    <p
                      className="text-stone-600"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      info@golnavaz.af
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-lg overflow-hidden h-64 bg-stone-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211801.90189722473!2d69.11263155!3d34.5553494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16eb5b84616b7%3A0x3eb9f13bd5c4e4eb!2sKabul%2C%20Afghanistan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Golnavaz Location"
                />
              </div>
            </div>
          </motion.div>

          {/* Forms */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Tab Buttons */}
              <div className="flex gap-2 mb-6">
                <Button
                  onClick={() => setActiveTab('contact')}
                  data-testid="tab-contact"
                  variant={activeTab === 'contact' ? 'default' : 'outline'}
                  className={`flex-1 rounded-full ${
                    activeTab === 'contact'
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'border-stone-300'
                  }`}
                  style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                >
                  {getTranslation('contactTitle', language)}
                </Button>
                <Button
                  onClick={() => setActiveTab('inquiry')}
                  data-testid="tab-inquiry"
                  variant={activeTab === 'inquiry' ? 'default' : 'outline'}
                  className={`flex-1 rounded-full ${
                    activeTab === 'inquiry'
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      : 'border-stone-300'
                  }`}
                  style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                >
                  {getTranslation('inquiryTitle', language)}
                </Button>
              </div>

              {/* Contact Form */}
              {activeTab === 'contact' && (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Label
                      htmlFor="contact-name"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('name', language)}
                    </Label>
                    <Input
                      id="contact-name"
                      data-testid="contact-form-name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="contact-email"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('email', language)}
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      data-testid="contact-form-email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="contact-phone"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('phone', language)}
                    </Label>
                    <Input
                      id="contact-phone"
                      data-testid="contact-form-phone"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="contact-message"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('message', language)}
                    </Label>
                    <Textarea
                      id="contact-message"
                      data-testid="contact-form-message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    data-testid="contact-form-submit"
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-full"
                    style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                  >
                    {getTranslation('send', language)}
                  </Button>
                </form>
              )}

              {/* Inquiry Form */}
              {activeTab === 'inquiry' && (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <Label
                      htmlFor="inquiry-name"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('name', language)}
                    </Label>
                    <Input
                      id="inquiry-name"
                      data-testid="inquiry-form-name"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="inquiry-email"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('email', language)}
                    </Label>
                    <Input
                      id="inquiry-email"
                      type="email"
                      data-testid="inquiry-form-email"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="inquiry-phone"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('phone', language)}
                    </Label>
                    <Input
                      id="inquiry-phone"
                      data-testid="inquiry-form-phone"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="inquiry-category"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('productCategory', language)}
                    </Label>
                    <Select
                      value={inquiryForm.product_category}
                      onValueChange={(value) => setInquiryForm({ ...inquiryForm, product_category: value })}
                      required
                    >
                      <SelectTrigger data-testid="inquiry-form-category">
                        <SelectValue placeholder={getTranslation('productCategory', language)} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pickles">{getTranslation('pickles', language)}</SelectItem>
                        <SelectItem value="herbal_distillates">{getTranslation('herbalDistillates', language)}</SelectItem>
                        <SelectItem value="vinegars">{getTranslation('vinegars', language)}</SelectItem>
                        <SelectItem value="lemon_juice">{getTranslation('lemonJuice', language)}</SelectItem>
                        <SelectItem value="glass_jars">{getTranslation('glassJars', language)}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="inquiry-quantity"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('quantity', language)}
                    </Label>
                    <Input
                      id="inquiry-quantity"
                      data-testid="inquiry-form-quantity"
                      value={inquiryForm.quantity}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, quantity: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="inquiry-message"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('message', language)}
                    </Label>
                    <Textarea
                      id="inquiry-message"
                      data-testid="inquiry-form-message"
                      rows={4}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    data-testid="inquiry-form-submit"
                    disabled={loading}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-full"
                    style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                  >
                    {getTranslation('submitInquiry', language)}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;