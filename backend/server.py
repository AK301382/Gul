from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with /api prefix
api_router = APIRouter(prefix="/api")

# Models
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str
    name_en: str
    name_fa: str
    name_ps: str
    description_en: Optional[str] = None
    description_fa: Optional[str] = None
    description_ps: Optional[str] = None
    image_url: str
    featured: bool = False

class ProductCreate(BaseModel):
    category: str
    name_en: str
    name_fa: str
    name_ps: str
    description_en: Optional[str] = None
    description_fa: Optional[str] = None
    description_ps: Optional[str] = None
    image_url: str
    featured: bool = False

class Blog(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title_en: str
    title_fa: str
    title_ps: str
    excerpt_en: str
    excerpt_fa: str
    excerpt_ps: str
    content_en: str
    content_fa: str
    content_ps: str
    image_url: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogCreate(BaseModel):
    title_en: str
    title_fa: str
    title_ps: str
    excerpt_en: str
    excerpt_fa: str
    excerpt_ps: str
    content_en: str
    content_fa: str
    content_ps: str
    image_url: str

class GalleryImage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    image_url: str
    category: str
    alt_en: str
    alt_fa: str
    alt_ps: str

class GalleryImageCreate(BaseModel):
    image_url: str
    category: str
    alt_en: str
    alt_fa: str
    alt_ps: str

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: str

class InquirySubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    product_category: str
    quantity: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class InquirySubmissionCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    product_category: str
    quantity: Optional[str] = None
    message: str

class FAQ(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question_en: str
    question_fa: str
    question_ps: str
    answer_en: str
    answer_fa: str
    answer_ps: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Golnavaz API"}

# Products
@api_router.get("/products", response_model=List[Product])
async def get_products(category: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    
    products = await db.products.find(query, {"_id": 0}).to_list(1000)
    return products

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@api_router.post("/products", response_model=Product)
async def create_product(product: ProductCreate):
    product_dict = product.model_dump()
    product_obj = Product(**product_dict)
    doc = product_obj.model_dump()
    await db.products.insert_one(doc)
    return product_obj

# Blogs
@api_router.get("/blogs", response_model=List[Blog])
async def get_blogs():
    blogs = await db.blogs.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for blog in blogs:
        if isinstance(blog['created_at'], str):
            blog['created_at'] = datetime.fromisoformat(blog['created_at'])
    return blogs

@api_router.get("/blogs/{blog_id}", response_model=Blog)
async def get_blog(blog_id: str):
    blog = await db.blogs.find_one({"id": blog_id}, {"_id": 0})
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    if isinstance(blog['created_at'], str):
        blog['created_at'] = datetime.fromisoformat(blog['created_at'])
    return blog

@api_router.post("/blogs", response_model=Blog)
async def create_blog(blog: BlogCreate):
    blog_dict = blog.model_dump()
    blog_obj = Blog(**blog_dict)
    doc = blog_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.blogs.insert_one(doc)
    return blog_obj

# Gallery
@api_router.get("/gallery", response_model=List[GalleryImage])
async def get_gallery(category: Optional[str] = None):
    query = {}
    if category and category != "all":
        query["category"] = category
    
    images = await db.gallery.find(query, {"_id": 0}).to_list(1000)
    return images

@api_router.post("/gallery", response_model=GalleryImage)
async def create_gallery_image(image: GalleryImageCreate):
    image_dict = image.model_dump()
    image_obj = GalleryImage(**image_dict)
    doc = image_obj.model_dump()
    await db.gallery.insert_one(doc)
    return image_obj

# FAQs
@api_router.get("/faqs", response_model=List[FAQ])
async def get_faqs():
    faqs = await db.faqs.find({}, {"_id": 0}).to_list(1000)
    return faqs

# Contact
@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(submission: ContactSubmissionCreate):
    submission_dict = submission.model_dump()
    submission_obj = ContactSubmission(**submission_dict)
    doc = submission_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_submissions.insert_one(doc)
    return submission_obj

# Product Inquiry
@api_router.post("/inquiry", response_model=InquirySubmission)
async def submit_inquiry(submission: InquirySubmissionCreate):
    submission_dict = submission.model_dump()
    submission_obj = InquirySubmission(**submission_dict)
    doc = submission_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.inquiry_submissions.insert_one(doc)
    return submission_obj

# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()