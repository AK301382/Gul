import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';

const About = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-amber-600">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/5953727/pexels-photo-5953727.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: language === 'en' ? 'Playfair Display, serif' : 'Vazirmatn, sans-serif' }}
          >
            {getTranslation('aboutTitle', language)}
          </motion.h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
          style={{ fontFamily: language === 'en' ? 'Lato, sans-serif' : 'Vazirmatn, sans-serif' }}
        >
          {language === 'fa' && (
            <>
              <p className="text-xl leading-relaxed text-stone-700 mb-6">
                گل‌نواز یکی از پیشروترین شرکت‌های تولید مواد غذایی در افغانستان است که با سال‌ها تجربه و تخصص در زمینه تولید محصولات غذایی سنتی فعالیت می‌کند.
              </p>
              <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-8">تاریخچه ما</h2>
              <p className="text-lg leading-relaxed text-stone-700 mb-6">
                شرکت گل‌نواز از سال ۱۳۸۰ با هدف احیای طعم‌های اصیل افغانی و ارائه محصولات با کیفیت به مردم آغاز به کار کرد. در طول این سال‌ها، ما توانسته‌ایم با حفظ روش‌های سنتی و استفاده از فناوری‌های نوین، محصولاتی با کیفیت بالا تولید کنیم.
              </p>
              <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-8">چشم‌انداز ما</h2>
              <p className="text-lg leading-relaxed text-stone-700 mb-6">
                چشم‌انداز ما تبدیل شدن به بزرگ‌ترین تولیدکننده محصولات غذایی سنتی در منطقه و ارائه محصولات سالم و باکیفیت به مشتریان در سراسر جهان است.
              </p>
              <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-8">ماموریت ما</h2>
              <p className="text-lg leading-relaxed text-stone-700 mb-6">
                ماموریت ما حفظ میراث غذایی افغانستان، تولید محصولات سالم و طبیعی، و ایجاد ارزش برای مشتریان و جامعه است. ما متعهد به استفاده از بهترین مواد اولیه، رعایت استانداردهای بهداشتی، و ارائه خدمات عالی به مشتریان هستیم.
              </p>
              <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-8">ارزش‌های ما</h2>
              <ul className="list-disc list-inside text-lg text-stone-700 space-y-2 mb-6">
                <li>کیفیت بالا و اصالت محصولات</li>
                <li>بهداشت و سلامت</li>
                <li>احترام به سنت‌های غذایی</li>
                <li>نوآوری و بهبود مستمر</li>
                <li>مسئولیت اجتماعی</li>
              </ul>
            </>
          )}
          {language === 'ps' && (
            <>
              <p className="text-xl leading-relaxed text-stone-700 mb-6">
                ګل‌نواز د افغانستان یو له مخکښو خواړه جوړولو شرکتونو څخه دی چې د کلونو تجربې او تخصص سره د دودیزو خوړو په تولید کې فعالیت کوي.
              </p>
              <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-8">زموږ تاریخچه</h2>
              <p className="text-lg leading-relaxed text-stone-700 mb-6">
                د ګل‌نواز شرکت د ۱۳۸۰ کال څخه د افغاني اصلي خوندونو بیا ژوندي کولو او خلکو ته د کیفیت لرونکو محصولاتو وړاندې کولو هدف سره کار پیل کړی.
              </p>
              <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-8">زموږ لیدنه</h2>
              <p className="text-lg leading-relaxed text-stone-700 mb-6">
                زموږ لیدنه په سیمه کې د دودیزو خوړو ترټولو لوی تولیدونکي ته بدلیدل او په ټوله نړۍ کې پیرودونکو ته روغ او کیفیتي محصولاتو وړاندې کول دي.
              </p>
              <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-8">زموږ ماموریت</h2>
              <p className="text-lg leading-relaxed text-stone-700 mb-6">
                زموږ ماموریت د افغانستان د خواړو میراث ساتل، د روغو او طبیعي محصولاتو تولید، او د پیرودونکو او ټولنې لپاره ارزښت رامنځته کول دي.
              </p>
            </>
          )}
          {language === 'en' && (
            <>
              <p className="text-xl leading-relaxed text-stone-700 mb-6">
                Golnavaz is one of Afghanistan's leading food manufacturing companies, specializing in traditional food products with years of experience and expertise.
              </p>
              <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-8">Our History</h2>
              <p className="text-lg leading-relaxed text-stone-700 mb-6">
                Golnavaz started operations in 2001 with the goal of reviving authentic Afghan flavors and providing quality products to the people. Over the years, we have successfully combined traditional methods with modern technology to produce high-quality products.
              </p>
              <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-8">Our Vision</h2>
              <p className="text-lg leading-relaxed text-stone-700 mb-6">
                Our vision is to become the region's largest producer of traditional food products and deliver healthy, quality products to customers worldwide.
              </p>
              <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-8">Our Mission</h2>
              <p className="text-lg leading-relaxed text-stone-700 mb-6">
                Our mission is to preserve Afghanistan's food heritage, produce healthy and natural products, and create value for customers and society. We are committed to using the finest ingredients, maintaining hygiene standards, and providing excellent customer service.
              </p>
              <h2 className="text-2xl font-bold text-stone-900 mb-4 mt-8">Our Values</h2>
              <ul className="list-disc list-inside text-lg text-stone-700 space-y-2 mb-6">
                <li>High quality and authentic products</li>
                <li>Health and hygiene</li>
                <li>Respect for food traditions</li>
                <li>Innovation and continuous improvement</li>
                <li>Social responsibility</li>
              </ul>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default About;