# Blog Görselleri Spesifikasyonları 📸

## 🎯 Genel Bakış
WebnDigital blog sayfası için görsel boyutları ve tasarım kılavuzu.

---

## 📐 Görsel Boyutları

### **Önerilen Boyut (Optimal)**
```
Width:  800px
Height: 500px
Aspect Ratio: 16:10 (8:5)
Format: JPG veya PNG
File Size: Max 150KB (optimized)
```

### **Minimum Boyut**
```
Width:  640px
Height: 400px
```

### **Maksimum Boyut**
```
Width:  1200px
Height: 750px
File Size: Max 300KB
```

---

## 🖼️ Görsel Görünüm Alanları

### **Desktop (Blog Card)**
```
Display: 100% width × 240px height
Object-fit: cover (kırpılabilir)
```

### **Mobile (Blog Card)**
```
Display: 100% width × 200px height
Object-fit: cover (kırpılabilir)
```

### **Blog Detail Page (Tam Sayfa)**
```
Display: Max 1200px width × Auto height
Object-fit: contain (tam görünür)
```

---

## 🎨 Tasarım Kılavuzu

### Mevcut Blog Görselleri

#### 1. **AI & Machine Learning** (`ai-business.png`)
- **Konu:** Yapay Zeka ve İş Süreçleri
- **Görsel Önerileri:**
  - Neural network visualizations
  - AI brain/circuit patterns
  - Blue/purple gradients
  - Abstract tech elements
  - Robot or AI assistant illustrations

#### 2. **Mobile App Development** (`mobile-app-trends.png`)
- **Konu:** Mobil Uygulama Geliştirme
- **Görsel Önerileri:**
  - Smartphone mockups
  - App interface screenshots
  - Cross-platform development visuals
  - iOS/Android logos
  - Code snippets on mobile screens

#### 3. **E-Commerce Success** (`ecommerce-success.png`)
- **Konu:** E-Ticaret Platformları
- **Görsel Önerileri:**
  - Shopping cart icons
  - Online store interface
  - Payment/checkout screens
  - Product grids
  - Growth charts/analytics

#### 4. **SEO Strategies** (`seo-strategies.png`)
- **Konu:** SEO ve Dijital Pazarlama
- **Görsel Önerileri:**
  - Search engine results page
  - Google Analytics dashboard
  - Keyword research visuals
  - Ranking graphs
  - Magnifying glass + website

#### 5. **Web Performance** (`web-performance.png`)
- **Konu:** Web Performans Optimizasyonu
- **Görsel Önerileri:**
  - Speed/rocket icons
  - Performance metrics
  - PageSpeed Insights screenshot
  - Loading animations
  - Fast vs slow comparison

#### 6. **Restaurant Web Design** (`restaurant-design.png`)
- **Konu:** Restoran Web Siteleri
- **Görsel Önerileri:**
  - Restaurant interior/food photos
  - Menu interface mockups
  - Online reservation screens
  - Food delivery app visuals
  - Restaurant branding

---

## 🎨 Renk Paleti (WebnDigital Brand)

```css
Primary Colors:
- Blue:     #0091FF
- Light:    #00D4FF
- Dark:     #1A1A1A
- White:    #FFFFFF
- Gray:     #6B7280

Category Colors:
- AI:       Purple (#8B5CF6)
- Tech:     Blue (#0091FF)
- Business: Green (#10B981)
- Design:   Pink (#EC4899)
```

---

## 🛠️ Görsel Oluşturma Araçları

### **1. Canva (Kolay)**
- Template: Custom dimensions (800x500px)
- Elements: Tech, AI, Business illustrations
- Export: JPG (80% quality)

### **2. Figma (Profesyonel)**
- Frame: 800×500px
- Components: Icons, gradients, mockups
- Export: PNG/JPG optimized

### **3. Unsplash/Pexels (Stok Fotoğraf)**
- Search: Tech, AI, Business keywords
- Download: Large size
- Edit/Resize: 800×500px

### **4. AI Image Generators**
- DALL-E 3
- Midjourney
- Leonardo.ai
- Stable Diffusion
- Prompt: "Professional blog header for [topic], modern tech aesthetic, blue color scheme, 16:10 aspect ratio"

---

## 📝 Dosya Adlandırma

