# Admin Panel — Mager Website

## Non-Technical Overview (For Stakeholders)

### What This Is

An admin panel that lets the Mager team edit the public website content in real time — without writing code. Log in, flip on "Edit Mode," click any section, change text/images, and publish.

### How It Works

1. **Login page** — Secure authentication page at `/admin`. Only authorized team members can access.
2. **Same look as the public site** — After login, the admin sees exactly the visitor-facing website.
3. **Edit Mode toggle** — A floating button at the top of the page. When turned ON, every section becomes clickable/editable.
4. **Click to edit** — Click any heading, paragraph, image, button label, or card content. An inline editor or modal opens for that piece of content.
5. **Save & Publish** — A "Save Changes" button (or Auto-save) persists changes. Once saved, the live public website reflects the updates immediately.

### Who Uses It

- **Content managers** — Update service descriptions, blog posts, team bios, portfolio projects.
- **Marketing team** — Change hero headlines, CTAs, testimonials.
- **Admin staff** — Update contact info, office address, phone numbers.

### What Can Be Edited

| Section | Editable Content |
|---------|-----------------|
| Navbar | Logo text, navigation link labels |
| Hero | Headline, subtitle, CTA button text, slideshow images |
| About | Section title, subtitle, body paragraphs, stats, values (title + desc) |
| Services | All 6 service cards (icon, tag, title, description, feature list) |
| Team | All 4 team members (name, role, bio, photo) |
| Portfolio | All 3 projects (category, title, client, description, tech stack, images, resource links) |
| Ongoing | All 4 projects (same fields, plus progress %, status, remaining time) |
| Blog | All 3 posts (title, date, read time, author, body HTML, image) |
| Contact | Section text, address, phone, email, hours, form labels/placeholders |
| Footer | Description, link labels, copyright, legal links |

---

## Technical Architecture (For Developers)

### Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) — same project, routes under `src/app/admin/` |
| Auth | NextAuth.js v5 with credentials provider (email + password) |
| Storage | Local JSON files in `src/data/` (MVP). Upgrade path to PostgreSQL + Prisma. |
| State | React Context for edit mode + dirty state tracking |
| UI | Same as frontend — reuse all existing components with `editable` prop |
| Styling | Exactly the same CSS (globals.css). Admin-only styles in `admin.css` |

### Route Structure

```
src/app/
├── admin/
│   ├── login/
│   │   └── page.tsx          — Login form
│   ├── layout.tsx            — Auth guard + admin shell
│   └── page.tsx              — The editable frontend clone
├── page.tsx                  — Public frontend (unchanged)
```

### Data Flow

```
[Admin edits content]
        │
        ▼
[React state / Context]
        │
        ▼
[Save button] ──► API route POST /api/admin/save
        │
        ▼
[Writes to data store]
  ┌──────────────┐
  │  local JSON  │  (MVP — src/data/*.ts files reload)
  │  PostgreSQL  │  (production — Prisma ORM)
  └──────────────┘
        │
        ▼
[Public site revalidates] ──► Next.js revalidatePath('/')
```

### Auth Strategy (MVP)

- **NextAuth.js** with a credentials provider.
- Admin credentials stored in `.env.local`:
  ```
  ADMIN_EMAIL=admin@magersoft.com
  ADMIN_PASSWORD=hashed_password_here
  NEXTAUTH_SECRET=random_secret
  ```
- Session persisted via JWT cookie.
- `admin/layout.tsx` checks session — redirects to `/admin/login` if unauthenticated.

### Edit Mode Architecture

#### Context (`src/contexts/EditModeContext.tsx`)

```typescript
interface EditModeContextType {
  editMode: boolean;
  toggleEditMode: () => void;
  dirty: boolean;           // true if unsaved changes exist
  setDirty: (d: boolean) => void;
  editedContent: EditedContent;
  updateContent: (path: string, value: any) => void;
}
```

- `editMode` — boolean toggle (ON/OFF)
- `dirty` — tracks whether there are unsaved changes
- `editedContent` — a JSON object that accumulates edits before save

