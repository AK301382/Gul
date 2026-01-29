import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const location = useLocation();

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'products', path: '/products' },
    { key: 'gallery', path: '/gallery' },
    { key: 'about', path: '/about' },
    { key: 'blog', path: '/blog' },
    { key: 'contact', path: '/contact' },
  ];

  const isActivePath = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="text-2xl font-bold text-amber-600" style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}>
              گل‌نواز
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                data-testid={`nav-${item.key}`}
                className={`text-base font-medium transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? 'text-amber-600'
                    : 'text-stone-700 hover:text-amber-600'
                }`}
                style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
              >
                {getTranslation(item.key, language)}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2" data-testid="language-switcher">
                  <Globe className="h-4 w-4" />
                  <span className="uppercase">{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('fa')} data-testid="lang-fa">
                  دری (Dari)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('ps')} data-testid="lang-ps">
                  پښتو (Pashto)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')} data-testid="lang-en">
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-amber-600 transition-colors"
              data-testid="mobile-menu-toggle"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-stone-200">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                data-testid={`mobile-nav-${item.key}`}
                className={`block py-3 text-base font-medium transition-colors ${
                  isActivePath(item.path)
                    ? 'text-amber-600'
                    : 'text-stone-700 hover:text-amber-600'
                }`}
                style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
              >
                {getTranslation(item.key, language)}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;