```
Format: [topic-name]-[number].png/jpg

Örnekler:
✅ ai-business.png
✅ mobile-app-trends.png
✅ ecommerce-success.png
✅ seo-strategies.png
✅ web-performance.png
✅ restaurant-design.png

Kötü Örnekler:
❌ blog1.jpg
❌ Image123.png
❌ photo-final-v2.jpg
```

---

## 🚀 Optimizasyon

### **Compression Tools**
1. **TinyPNG** (https://tinypng.com)
   - Drag & drop
   - Auto compression
   - 50-70% size reduction

2. **ImageOptim** (Mac)
   - Batch processing
   - Lossless compression

3. **Squoosh** (https://squoosh.app)
   - Browser-based
   - Advanced controls

### **Target File Sizes**
```
High Quality: 100-150KB
Medium:       50-100KB
Web Optimized: 30-50KB
```

---

## 📋 Checklist: Yeni Blog Görseli Eklerken

- [ ] Boyut: 800×500px (16:10)
- [ ] Format: JPG veya PNG
- [ ] File size: < 150KB
- [ ] Açık/okunabilir görsel
- [ ] Brand colors kullanılmış
- [ ] Text overlay varsa okunabilir
- [ ] Minimum 72 DPI
- [ ] Responsive test yapıldı
- [ ] Alt text yazıldı
- [ ] Dosya ismi SEO-friendly
- [ ] Copyright/license kontrol edildi

---

## 🖼️ Görsel Yerleşimi

### Blog Listing Page (index.astro)
```astro
<BlogCard
  title="Blog Title"
  excerpt="Description..."
  image="/images/blog/topic-name.png"  ← Bu path
  href="/blog/slug"
  category="Category"
/>
```

### Dosya Konumu
```
public/
└── images/
    └── blog/
        ├── ai-business.png
        ├── mobile-app-trends.png
        ├── ecommerce-success.png
        ├── seo-strategies.png
        ├── web-performance.png
        └── restaurant-design.png
```

---

## 🎯 SEO İçin Alt Text Önerileri

```html
<!-- Örnek 1: AI Blog -->
<img 
  src="/images/blog/ai-business.png" 
  alt="AI and machine learning transforming modern business operations with neural networks and automation"
  loading="lazy"
/>

<!-- Örnek 2: Mobile App -->
<img 
  src="/images/blog/mobile-app-trends.png" 
  alt="Mobile app development trends 2025 showing iOS and Android cross-platform frameworks"
  loading="lazy"
/>

<!-- Örnek 3: E-Commerce -->
<img 
  src="/images/blog/ecommerce-success.png" 
  alt="E-commerce platform optimization strategies for increased conversions and user experience"
  loading="lazy"
/>
```

**Alt Text Formula:**
```
[Main Topic] + [Key Details] + [Context]
Length: 125 characters or less
Include target keywords naturally
```

---

## 📊 Performans Metrikleri

### Hedef Değerler
```
Load Time: < 1 second
Cumulative Layout Shift: 0
Lazy Loading: Enabled ✓
WebP Format: Optional (fallback)
Responsive: Srcset available
```

### Test Tools
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse

---

## 💡 Pro Tips

### 1. **Consistent Style**
- Tüm blog görselleri benzer stil/tema
- Aynı filter/overlay approach
- Consistent color grading

### 2. **Visual Hierarchy**
- Ana konu net olmalı
- Text overlay varsa okunabilir
- Contrast yeterli olmalı

### 3. **Mobile First**
- 200px height'ta da güzel görünmeli
- Önemli detaylar merkeze
- Küçük text kullanmayın

### 4. **Brand Identity**
- WebnDigital logo eklenebilir (optional)
- Brand colors dominant
- Professional/tech aesthetic

### 5. **Future-Proof**
- 2x density (Retina) için 1600×1000px
- WebP format + JPG fallback
- Srcset attribute kullanın

---

## 🎨 Design Templates

### Canva Template URLs
```
Tech Blog Header:
https://www.canva.com/templates/EAE...

AI/ML Illustrations:
https://www.canva.com/templates/EAF...

Business/Corporate:
https://www.canva.com/templates/EAG...
```

### Figma Community
```
Blog Header Templates:
Search: "blog header tech"
Search: "article thumbnail"
```

---

## 📞 Destek

Görsel tasarımı ile ilgili sorular için:
- Email: hello@webndigital.com
- Design Lead: Sophie Ward

---

**Son Güncelleme:** 9 Ocak 2025
**Versiyon:** 1.0
**Durum:** ✅ Aktif

