# Mager Software Solution PLC — Full-Stack Website Documentation

## 1. Overview

Mager Software Solution PLC is a software company that needs a comprehensive, dynamic, and content-rich website to present:

- The company itself (mission, vision, values)
- Services offered
- Portfolio and past projects (with demonstrations)
- Ongoing projects
- Team members and their roles
- Blogs/news
- Contact information including location on a map
- An admin panel to manage all content

The system follows a **headless CMS approach** — a Next.js frontend consumes data from a Node.js + Express REST API, backed by a PostgreSQL database. The admin dashboard is integrated into the same Next.js app with role-based access control.

---

## 2. System Architecture

```
[Browser (Public)]
        |
        v
[Frontend - Next.js (React)]
        |  REST API
        v
[Backend API - Node.js + Express]
        |
        v
[Database - PostgreSQL]
        |
        v
[Admin Dashboard - Integrated in Next.js (Role-Based)]
```

| Layer     | Technology (Chosen)                            |
|-----------|------------------------------------------------|
| Frontend  | Next.js (SSR/SSG for SEO) + Tailwind CSS      |
| Backend   | Node.js + Express.js                           |
| Database  | PostgreSQL                                     |
| Admin     | Integrated inside Next.js (role-based access)  |
| Media     | Cloudinary / AWS S3 for images, videos, files  |
| Map       | Leaflet + OpenStreetMap / Google Maps API      |
| Auth      | JWT + OAuth (for admin login)                  |
| Deploy    | Vercel / Netlify (frontend), Render / Railway / AWS (backend) |

---

## 3. Content Sections (Public Side)

### 3.1 Hero Section
- Large banner with company tagline, CTA buttons
- Animated background or slideshow of projects
- Configurable via admin (image, text, buttons)

### 3.2 About Us
- Company history, mission, vision, values
- Core team photo or illustration
- Admin editable (rich text editor)

### 3.3 Services
- Cards/grid of services offered (Software Dev, App Dev, Cloud, AI, Consulting, etc.)
- Each service: icon, title, short description, link to detail page
- Admin: add/edit/reorder/delete services

### 3.4 Our Team
- Grid of current employees
- Each member: photo, name, role, short bio, social links
- Admin: add/edit/delete team members (with role and visibility toggle)

### 3.5 Portfolio / Work Demonstration
- Gallery of past projects
- Each project: title, description, tech stack, client, live URL, screenshots/videos, date
- Categorization (web, mobile, AI, etc.)
- Admin: full CRUD, toggle publish status, mark as featured

### 3.6 Ongoing Projects
- Similar to portfolio but for in-progress work
- Shows progress status (Planning, In Development, Testing, Deployed)
- Admin: manage lifecycle status

### 3.7 Blog / News
- Company blog for articles, case studies, announcements
- Each post: title, slug, cover image, author, content (rich text), tags, published date
- Admin: write/edit with rich text editor, schedule publish, draft/publish/archive

### 3.8 Contact & Location
- Contact form (name, email, subject, message) — sends email to company
- Embedded interactive map showing company address
- Phone, email, physical address, social media links

### 3.9 Footer
- Quick links, social media, newsletter signup, copyright

---

## 4. Admin Dashboard

### 4.1 Authentication
- Secure login with email + password
- JWT-based session management
- Optional: multi-admin support with role levels (Super Admin, Editor, Viewer)

### 4.2 Dashboard Home
- Quick stats: total projects, blog posts, team members, unread messages
- Recent activity log

### 4.3 Content Management Modules

| Module           | Actions                                      |
|------------------|----------------------------------------------|
| Hero Slides      | Add, edit, reorder, toggle visibility        |
| About Page       | Rich text editor for full page content       |
| Services         | CRUD + reorder via drag-and-drop             |
| Team Members     | CRUD + upload photo + toggle published       |
| Projects         | CRUD + upload media + toggle publish status   |
| Ongoing Projects | CRUD + progress status management            |
| Blog Posts       | CRUD + rich text editor + publish/draft      |
| Contact Messages | View, mark as read/replied, delete           |
| Site Settings    | Company name, logo, favicon, SEO meta, social links |

### 4.4 Publish Controls
- Every content entity has a **status** field: `published`, `draft`, `archived`
- Admin decides what appears on the public site
- Scheduled publishing for blog posts

### 4.5 Media Manager
- Centralized upload area for images, videos, documents
- Reusable across all content modules

---

## 5. Database Schema (PostgreSQL — Relational Design)

All tables use `UUID` primary keys, `TIMESTAMPTZ` for timestamps, and `JSONB` for flexible fields. Foreign keys enforce referential integrity.

### 5.1 User (Admin)
- `id` UUID PK, `name` VARCHAR(255), `email` VARCHAR(255) UNIQUE, `password_hash` VARCHAR(255), `role` VARCHAR(50), `created_at` TIMESTAMPTZ, `updated_at` TIMESTAMPTZ

### 5.2 Service
- `id` UUID PK, `title` VARCHAR(255), `slug` VARCHAR(255) UNIQUE, `description` TEXT, `icon` VARCHAR(500), `order_index` INT, `is_published` BOOLEAN, `created_at` TIMESTAMPTZ, `updated_at` TIMESTAMPTZ

### 5.3 TeamMember
- `id` UUID PK, `name` VARCHAR(255), `role` VARCHAR(255), `bio` TEXT, `photo_url` VARCHAR(500), `email` VARCHAR(255), `social_links` JSONB, `order_index` INT, `is_published` BOOLEAN, `created_at` TIMESTAMPTZ, `updated_at` TIMESTAMPTZ

