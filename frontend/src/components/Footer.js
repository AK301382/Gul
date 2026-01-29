import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';
import { Instagram, Facebook, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const { language, direction } = useLanguage();
  const isRTL = direction === 'rtl';

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern - Subtle */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Company Info - Compact */}
          <div className="space-y-4">
            <h3 
              className="text-xl font-bold text-amber-400 mb-3 border-b border-amber-400/30 pb-2"
              style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
            >
              {getTranslation('companyIntro', language)}
            </h3>
            
            <p 
              className={`text-gray-300 text-sm leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
              style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
            >
              {getTranslation('companyDescription', language)}
            </p>
            
            {/* Social Links */}
            <div className="pt-3">
              <p 
                className="text-sm text-gray-400 mb-3"
                style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
              >
                {getTranslation('productOfNation', language)}
              </p>
              <div className="flex gap-3" dir="ltr">
                <a
                  href="https://www.facebook.com/golnavazfoods/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-amber-500 flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                  data-testid="social-facebook"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-amber-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.instagram.com/golnavazfoods/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-amber-500 flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                  data-testid="social-instagram"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-amber-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="tel:+93700123456"
                  className="w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-amber-500 flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                  data-testid="social-phone"
                  aria-label="Phone"
                >
                  <Phone className="w-5 h-5 text-amber-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Info - Compact */}
          <div className="space-y-4">
            <h3 
              className="text-xl font-bold text-amber-400 mb-3 border-b border-amber-400/30 pb-2"
              style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
            >
              {getTranslation('contactUs', language)}
            </h3>
            
            <div className="space-y-3">
              {/* Address */}
              <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                </div>
                <p 
                  className={`text-gray-300 text-sm flex-1 ${isRTL ? 'text-right' : 'text-left'}`}
                  style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                >
                  {getTranslation('kabulAddress', language)}
                </p>
              </div>

              {/* Email */}
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                <a 
                  href="mailto:info@golnavaz.af"
                  className="text-gray-300 text-sm hover:text-amber-400 transition-colors"
                  style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                  dir="ltr"
                >
                  info@golnavaz.af
                </a>
              </div>

              {/* Phone */}
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-amber-400" />
                </div>
                <a 
                  href="tel:+93700123456"
                  className="text-gray-300 text-sm hover:text-amber-400 transition-colors"
                  style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                  dir="ltr"
                >
                  +93 (0) 700 123 456
                </a>
              </div>
            </div>
          </div>

          {/* Working Hours - Compact */}
          <div className="space-y-4">
            <h3 
              className="text-xl font-bold text-amber-400 mb-3 border-b border-amber-400/30 pb-2"
              style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
            >
              {getTranslation('workingHours', language)}
            </h3>
            
            <div className="space-y-3">
              {/* Weekdays */}
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <span 
                    className="text-gray-300 text-sm"
                    style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                  >
                    {getTranslation('saturdayToThursday', language)}
                  </span>
                  <span 
                    className="text-amber-400 text-sm font-semibold"
                    style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                  >
                    {getTranslation('workingHoursTime', language)}
                  </span>
                </div>
              </div>

              {/* Friday */}
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <span 
                    className="text-gray-300 text-sm"
                    style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                  >
                    {getTranslation('friday', language)}
                  </span>
                  <span 
                    className="text-gray-500 text-sm font-semibold"
                    style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
                  >
                    {getTranslation('closed', language)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright - Minimal */}
        <div className="border-t border-gray-700/50 pt-6 mt-6">
          <p 
            className="text-center text-gray-400 text-sm"
            style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
          >
            {getTranslation('copyright', language)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;