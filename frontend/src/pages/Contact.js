import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, ShoppingBag, Sparkles, CheckCircle2, Users } from 'lucide-react';
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
      toast.success(
        language === 'fa'
          ? 'پیام شما با موفقیت ارسال شد!'
          : language === 'ps'
          ? 'ستاسو پیغام په بریالیتوب سره واستول شو!'
          : 'Message sent successfully!'
      );
      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error(
        language === 'fa'
          ? 'خطا در ارسال پیام. لطفا دوباره تلاش کنید.'
          : language === 'ps'
          ? 'د پیغام په لیږلو کې تېروتنه. مهرباني وکړئ بیا هڅه وکړئ.'
          : 'Failed to send message. Please try again.'
      );
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
      toast.success(
        language === 'fa'
          ? 'استعلام شما با موفقیت ثبت شد!'
          : language === 'ps'
          ? 'ستاسو پوښتنه په بریالیتوب سره ثبت شوه!'
          : 'Inquiry submitted successfully!'
      );
      setInquiryForm({
        name: '',
        email: '',
        phone: '',
        product_category: '',
        quantity: '',
        message: '',
      });
    } catch (error) {
      toast.error(
        language === 'fa'
          ? 'خطا در ثبت استعلام. لطفا دوباره تلاش کنید.'
          : language === 'ps'
          ? 'د پوښتنې په ثبتولو کې تېروتنه. مهرباني وکړئ بیا هڅه وکړئ.'
          : 'Failed to submit inquiry. Please try again.'
      );
      console.error('Error submitting inquiry:', error);
    } finally {
      setLoading(false);
    }
  };

  const whyContactUs = [
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: language === 'fa' ? 'پاسخگویی سریع' : language === 'ps' ? 'چټک ځواب' : 'Quick Response',
      desc: language === 'fa' ? 'ما در کمترین زمان به شما پاسخ می‌دهیم' : language === 'ps' ? 'موږ تاسو ته په لږ وخت کې ځواب درکوو' : 'We respond to you in the shortest time',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: language === 'fa' ? 'کیفیت برتر' : language === 'ps' ? 'لوړه کیفیت' : 'Premium Quality',
      desc: language === 'fa' ? 'محصولات با کیفیت و اصیل' : language === 'ps' ? 'کیفیتي او اصلي محصولات' : 'Quality and authentic products',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: language === 'fa' ? 'تیم متخصص' : language === 'ps' ? 'ماهر ټیم' : 'Expert Team',
      desc: language === 'fa' ? 'تیمی با تجربه در خدمت شما' : language === 'ps' ? 'تجربه لرونکی ټیم ستاسو په خدمت کې' : 'Experienced team at your service',
      color: 'from-emerald-500 to-green-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-amber-100/10 to-emerald-100/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <div className="relative pt-16 pb-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-6 shadow-lg"
          >
            <MessageSquare className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 mb-4"
            style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
          >
            {getTranslation('contactTitle', language)}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto"
            style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
          >
            {language === 'fa'
              ? 'ما آماده پاسخگویی به سوالات و نیازهای شما هستیم'
              : language === 'ps'
              ? 'موږ ستاسو د پوښتنو او اړتیاوو ته د ځواب ویلو لپاره چمتو یو'
              : 'We are ready to answer your questions and needs'}
          </motion.p>
        </motion.div>
      </div>

      {/* Why Contact Us Section */}
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyContactUs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
              <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3
                className="text-lg font-bold text-stone-900 mb-2"
                style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
              >
                {item.title}
              </h3>
              <p
                className="text-stone-600 text-sm"
                style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 sticky top-24">
              <h2
                className="text-2xl font-bold text-stone-900 mb-8 flex items-center gap-3"
                style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
              >
                <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-emerald-500 rounded-full" />
                {language === 'fa' ? 'اطلاعات تماس' : language === 'ps' ? 'د اړیکې معلومات' : 'Contact Information'}
              </h2>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-all duration-300"
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <MapPin className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-bold text-stone-900 mb-1 text-lg"
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
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-all duration-300"
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <Phone className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-bold text-stone-900 mb-1 text-lg"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('phone', language)}
                    </h3>
                    <p
                      className="text-stone-600 font-mono"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      +93 (0) 700 123 456
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-all duration-300"
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <Mail className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-bold text-stone-900 mb-1 text-lg"
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
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-all duration-300"
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <Clock className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-bold text-stone-900 mb-1 text-lg"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {language === 'fa' ? 'ساعات کاری' : language === 'ps' ? 'د کار ساعتونه' : 'Working Hours'}
                    </h3>
                    <p
                      className="text-stone-600 text-sm"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {language === 'fa'
                        ? 'شنبه تا پنجشنبه: 8:00 - 17:00'
                        : language === 'ps'
                        ? 'له شنبې څخه تر پنجشنبې: 8:00 - 17:00'
                        : 'Saturday - Thursday: 8:00 AM - 5:00 PM'}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-2xl overflow-hidden h-64 shadow-lg">
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

          {/* Forms - 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              {/* Tab Buttons */}
              <div className="flex gap-3 mb-8" dir={isRTL ? 'rtl' : 'ltr'}>
                <Button
                  onClick={() => setActiveTab('contact')}
                  data-testid="tab-contact"
                  className={`flex-1 h-14 rounded-xl font-semibold text-base transition-all duration-300 ${
                    activeTab === 'contact'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg scale-105'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                  style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  {getTranslation('contactTitle', language)}
                </Button>
                <Button
                  onClick={() => setActiveTab('inquiry')}
                  data-testid="tab-inquiry"
                  className={`flex-1 h-14 rounded-xl font-semibold text-base transition-all duration-300 ${
                    activeTab === 'inquiry'
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg scale-105'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                  style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {getTranslation('inquiryTitle', language)}
                </Button>
              </div>

              {/* Contact Form */}
              {activeTab === 'contact' && (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleContactSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-name"
                      className="text-base font-semibold text-stone-900"
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
                      className="h-12 rounded-xl border-2 border-stone-200 focus:border-amber-400 transition-colors"
                      placeholder={
                        language === 'fa'
                          ? 'نام خود را وارد کنید'
                          : language === 'ps'
                          ? 'خپل نوم دننه کړئ'
                          : 'Enter your name'
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="contact-email"
                        className="text-base font-semibold text-stone-900"
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
                        className="h-12 rounded-xl border-2 border-stone-200 focus:border-amber-400 transition-colors"
                        placeholder={
                          language === 'fa'
                            ? 'ایمیل خود را وارد کنید'
                            : language === 'ps'
                            ? 'خپل برېښنالیک دننه کړئ'
                            : 'Enter your email'
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="contact-phone"
                        className="text-base font-semibold text-stone-900"
                        style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                      >
                        {getTranslation('phone', language)}
                      </Label>
                      <Input
                        id="contact-phone"
                        data-testid="contact-form-phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="h-12 rounded-xl border-2 border-stone-200 focus:border-amber-400 transition-colors"
                        placeholder={
                          language === 'fa'
                            ? 'شماره تماس (اختیاری)'
                            : language === 'ps'
                            ? 'د تماس شمیره (اختیاري)'
                            : 'Phone number (optional)'
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-message"
                      className="text-base font-semibold text-stone-900"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('message', language)}
                    </Label>
                    <Textarea
                      id="contact-message"
                      data-testid="contact-form-message"
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      className="rounded-xl border-2 border-stone-200 focus:border-amber-400 transition-colors resize-none"
                      placeholder={
                        language === 'fa'
                          ? 'پیام خود را اینجا بنویسید...'
                          : language === 'ps'
                          ? 'خپل پیغام دلته ولیکئ...'
                          : 'Write your message here...'
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    data-testid="contact-form-submit"
                    disabled={loading}
                    className="w-full h-14 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        {language === 'fa' ? 'در حال ارسال...' : language === 'ps' ? 'په لیږلو کې...' : 'Sending...'}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        {getTranslation('send', language)}
                      </div>
                    )}
                  </Button>
                </motion.form>
              )}

              {/* Inquiry Form */}
              {activeTab === 'inquiry' && (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleInquirySubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="inquiry-name"
                      className="text-base font-semibold text-stone-900"
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
                      className="h-12 rounded-xl border-2 border-stone-200 focus:border-emerald-400 transition-colors"
                      placeholder={
                        language === 'fa'
                          ? 'نام خود را وارد کنید'
                          : language === 'ps'
                          ? 'خپل نوم دننه کړئ'
                          : 'Enter your name'
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="inquiry-email"
                        className="text-base font-semibold text-stone-900"
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
                        className="h-12 rounded-xl border-2 border-stone-200 focus:border-emerald-400 transition-colors"
                        placeholder={
                          language === 'fa'
                            ? 'ایمیل خود را وارد کنید'
                            : language === 'ps'
                            ? 'خپل برېښنالیک دننه کړئ'
                            : 'Enter your email'
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="inquiry-phone"
                        className="text-base font-semibold text-stone-900"
                        style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                      >
                        {getTranslation('phone', language)}
                      </Label>
                      <Input
                        id="inquiry-phone"
                        data-testid="inquiry-form-phone"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        className="h-12 rounded-xl border-2 border-stone-200 focus:border-emerald-400 transition-colors"
                        placeholder={
                          language === 'fa'
                            ? 'شماره تماس (اختیاری)'
                            : language === 'ps'
                            ? 'د تماس شمیره (اختیاري)'
                            : 'Phone number (optional)'
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="inquiry-category"
                        className="text-base font-semibold text-stone-900"
                        style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                      >
                        {getTranslation('productCategory', language)}
                      </Label>
                      <Select
                        value={inquiryForm.product_category}
                        onValueChange={(value) => setInquiryForm({ ...inquiryForm, product_category: value })}
                        required
                      >
                        <SelectTrigger data-testid="inquiry-form-category" className="h-12 rounded-xl border-2 border-stone-200">
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
                    <div className="space-y-2">
                      <Label
                        htmlFor="inquiry-quantity"
                        className="text-base font-semibold text-stone-900"
                        style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                      >
                        {getTranslation('quantity', language)}
                      </Label>
                      <Input
                        id="inquiry-quantity"
                        data-testid="inquiry-form-quantity"
                        value={inquiryForm.quantity}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, quantity: e.target.value })}
                        className="h-12 rounded-xl border-2 border-stone-200 focus:border-emerald-400 transition-colors"
                        placeholder={
                          language === 'fa'
                            ? 'تعداد یا مقدار'
                            : language === 'ps'
                            ? 'شمېره یا مقدار'
                            : 'Quantity or amount'
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="inquiry-message"
                      className="text-base font-semibold text-stone-900"
                      style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                    >
                      {getTranslation('message', language)}
                    </Label>
                    <Textarea
                      id="inquiry-message"
                      data-testid="inquiry-form-message"
                      rows={5}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      required
                      className="rounded-xl border-2 border-stone-200 focus:border-emerald-400 transition-colors resize-none"
                      placeholder={
                        language === 'fa'
                          ? 'جزئیات سفارش خود را بنویسید...'
                          : language === 'ps'
                          ? 'د خپل امر توضیحات ولیکئ...'
                          : 'Write your order details...'
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    data-testid="inquiry-form-submit"
                    disabled={loading}
                    className="w-full h-14 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        {language === 'fa' ? 'در حال ارسال...' : language === 'ps' ? 'په لیږلو کې...' : 'Submitting...'}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        {getTranslation('submitInquiry', language)}
                      </div>
                    )}
                  </Button>
                </motion.form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;