#### Component Pattern

Every content component gets an optional `editable` prop:

```typescript
// Reuse existing SectionTitle component
<SectionTitle editable={editMode} section="hero" field="subtitle">
  {t('hero.subtitle')}
</SectionTitle>
```

When `editable` is true:
1. Clicking the text opens an inline contenteditable or a small modal
2. On change, `updateContent('hero.subtitle', newValue)` is called
3. The component shows a subtle dashed border indicating it's editable

#### Editable Wrapper Component

```typescript
// src/components/admin/Editable.tsx
<Editable
  section="hero"
  field="title"
  value={t('hero.title')}
  type="text"   // | "textarea" | "image" | "list" | "rich-text"
  onSave={(path, val) => updateContent(path, val)}
>
  {children}
</Editable>
```

### Save / Publish Flow

1. Admin makes edits → `editedContent` object accumulates changes in Context
2. Admin clicks "Publish Changes" floating button
3. `POST /api/admin/save` receives `{ editedContent }`
4. API route:
   - **MVP**: Writes to `src/data/backup/*.ts` or a JSON file in `public/`
   - **Production**: Upserts into PostgreSQL `content` table
5. Calls `revalidatePath('/')` to refresh the public site
6. Returns success → UI shows toast "Published"

### Data Storage (Production)

```sql
CREATE TABLE sections (
  id          UUID PRIMARY KEY,
  key         TEXT UNIQUE NOT NULL,       -- "hero.title", "services.0.desc"
  value       JSONB NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### Image Upload

- Images stored in `public/images/` or cloud storage (Azure Blob / AWS S3)
- Admin image picker shows existing images + upload new
- On upload → file saved → URL returned → stored in content

### Security

| Concern | Mitigation |
|---------|-----------|
| Unauthorized access | NextAuth session guard on `/admin/*` |
| XSS | DOMPurify on all rich-text inputs |
| CSRF | Next.js built-in CSRF protection |
| Rate limiting | Limit login attempts (e.g., 5 per minute) |
| Session hijacking | HTTP-only, secure, same-site cookies |

### Implementation Phases

#### Phase 1 — Auth + Edit Mode Shell
- [ ] Install NextAuth.js
- [ ] Create `/admin/login` page
- [ ] Create `/admin/layout.tsx` with auth guard
- [ ] Create `EditModeContext`
- [ ] Create `Editable` wrapper component
- [ ] Add floating "Edit Mode" toggle + "Publish" button

#### Phase 2 — Editable Sections
- [ ] Wrap each section component with `Editable`
- [ ] Support text, textarea, image, list (features/tech) edit types
- [ ] Inline edit modal for rich content (service cards, portfolio items)

#### Phase 3 — Persistence
- [ ] API route `POST /api/admin/save`
- [ ] Write edited content to JSON file (MVP)
- [ ] `revalidatePath('/')` on publish
- [ ] Toast notifications (saved / error)

#### Phase 4 — Polish
- [ ] Image upload & management
- [ ] Draft vs. published (preview before publish)
- [ ] Change history / audit log
- [ ] Role-based access (admin vs. editor)

### Key Files to Create

```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── api/admin/save/route.ts
├── components/
│   ├── admin/
│   │   ├── EditModeToggle.tsx
│   │   ├── Editable.tsx
│   │   ├── PublishButton.tsx
│   │   └── InlineEditor.tsx
│   └── ui/
│       └── Toast.tsx
├── contexts/
│   └── EditModeContext.tsx
└── lib/
    ├── auth.ts              — NextAuth config
    └── content-store.ts     — read/write content
```

### Files to Modify

- `src/app/layout.tsx` — add `EditModeProvider`
- `src/app/globals.css` — add admin-only styles
- `src/components/sections/*` — wrap content with `<Editable>`
- `src/data/*.ts` — may need to export write functions (MVP)
- `package.json` — add `next-auth` dependency