### 5.4 Project
- `id` UUID PK, `title` VARCHAR(255), `slug` VARCHAR(255) UNIQUE, `description` TEXT, `client` VARCHAR(255), `tech_stack` JSONB, `category` VARCHAR(100), `live_url` VARCHAR(500), `screenshots` JSONB, `is_featured` BOOLEAN, `status` VARCHAR(20), `type` VARCHAR(20), `progress` VARCHAR(50), `created_at` TIMESTAMPTZ, `updated_at` TIMESTAMPTZ

### 5.5 BlogPost
- `id` UUID PK, `title` VARCHAR(255), `slug` VARCHAR(255) UNIQUE, `excerpt` TEXT, `content` TEXT, `cover_image` VARCHAR(500), `author_id` UUID FK → User.id, `tags` JSONB, `status` VARCHAR(20), `published_at` TIMESTAMPTZ, `created_at` TIMESTAMPTZ, `updated_at` TIMESTAMPTZ

### 5.6 ContactMessage
- `id` UUID PK, `name` VARCHAR(255), `email` VARCHAR(255), `subject` VARCHAR(500), `message` TEXT, `is_read` BOOLEAN DEFAULT FALSE, `created_at` TIMESTAMPTZ

### 5.7 SiteSetting
- `id` UUID PK, `key` VARCHAR(255) UNIQUE, `value` JSONB, `updated_at` TIMESTAMPTZ

### 5.8 HeroSlide
- `id` UUID PK, `title` VARCHAR(255), `subtitle` TEXT, `cta_text` VARCHAR(255), `cta_link` VARCHAR(500), `background_image` VARCHAR(500), `order_index` INT, `is_published` BOOLEAN, `created_at` TIMESTAMPTZ, `updated_at` TIMESTAMPTZ

---

## 6. API Endpoints (RESTful — Node.js + Express)

### Public
- `GET /api/hero-slides` — active slides
- `GET /api/about` — about page content
- `GET /api/services` — published services
- `GET /api/team` — published team members
- `GET /api/projects` — published projects (query: `?type=completed|ongoing`)
- `GET /api/projects/:slug` — single project detail
- `GET /api/blog` — published blog posts (paginated)
- `GET /api/blog/:slug` — single blog post
- `POST /api/contact` — submit contact form
- `GET /api/settings` — public site settings

### Admin (protected — JWT middleware)
- Full CRUD for all above resources
- `POST /api/auth/login` — admin login
- `GET /api/auth/me` — current admin info
- `GET /api/contact/messages` — list messages
- `PATCH /api/contact/messages/:id` — mark as read
- `POST /api/media/upload` — upload file
- `GET /api/dashboard/stats` — dashboard statistics

---

## 7. UI/UX Design Direction

- **Theme**: Modern, clean, professional — tech-company aesthetic
- **Primary Color**: `#FE6811` (vibrant orange — used for CTAs, highlights, active states, buttons)
- **Secondary Color**: `#003366` (deep navy blue — used for headers, nav bars, footer, backgrounds)
- **Neutral Colors**: White (`#FFFFFF`) and Black (`#000000`) — used for text, backgrounds, borders, and contrast
- **Typography**:
  - **Headings**: Syne — bold, geometric, modern, gives a premium tech-company character
  - **Body**: Inter — exceptionally legible, clean, professional at all sizes
  - Both available on Google Fonts (free)
- **Layout**: Full-width hero, card-based sections, smooth scroll, subtle animations
- **Responsive**: Mobile-first, full responsiveness across all sections
- **Language**: English, with potential i18n support later

---

## 8. Admin UX

- Sidebar navigation with collapsible menu
- Table-based listings with search, filter, sort
- Inline publish toggle switches
- Rich text editor (TipTap / Quill / TinyMCE)
- Drag-and-drop image upload with preview
- Toast notifications for success/error feedback
- Confirmation modals for destructive actions

---

## 9. Future / Stretch Goals

- Multi-language support (Amharic + English)
- Client login portal for project tracking
- Newsletter subscription and email campaigns
- Analytics dashboard (page views, form submissions)
- Testimonials / client reviews section
- Careers / job listings page
- Dark mode toggle

---

## 10. Folder Structure (Chosen Stack)

```
E:\Mager\Website\
├── frontend/               # Next.js app (React + Tailwind CSS)
│   ├── app/
│   │   ├── (public)/       # Public pages (SSR/SSG)
│   │   └── admin/          # Admin dashboard (role-based)
│   ├── components/
│   ├── lib/                # API client, utilities
│   └── public/
├── backend/                # Node.js + Express API
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Sequelize / Knex models
│   │   ├── routes/         # Express routers
│   │   ├── middleware/     # Auth, validation, error handling
│   │   └── utils/          # Helpers, config
│   ├── migrations/         # PostgreSQL migrations
│   ├── seeds/              # Seed data
│   ├── uploads/
│   └── package.json
├── docs/                   # Documentation
│   └── system-documentation.md
└── README.md
```

---

## 11. Development Phases

| Phase | Description                                        |
|-------|----------------------------------------------------|
| 1     | Next.js + Express project setup, PostgreSQL schema |
| 2     | Express API — auth + CRUD modules                  |
| 3     | Next.js admin dashboard — all pages                |
| 4     | Next.js public frontend — all sections             |
| 5     | Media upload, map integration                      |
| 6     | Testing, SEO, performance tuning                   |
| 7     | Deployment and CI/CD                               |

---

*Document generated for Mager Software Solution PLC — July 2026*
