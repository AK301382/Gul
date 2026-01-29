import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

async def seed_database():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print("Seeding database...")
    
    # Clear existing data
    await db.products.delete_many({})
    await db.blogs.delete_many({})
    await db.gallery.delete_many({})
    await db.faqs.delete_many({})
    
    # Seed FAQs
    faqs = [
        {
            "id": str(uuid.uuid4()),
            "question_en": "What makes your products special?",
            "question_fa": "چه چیزی محصولات شما را خاص می‌کند؟",
            "question_ps": "ستاسو محصولات څه ځانګړی کوي؟",
            "answer_en": "Our products are made using traditional methods with the highest quality natural ingredients, ensuring authentic Afghan flavors.",
            "answer_fa": "محصولات ما با استفاده از روش‌های سنتی و بهترین مواد طبیعی تهیه می‌شوند و طعم اصیل افغانی را تضمین می‌کنند.",
            "answer_ps": "زموږ محصولات د دودیزو میتودونو په کارولو سره او د لوړ کیفیت طبیعي موادو سره جوړیږي، چې د افغان اصلي خوند تضمین کوي."
        },
        {
            "id": str(uuid.uuid4()),
            "question_en": "How should I store your products?",
            "question_fa": "چگونه باید محصولات شما را نگهداری کنم؟",
            "question_ps": "زه باید ستاسو محصولات څنګه ساتم؟",
            "answer_en": "Store in a cool, dry place away from direct sunlight. Refrigerate after opening.",
            "answer_fa": "در مکانی خنک و خشک به دور از نور مستقیم آفتاب نگهداری کنید. پس از باز کردن در یخچال نگهداری شود.",
            "answer_ps": "په یوه یخه او وچه ځای کې د مستقیم لمر رڼا څخه لیرې وساتئ. د خلاصولو وروسته یې په یخچال کې وساتئ."
        },
        {
            "id": str(uuid.uuid4()),
            "question_en": "Do you use any preservatives?",
            "question_fa": "آیا از مواد نگهدارنده استفاده می‌کنید؟",
            "question_ps": "ایا تاسو کوم محافظتي مواد کاروئ؟",
            "answer_en": "We use only natural preservatives like vinegar and salt, avoiding any artificial additives.",
            "answer_fa": "ما فقط از نگهدارنده‌های طبیعی مانند سرکه و نمک استفاده می‌کنیم و از افزودنی‌های مصنوعی پرهیز می‌کنیم.",
            "answer_ps": "موږ یوازې د طبیعي محافظتي موادو لکه سرکه او مالګه کاروو، د مصنوعي اضافو څخه ډډه کوو."
        },
        {
            "id": str(uuid.uuid4()),
            "question_en": "Can I order in bulk?",
            "question_fa": "آیا می‌توانم سفارش عمده بدهم؟",
            "question_ps": "ایا زه کولای شم لوی سفارش ورکړم؟",
            "answer_en": "Yes, we offer bulk orders for businesses and distributors. Please contact us for special pricing.",
            "answer_fa": "بله، ما سفارشات عمده برای کسب‌وکارها و توزیع‌کنندگان ارائه می‌دهیم. لطفاً برای قیمت ویژه با ما تماس بگیرید.",
            "answer_ps": "هو، موږ د کاروبارونو او توزیع کونکو لپاره لوی سفارشات وړاندې کوو. مهرباني وکړئ د ځانګړي قیمت لپاره له موږ سره اړیکه ونیسئ."
        },
        {
            "id": str(uuid.uuid4()),
            "question_en": "What is your return policy?",
            "question_fa": "سیاست بازگشت شما چیست؟",
            "question_ps": "ستاسو د بیرته راګرځولو پالیسي څه ده؟",
            "answer_en": "We offer a 30-day return policy for unopened products. Customer satisfaction is our priority.",
            "answer_fa": "ما برای محصولات باز نشده سیاست بازگشت 30 روزه ارائه می‌دهیم. رضایت مشتری اولویت ماست.",
            "answer_ps": "موږ د نه خلاصیدلو محصولاتو لپاره د 30 ورځو بیرته راګرځولو پالیسي وړاندې کوو. د پیرودونکي رضایت زموږ لومړیتوب دی."
        }
    ]
    
    await db.faqs.insert_many(faqs)
    print(f"✓ Seeded {len(faqs)} FAQs")
    
    # Seed Blogs
    blogs = [
        {
            "id": str(uuid.uuid4()),
            "title_en": "The Health Benefits of Traditional Pickles",
            "title_fa": "فواید سلامتی ترشی‌های سنتی",
            "title_ps": "د دودیزو ترشیو روغتیایي ګټې",
            "excerpt_en": "Discover the amazing health benefits of fermented foods and traditional pickles in your diet.",
            "excerpt_fa": "فواید شگفت‌انگیز غذاهای تخمیر شده و ترشی‌های سنتی را در رژیم غذایی خود کشف کنید.",
            "excerpt_ps": "ستاسو په خواړو کې د خمیر شویو خواړو او دودیزو ترشیو حیرانونکي روغتیایي ګټې کشف کړئ.",
            "content_en": "Traditional pickles are more than just a tasty accompaniment to meals. They are packed with probiotics that promote gut health, boost immunity, and improve digestion. \n\nThe fermentation process creates beneficial bacteria that help maintain a healthy balance in your digestive system. Regular consumption of pickles can also help with nutrient absorption and may even contribute to weight management.\n\nAt Golnavaz, we prepare our pickles using time-tested traditional methods, ensuring that you get all the health benefits along with authentic taste.",
            "content_fa": "ترشی‌های سنتی بیش از یک همراه خوشمزه برای غذاها هستند. آن‌ها سرشار از پروبیوتیک‌ها هستند که سلامت روده را ترویج می‌کنند، ایمنی را تقویت کرده و هضم را بهبود می‌بخشند.\n\nفرآیند تخمیر باکتری‌های مفیدی را ایجاد می‌کند که به حفظ تعادل سالم در سیستم گوارشی شما کمک می‌کنند. مصرف منظم ترشی همچنین می‌تواند به جذب مواد مغذی کمک کند و حتی ممکن است به مدیریت وزن کمک کند.\n\nدر گل‌نواز، ما ترشی‌های خود را با استفاده از روش‌های سنتی آزمایش شده تهیه می‌کنیم و اطمینان حاصل می‌کنیم که شما تمام مزایای سلامتی را همراه با طعم اصیل دریافت می‌کنید.",
            "content_ps": "دودیزې ترشۍ د خوړو لپاره یوازې د خوندور ملګري څخه ډیر دي. دوی په پروبیوټیکونو ډک دي چې د معدې روغتیا ته وده ورکوي، د معافیت ځواک قوي کوي او هضم ښه کوي.\n\nد خمیرولو پروسه ګټور باکتریا رامینځته کوي چې ستاسو په هضمي سیسټم کې د روغ توازن ساتلو کې مرسته کوي. د ترشیو منظم استعمال کولای شي د مغذي موادو جذب کې هم مرسته وکړي او حتی ممکن د وزن مدیریت کې مرسته وکړي.\n\nپه ګلنواز کې، موږ خپلې ترشۍ د وخت آزمویل شوي دودیزو میتودونو په کارولو سره چمتو کوو، ډاډ ترلاسه کوو چې تاسو د اصلي خوند سره سره ټولې روغتیایي ګټې ترلاسه کړئ.",
            "image_url": "https://images.unsplash.com/photo-1617854307432-13950e24ba07",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title_en": "How to Store Herbal Distillates",
            "title_fa": "چگونه عرقیات گیاهی را نگهداری کنیم",
            "title_ps": "د بوټو عرقیات څنګه وساتو",
            "excerpt_en": "Learn the best practices for storing herbal distillates to maintain their quality and potency.",
            "excerpt_fa": "بهترین شیوه‌ها را برای نگهداری عرقیات گیاهی برای حفظ کیفیت و قدرت آن‌ها بیاموزید.",
            "excerpt_ps": "د بوټو عرقیاتو ساتلو لپاره غوره طریقې زده کړئ ترڅو دوی کیفیت او قوه وساتي.",
            "content_en": "Herbal distillates, also known as hydrosols or floral waters, require proper storage to maintain their therapeutic properties.\n\nAlways store herbal distillates in dark glass bottles, away from direct sunlight and heat. The ideal storage temperature is between 10-15°C. Make sure the cap is tightly closed to prevent oxidation.\n\nWhen stored properly, most herbal distillates can maintain their quality for up to 12-18 months. However, always check for any changes in color or smell before use.",
            "content_fa": "عرقیات گیاهی که به عنوان هیدروسول یا آب‌های گلی نیز شناخته می‌شوند، برای حفظ خواص درمانی خود نیاز به نگهداری مناسب دارند.\n\nهمیشه عرقیات گیاهی را در بطری‌های شیشه‌ای تیره، به دور از نور مستقیم خورشید و گرما نگهداری کنید. دمای ایده‌آل نگهداری بین 10 تا 15 درجه سانتی‌گراد است. مطمئن شوید که درپوش به شدت بسته است تا از اکسیداسیون جلوگیری شود.\n\nهنگامی که به درستی ذخیره می‌شوند، اکثر عرقیات گیاهی می‌توانند کیفیت خود را تا 12-18 ماه حفظ کنند. با این حال، همیشه قبل از استفاده از هرگونه تغییر در رنگ یا بو بررسی کنید.",
            "content_ps": "د بوټو عرقیات، چې د هیدروسول یا د ګلونو اوبو په نوم هم پیژندل کیږي، د دوی د درملنې ځانګړتیاوو ساتلو لپاره سم ساتنې ته اړتیا لري.\n\nتل د بوټو عرقیات په تیاره شیشې بوتلونو کې، د مستقیم لمر رڼا او تودوخې څخه لیرې وساتئ. د ساتلو مثالي حرارت د 10-15 درجو تر منځ دی. ډاډ ترلاسه کړئ چې ټوپۍ په کلکه تړل شوې ده ترڅو د اکسیډیشن مخه ونیسي.\n\nکله چې په سمه توګه ساتل کیږي، ډیری بوټي عرقیات کولی شي خپل کیفیت تر 12-18 میاشتو پورې وساتي. په هرصورت، د کارولو دمخه د رنګ یا بوی کې د هر ډول بدلون لپاره تل وګورئ.",
            "image_url": "https://images.unsplash.com/photo-1722931303388-527993417e23",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title_en": "Traditional Afghan Food Preservation Methods",
            "title_fa": "روش‌های سنتی نگهداری مواد غذایی افغانی",
            "title_ps": "د افغاني خواړو ساتلو دودیزې طریقې",
            "excerpt_en": "Explore the time-honored methods Afghan families have used for generations to preserve food.",
            "excerpt_fa": "روش‌های کهن را که خانواده‌های افغان برای نسل‌ها برای حفظ مواد غذایی استفاده کرده‌اند، کشف کنید.",
            "excerpt_ps": "هغه پخوانۍ طریقې وپلټئ چې افغان کورنیو د نسلونو لپاره د خوړو ساتلو لپاره کارولې.",
            "content_en": "Afghanistan has a rich tradition of food preservation that has been passed down through generations. These methods were developed out of necessity in a land with harsh winters and limited access to fresh produce year-round.\n\nPickling, drying, and fermentation are the main preservation techniques. Sun-drying fruits and vegetables, making preserves with vinegar and salt, and creating herbal distillates are all part of Afghan culinary heritage.\n\nAt Golnavaz, we honor these traditions while ensuring modern food safety standards, bringing you products that connect you to Afghan cultural heritage.",
            "content_fa": "افغانستان سنت غنی نگهداری مواد غذایی دارد که از نسلی به نسل دیگر منتقل شده است. این روش‌ها از ضرورت در سرزمینی با زمستان‌های سخت و دسترسی محدود به محصولات تازه در طول سال ایجاد شدند.\n\nترشی کردن، خشک کردن و تخمیر تکنیک‌های اصلی نگهداری هستند. خشک کردن میوه‌ها و سبزیجات در آفتاب، تهیه کنسرو با سرکه و نمک، و ایجاد عرقیات گیاهی همگی بخشی از میراث آشپزی افغانی هستند.\n\nدر گل‌نواز، ما این سنت‌ها را گرامی می‌داریم در حالی که استانداردهای مدرن ایمنی مواد غذایی را تضمین می‌کنیم و محصولاتی را برای شما ارائه می‌دهیم که شما را به میراث فرهنگی افغانی متصل می‌کند.",
            "content_ps": "افغانستان د خواړو ساتلو بډایه دود لري چې له نسلونو څخه منتقل شوی. دا میتودونه په یوه ځمکه کې د اړتیا څخه رامینځته شوي چې سخت ژمي او په کال کې د تازه محصولاتو لپاره محدود لاسرسی لري.\n\nترشي کول، وچول، او خمیرول د ساتلو اصلي تخنیکونه دي. د میوو او سبزیجاتو په لمر کې وچول، د سرکې او مالګې سره محفوظات جوړول، او د بوټو عرقیات رامینځته کول ټول د افغان پخلنځي میراث برخه ده.\n\nپه ګلنواز کې، موږ دا دودونه درناوی کوو په داسې حال کې چې د خوړو د خوندیتوب عصري معیارونه تضمین کوو، تاسو ته هغه محصولات راوړو چې تاسو د افغان کلتوري میراث سره نښلوي.",
            "image_url": "https://images.pexels.com/photos/5953727/pexels-photo-5953727.jpeg",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.blogs.insert_many(blogs)
    print(f"✓ Seeded {len(blogs)} blogs")
    
    # Seed Gallery Images
    gallery_images = [
        {
            "id": str(uuid.uuid4()),
            "image_url": "https://images.unsplash.com/photo-1617854307432-13950e24ba07",
            "category": "pickles",
            "alt_en": "Traditional pickles in glass jars",
            "alt_fa": "ترشی‌های سنتی در شیشه‌های استوانه‌ای",
            "alt_ps": "په شیشې جارونو کې دودیزې ترشۍ"
        },
        {
            "id": str(uuid.uuid4()),
            "image_url": "https://images.unsplash.com/photo-1733714654311-102cb838ab2c",
            "category": "pickles",
            "alt_en": "Homemade pickles",
            "alt_fa": "ترشی‌های خانگی",
            "alt_ps": "کورنۍ ترشۍ"
        },
        {
            "id": str(uuid.uuid4()),
            "image_url": "https://images.unsplash.com/photo-1722931303388-527993417e23",
            "category": "herbal_distillates",
            "alt_en": "Herbal distillates in amber bottles",
            "alt_fa": "عرقیات گیاهی در بطری‌های کهربایی",
            "alt_ps": "په کهرباي بوتلونو کې بوټي عرقیات"
        },
        {
            "id": str(uuid.uuid4()),
            "image_url": "https://images.unsplash.com/photo-1571059750558-3d869522f707",
            "category": "herbal_distillates",
            "alt_en": "Rose water and herbal extracts",
            "alt_fa": "گلاب و عصاره‌های گیاهی",
            "alt_ps": "ګلاب او بوټي عصارې"
        },
        {
            "id": str(uuid.uuid4()),
            "image_url": "https://images.unsplash.com/photo-1762926627703-63d2dc088d04",
            "category": "vinegars",
            "alt_en": "Natural vinegar bottles",
            "alt_fa": "بطری‌های سرکه طبیعی",
            "alt_ps": "طبیعي سرکه بوتلونه"
        },
        {
            "id": str(uuid.uuid4()),
            "image_url": "https://images.unsplash.com/photo-1561907583-564843de311c",
            "category": "vinegars",
            "alt_en": "Apple cider vinegar",
            "alt_fa": "سرکه سیب",
            "alt_ps": "د مڼې سرکه"
        },
        {
            "id": str(uuid.uuid4()),
            "image_url": "https://images.pexels.com/photos/14804699/pexels-photo-14804699.jpeg",
            "category": "pickles",
            "alt_en": "Food manufacturing facility",
            "alt_fa": "تاسیسات تولید مواد غذایی",
            "alt_ps": "د خواړو تولید تاسیسات"
        },
        {
            "id": str(uuid.uuid4()),
            "image_url": "https://images.unsplash.com/photo-1739138056344-3c852f4efc28",
            "category": "vinegars",
            "alt_en": "Fresh lemon juice production",
            "alt_fa": "تولید آب لیمو تازه",
            "alt_ps": "د تازه لیمو اوبو تولید"
        }
    ]
    
    await db.gallery.insert_many(gallery_images)
    print(f"✓ Seeded {len(gallery_images)} gallery images")
    
    print("✅ Database seeding completed successfully!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
