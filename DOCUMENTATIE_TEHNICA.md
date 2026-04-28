# 📘 Documentație Tehnică - Fancy Food Truck

## Cuprins
1. [Prezentare Generală](#prezentare-generală)
2. [Arhitectura Aplicației](#arhitectura-aplicației)
3. [Stack Tehnologic](#stack-tehnologic)
4. [Structura Proiectului](#structura-proiectului)
5. [Componente Principale](#componente-principale)
6. [Autentificare și Securitate](#autentificare-și-securitate)
7. [Gestionarea Stării](#gestionarea-stării)
8. [API și Backend](#api-și-backend)
9. [Optimizări și Performanță](#optimizări-și-performanță)
10. [Instalare și Configurare](#instalare-și-configurare)
11. [Dezvoltare](#dezvoltare)
12. [Build și Deployment](#build-și-deployment)

---

## Prezentare Generală

**Fancy Food Truck** este o aplicație web modernă de tip Single Page Application (SPA) construită cu React 19, destinată comenzilor online pentru restaurante. Aplicația oferă o experiență de utilizare fluidă, optimizată pentru dispozitive mobile și desktop, cu suport multi-limbă (Română/Engleză).

### Scopul Aplicației
- Permite clienților să vizualizeze meniul și să plaseze comenzi online
- Oferă un sistem de autentificare securizat cu JWT tokens
- Integrează Google Maps pentru selectarea precisă a adresei de livrare
- Oferă un panou de administrare pentru gestionarea produselor și comenzilor
- Asigură o experiență de utilizare premium cu animații fluide și design modern

---

## Arhitectura Aplicației

### Arhitectură Client-Server

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           React 19 + Vite Application                  │ │
│  │                                                         │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │ Components   │  │   Context    │  │   Hooks     │ │ │
│  │  │              │  │   Providers  │  │             │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  │                                                         │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │         Utils & API Client Layer                 │ │ │
│  │  │  - Auth (JWT + CSRF)                             │ │ │
│  │  │  - API Client                                    │ │ │
│  │  │  - Validation                                    │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│              Backend API (backend.trifadrian.ro)            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  - RESTful API Endpoints                               │ │
│  │  - JWT Authentication                                  │ │
│  │  - CSRF Protection                                     │ │
│  │  - Database Management                                 │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Pattern-uri de Design Utilizate

1. **Component-Based Architecture** - Aplicația este împărțită în componente React reutilizabile
2. **Context API Pattern** - Pentru gestionarea stării globale (limbă, tema, utilizator)
3. **Custom Hooks Pattern** - Logică reutilizabilă încapsulată în hooks personalizați
4. **Lazy Loading Pattern** - Componente încărcate la cerere pentru optimizare
5. **Repository Pattern** - Abstractizare API prin `apiClient.js`
6. **Provider Pattern** - Context providers pentru funcționalități cross-cutting

---

## Stack Tehnologic

### Frontend Core
| Tehnologie | Versiune | Scopul |
|------------|----------|--------|
| **React** | 19.2.0 | Framework UI principal, componente reactive |
| **Vite** | 7.2.2 | Build tool ultra-rapid, HMR, optimizări |
| **JavaScript (ES6+)** | ESNext | Limbaj de programare modern |

### Styling & UI
| Tehnologie | Versiune | Scopul |
|------------|----------|--------|
| **Tailwind CSS** | 3.3.3 | Framework CSS utility-first |
| **PostCSS** | 8.5.6 | Procesare CSS |
| **Autoprefixer** | 10.4.22 | Compatibilitate cross-browser |
| **Framer Motion** | 12.23.24 | Animații și tranziții fluide |
| **Lucide React** | 0.553.0 | Set modern de iconuri |

### Integrări și Servicii
| Serviciu | Scopul |
|----------|--------|
| **Google Maps API** | Integrare hărți, geocoding, place autocomplete |
| **Firebase** | Backend services (opțional) |

### Development Tools
| Tool | Scopul |
|------|--------|
| **ESLint** | Linting și verificare cod |
| **Vite Dev Server** | Server de dezvoltare cu HMR |
| **React DevTools** | Debugging componente React |

---

## Structura Proiectului

```
fancy-food-truck/
│
├── public/                          # Assets statice (imagini, favicon)
│
├── src/
│   ├── main.jsx                     # Entry point, render root
│   │
│   ├── client/                      # Cod client-side
│   │   ├── App.jsx                  # Componenta root, logică principală
│   │   │
│   │   ├── api/
│   │   │   └── apiClient.js         # Client HTTP, wrapper fetch
│   │   │
│   │   ├── components/              # Componente React
│   │   │   ├── About.jsx            # Secțiune "Despre noi"
│   │   │   ├── Cart.jsx             # Coș de cumpărături
│   │   │   ├── Checkout.jsx         # Proces de checkout
│   │   │   ├── Footer.jsx           # Footer site
│   │   │   ├── Hero.jsx             # Secțiune hero
│   │   │   ├── LanguageSelector.jsx # Selector limbă
│   │   │   ├── Location.jsx         # Hartă și locație
│   │   │   ├── Menu.jsx             # Afișare meniu produse
│   │   │   ├── Modal.jsx            # Component modal reutilizabil
│   │   │   ├── MyOrders.jsx         # Istoric comenzi utilizator
│   │   │   ├── Navigation.jsx       # Navigare și header
│   │   │   ├── OrderConfirmation.jsx# Confirmare comandă
│   │   │   ├── OrderStatus.jsx      # Status comandă în timp real
│   │   │   ├── Testimonials.jsx     # Recenzii clienți
│   │   │   └── UserProfile.jsx      # Profil utilizator
│   │   │
│   │   ├── constants/               # Constante și configurări
│   │   │   ├── styles.js            # Stiluri reutilizabile
│   │   │   ├── translations.js      # Traduceri RO/EN
│   │   │   └── ui.jsx               # Componente UI reutilizabile
│   │   │
│   │   ├── context/                 # React Context providers
│   │   │   └── LanguageContext.jsx  # Context pentru multi-limbă
│   │   │
│   │   ├── hooks/                   # Custom React Hooks
│   │   │   ├── useLanguage.js       # Hook pentru traduceri
│   │   │   └── useMobileOptimization.js # Hook optimizări mobile
│   │   │
│   │   ├── pages/                   # Pagini principale
│   │   │   ├── Admin.jsx            # Panou administrare
│   │   │   └── Auth.jsx             # Autentificare/Înregistrare
│   │   │
│   │   └── styles/                  # Fișiere CSS
│   │       ├── App.css              # Stiluri principale
│   │       └── index.css            # Stiluri globale, Tailwind imports
│   │
│   └── shared/                      # Cod partajat
│       └── utils/                   # Funcții utilitare
│           ├── auth.js              # Autentificare JWT, CSRF
│           ├── corsHandler.js       # Gestionare CORS
│           ├── debug.js             # Utilități debugging
│           ├── deferredInit.js      # Inițializare amânată
│           ├── formUtils.js         # Utilități formulare
│           ├── performance.js       # Monitorizare performanță
│           ├── security.js          # Utilități securitate
│           ├── smoothScroll.js      # Scroll animat
│           └── validation.js        # Validare input
│
├── index.html                       # HTML template principal
├── vite.config.js                   # Configurație Vite
├── tailwind.config.js               # Configurație Tailwind CSS
├── postcss.config.js                # Configurație PostCSS
├── eslint.config.js                 # Configurație ESLint
├── package.json                     # Dependențe și scripturi
└── README.md                        # Documentație generală
```

---

## Componente Principale

### 1. App.jsx - Componenta Root

**Responsabilități:**
- Gestionează starea globală a aplicației (tema, utilizator, coș, comenzi)
- Orchestrează navigarea între diferite view-uri
- Coordonează autentificarea și sesiunea utilizatorului
- Implementează lazy loading pentru optimizare

**State Management:**
```javascript
const [dark, setDark] = useState()           // Tema dark/light
const [currentUser, setCurrentUser]          // Utilizator autentificat
const [cart, setCart]                        // Coș de cumpărături
const [orders, setOrders]                    // Comenzi utilizator
const [view, setView]                        // View curent
const [isCheckingOut, setIsCheckingOut]      // Status checkout
const [confirmedOrder, setConfirmedOrder]    // Comandă confirmată
```

**Funcționalități Cheie:**
- Persistență tema și coș în `localStorage`
- Verificare autentificare la mount
- Sincronizare comenzi cu backend-ul
- Gestionare evenimente adăugare/ștergere produse din coș

### 2. Navigation.jsx - Sistem de Navigare

**Caracteristici:**
- Meniu responsive (desktop/mobile)
- Integrare căutare produse
- Indicator coș de cumpărături
- Meniu utilizator cu dropdown
- Toggle dark/light mode

### 3. Menu.jsx - Afișare Produse

**Funcționalități:**
- Afișare produse cu imagini și prețuri
- Filtrare pe categorii
- Sortare (alfabetic, preț, popularitate)
- Căutare produse
- Animații Framer Motion
- Butoane adăugare în coș

### 4. Cart.jsx - Coș de Cumpărături

**Implementare:**
- Afișare produse din coș
- Modificare cantități (+/-)
- Calcul total automat
- Ștergere produse
- Buton navigare la checkout
- Persistență în `localStorage`

### 5. Checkout.jsx - Proces de Comandă

**Workflow:**
1. Verificare autentificare
2. Afișare sumar comandă
3. Integrare Google Maps pentru adresă
4. Formular date livrare
5. Validare formular
6. Trimitere comandă la backend
7. Redirecționare la confirmare

**Integrare Google Maps:**
- Autocomplete adresă
- Geocoding pentru coordonate
- Selector interactiv pe hartă
- Validare adresă selectată

### 6. Admin.jsx - Panou de Administrare

**Funcționalități:**
- Gestionare produse (CRUD)
- Vizualizare comenzi
- Actualizare status comenzi
- Upload imagini produse
- Statistici vânzări
- Acces restricționat (role-based)

### 7. Auth.jsx - Autentificare

**Implementare:**
- Formular Login/Register cu taburi
- Validare client-side
- Integrare JWT tokens
- Afișare erori validare
- Redirect după autentificare

---

## Autentificare și Securitate

### Sistem de Autentificare JWT

**Flow de Autentificare:**

```
┌─────────────┐                    ┌──────────────┐
│   Client    │                    │   Backend    │
└──────┬──────┘                    └──────┬───────┘
       │                                  │
       │  POST /api/auth/login            │
       │  {email, password}               │
       │─────────────────────────────────>│
       │                                  │
       │                                  │ Verificare
       │                                  │ credențiale
       │                                  │
       │  200 OK                          │
       │  {token: "JWT", user: {...}}    │
       │<─────────────────────────────────│
       │                                  │
  Store token                             │
  în localStorage                         │
       │                                  │
       │  GET /api/protected              │
       │  Header: Authorization: Bearer JWT│
       │─────────────────────────────────>│
       │                                  │
       │                                  │ Validare
       │                                  │ JWT token
       │                                  │
       │  200 OK + Data                   │
       │<─────────────────────────────────│
```

### Implementare în `auth.js`

**Funcții Principale:**

1. **`register(userData)`** - Înregistrare utilizator nou
   - Validare date input
   - Trimitere request la `/api/auth/register`
   - Stocare token și user în localStorage

2. **`login(email, password)`** - Autentificare
   - Validare credențiale
   - Obținere JWT token
   - Stocare token și utilizator

3. **`getCurrentUser()`** - Obținere utilizator curent
   - Verificare token valid
   - Request la `/api/auth/me`
   - Actualizare date utilizator

4. **`logout()`** - Deconectare
   - Ștergere token din localStorage
   - Ștergere date utilizator
   - Clear session storage

5. **`getAuthHeaders()`** - Generare headers autentificare
   - Adăugare Authorization header cu Bearer token
   - Adăugare CSRF token pentru protecție

### Protecție CSRF (Cross-Site Request Forgery)

**Implementare:**
```javascript
// Obținere CSRF token de la backend
export const fetchCSRFToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/csrf-token`);
  const data = await response.json();
  sessionStorage.setItem(CSRF_TOKEN_KEY, data.token);
  return data.token;
};

// Utilizare în requests
const headers = await getAuthHeaders();
// headers va conține: X-CSRF-Token: <token>
```

### Securitate la Nivel de Componente

**Protected Routes:**
```javascript
// Verificare autentificare înainte de afișare
if (view === 'admin' && !isAdmin()) {
  return <div>Acces interzis</div>;
}

// Verificare în useEffect
useEffect(() => {
  if (!isAuthenticated()) {
    setView('auth');
  }
}, [view]);
```

---

## Gestionarea Stării

### 1. Local State (useState)

Utilizat pentru stare specifică componentelor:
```javascript
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({});
const [error, setError] = useState(null);
```

### 2. Context API

**LanguageContext** - Gestionare limbă aplicație

```javascript
// Provider
<LanguageProvider>
  <App />
</LanguageProvider>

// Consumer (prin custom hook)
const { language, t, changeLanguage } = useLanguage();

// Utilizare
<h1>{t('welcome')}</h1>  // Output: "Bun venit" sau "Welcome"
```

**Traduceri** (`constants/translations.js`):
```javascript
export const translations = {
  ro: {
    welcome: "Bun venit",
    menu: "Meniu",
    cart: "Coș"
  },
  en: {
    welcome: "Welcome",
    menu: "Menu",
    cart: "Cart"
  }
};
```

### 3. localStorage Persistence

**Persistență Automată:**
```javascript
// Salvare automată la modificări
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);

// Încărcare la mount
const [cart, setCart] = useState(() => {
  const saved = localStorage.getItem('cart');
  return saved ? JSON.parse(saved) : [];
});
```

**Date Stocate:**
- `jwt_token` - Token JWT
- `currentUser` - Utilizator autentificat
- `cart` - Coș de cumpărături
- `theme` - Temă dark/light
- `language` - Limbă preferată
- `uiState` - Stare UI (scroll position, etc.)

---

## API și Backend

### API Client (`api/apiClient.js`)

**Wrapper peste Fetch API:**

```javascript
// GET request
const products = await apiGet('/api/products');

// POST request
const newOrder = await apiPost('/api/orders', orderData);

// PUT request
await apiPut(`/api/orders/${orderId}`, { status: 'completed' });

// DELETE request
await apiDelete(`/api/products/${productId}`);
```

**Caracteristici:**
- Gestionare automată autentificare (JWT + CSRF)
- Handling erori centralizat
- Retry logic pentru requests failed
- CORS handling
- Credentials: 'include' pentru cookies

### Endpoints Backend

**Autentificare:**
- `POST /api/auth/register` - Înregistrare
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Obținere utilizator curent
- `GET /api/auth/csrf-token` - Obținere CSRF token

**Produse:**
- `GET /api/products` - Lista produse
- `POST /api/products` - Creare produs (admin)
- `PUT /api/products/:id` - Actualizare produs (admin)
- `DELETE /api/products/:id` - Ștergere produs (admin)

**Comenzi:**
- `GET /api/orders` - Comenzi utilizator
- `POST /api/orders` - Plasare comandă nouă
- `PUT /api/orders/:id` - Actualizare status (admin)
- `GET /api/orders/:id` - Detalii comandă

**Utilizatori:**
- `GET /api/users/profile` - Profil utilizator
- `PUT /api/users/profile` - Actualizare profil

### Configurare CORS (Development)

**Vite Proxy Configuration:**
```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'https://backend.trifadrian.ro',
      changeOrigin: true,
      secure: false,
      ws: true
    }
  }
}
```

**Beneficii:**
- Evită probleme CORS în development
- Păstrează cookies și credentials
- Simplifică debugging
- Same-origin în browser

---

## Optimizări și Performanță

### 1. Code Splitting și Lazy Loading

**Implementare:**
```javascript
// Import lazy
const Admin = lazy(() => import('./pages/Admin'));
const Checkout = lazy(() => import('./components/Checkout'));

// Utilizare cu Suspense
<Suspense fallback={<LoadingFallback />}>
  {view === 'admin' && <Admin />}
</Suspense>
```

**Beneficii:**
- Reducere bundle size inițial
- Încărcare doar cod necesar
- Timp de încărcare mai rapid
- Better user experience

### 2. Optimizări Mobile

**Custom Hook `useMobileOptimization`:**
```javascript
const { isMobile, animationDisabled } = useMobileOptimization();

// Condiționare animații
const variants = {
  hidden: { opacity: 0, y: animationDisabled ? 0 : 20 },
  visible: { opacity: 1, y: 0 }
};
```

**Detectări:**
- Screen size < 768px = mobile
- Touch support
- Reduced motion preference
- Performance tier device

### 3. Vite Build Optimizations

**Configurare `vite.config.js`:**

```javascript
build: {
  target: 'esnext',
  minify: 'esbuild',
  
  rollupOptions: {
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false
    },
    
    output: {
      manualChunks: {
        firebase: ['firebase/app', 'firebase/auth'],
        framer: ['framer-motion']
      }
    }
  },
  
  cssCodeSplit: true,
  sourcemap: false,
  chunkSizeWarningLimit: 500
}
```

**Rezultate:**
- Tree-shaking agresiv
- Code splitting inteligent
- CSS code splitting
- Minificare optimizată cu esbuild
- Bundle size redus ~40%

### 4. Image Optimization

**Best Practices:**
- Format WebP pentru imagini moderne
- Lazy loading imagini (`loading="lazy"`)
- Responsive images cu `srcset`
- Compresia imaginilor înainte de upload
- CDN pentru assets statice (opțional)

### 5. Performance Monitoring

**Utilitar `performance.js`:**
```javascript
import { measurePerformance } from '../utils/performance';

// Măsurare timp operație
const { duration } = await measurePerformance(
  () => fetchProducts(),
  'Fetch Products'
);

console.log(`Loaded products in ${duration}ms`);
```

---

## Instalare și Configurare

### Cerințe Sistem

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 sau **yarn** >= 1.22.0
- **Git** pentru clonare repository
- **Browser modern** (Chrome, Firefox, Safari, Edge)

### Pași Instalare

**1. Clonare Repository:**
```bash
git clone https://github.com/adrian909/fancy-food-truck-FE.git
cd fancy-food-truck-FE
```

**2. Instalare Dependențe:**
```bash
npm install
# sau
yarn install
```

**3. Configurare Variabile de Mediu:**

Creare fișier `.env` în root:
```env
# Google Maps API
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Firebase (opțional)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend API (opțional - default: https://backend.trifadrian.ro)
VITE_API_BASE_URL=https://your-backend-url.com
```

**4. Obținere Google Maps API Key:**
- Accesează [Google Cloud Console](https://console.cloud.google.com/)
- Crează un proiect nou
- Activează API-uri: Maps JavaScript API, Geocoding API, Places API
- Generează API Key
- Restrângere API Key (opțional, recomandat):
  - HTTP referrers: `localhost:5173/*`, `your-domain.com/*`
  - API restrictions: Maps JavaScript API, Geocoding, Places

**5. Start Development Server:**
```bash
npm run dev
# sau
yarn dev
```

Aplicația va rula la: `http://localhost:5173`

---

## Dezvoltare

### Scripturi Disponibile

```bash
# Development server cu HMR
npm run dev

# Build pentru producție
npm run build

# Preview build local
npm run preview

# Linting cod
npm run lint

# Tailwind CLI (opțional)
npm run tailwind
```

### Workflow Dezvoltare

**1. Creare Componentă Nouă:**
```bash
# Creare fișier component
touch src/client/components/MyNewComponent.jsx
```

```javascript
// Template component
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export default function MyNewComponent({ dark }) {
  const { t } = useLanguage();
  const [state, setState] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${dark ? 'dark' : ''}`}
    >
      <h2>{t('myTitle')}</h2>
      {/* Component content */}
    </motion.div>
  );
}
```

**2. Adăugare Traduceri:**
```javascript
// constants/translations.js
export const translations = {
  ro: {
    myTitle: "Titlul Meu"
  },
  en: {
    myTitle: "My Title"
  }
};
```

**3. Integrare în App.jsx:**
```javascript
// Import lazy
const MyNewComponent = lazy(() => import('./components/MyNewComponent'));

// Adăugare în render
{view === 'myView' && (
  <Suspense fallback={<LoadingFallback />}>
    <MyNewComponent dark={dark} />
  </Suspense>
)}
```

### Convenții Cod

**Naming:**
- Componente: PascalCase (`MyComponent.jsx`)
- Funcții: camelCase (`handleClick`, `fetchData`)
- Constante: UPPER_SNAKE_CASE (`API_BASE_URL`)
- Hooks: camelCase cu prefix `use` (`useMyHook`)

**Structură Fișiere:**
- Un component pe fișier
- Imports grupate (React, libraries, local)
- PropTypes sau JSDoc pentru documentare
- Export default pentru componente

**CSS/Styling:**
- Utilizare Tailwind CSS classes
- Dark mode cu conditional classes
- Responsive design: mobile-first
- Evită inline styles unde este posibil

---

## Build și Deployment

### Build Producție

**Generare Build:**
```bash
npm run build
```

**Output:**
```
dist/
├── assets/
│   ├── index-[hash].js      # Main bundle
│   ├── chunk-firebase-[hash].js
│   ├── chunk-framer-[hash].js
│   ├── index-[hash].css
│   └── ...
├── index.html               # Entry point
└── ...
```

**Optimizări Automate:**
- Minificare JavaScript (esbuild)
- Minificare CSS
- Tree-shaking cod neutilizat
- Code splitting
- Asset optimization
- Hashing pentru cache busting

### Deployment Options

**1. Netlify (Recomandat):**
```bash
# Instalare Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

**Configurare `netlify.toml`:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**2. Vercel:**
```bash
# Instalare Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**3. GitHub Pages:**
```bash
# Build cu base path
npm run build -- --base=/repository-name/

# Deploy cu gh-pages
npm install -g gh-pages
gh-pages -d dist
```

**4. Server Propriu (Apache/Nginx):**

**Nginx Config:**
```nginx
server {
  listen 80;
  server_name your-domain.com;
  root /var/www/fancy-food-truck/dist;
  index index.html;

  # SPA routing
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Gzip compression
  gzip on;
  gzip_types text/css application/javascript image/svg+xml;

  # Cache static assets
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

### Variables de Mediu în Producție

**Important:** 
- NU include `.env` în git
- Configurează variabilele în platforma de hosting
- Utilizează valori diferite pentru development/production

**Netlify:**
Site Settings → Build & Deploy → Environment Variables

**Vercel:**
Project Settings → Environment Variables

---

## Debugging și Troubleshooting

### Common Issues

**1. CORS Errors:**
```
Access to fetch at 'https://backend...' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```
**Soluție:** Verifică proxy în `vite.config.js` sau backend CORS headers

**2. JWT Token Expirat:**
```
Error: Unauthorized - Token expired
```
**Soluție:** Implementează refresh token logic sau re-autentificare

**3. Google Maps API Errors:**
```
Google Maps JavaScript API error: InvalidKeyMapError
```
**Soluție:** Verifică API key și restricții în Google Cloud Console

**4. Build Errors:**
```
Transform failed with 1 error:
ERROR: Top-level await is not available...
```
**Soluție:** Verifică `target: 'esnext'` în `vite.config.js`

### Debug Tools

**React DevTools:**
- Inspect component tree
- View props/state
- Profile performance

**Network Tab:**
- Monitor API requests
- Check headers (Authorization, CSRF)
- Verify response data

**Console Logging:**
```javascript
import { debug } from '../shared/utils/debug';

debug.log('User data:', userData);
debug.error('Failed to fetch:', error);
```

---

## Securitate și Best Practices

### Securitate

1. **Sanitizare Input:**
   - Validare toate input-urile utilizator
   - Escape HTML în afișare
   - Validare server-side AND client-side

2. **Protecție XSS:**
   - React auto-escape în JSX
   - Evită `dangerouslySetInnerHTML`
   - Sanitize user-generated content

3. **CSRF Protection:**
   - Token CSRF în toate requests mutative
   - Verificare server-side

4. **Secure Storage:**
   - Token JWT în localStorage (nu sessionStorage pentru persistență)
   - CSRF token în sessionStorage (per session)
   - NU stoca date sensibile în localStorage

### Best Practices

1. **Performance:**
   - Lazy load componente mari
   - Memoizare cu `useMemo`, `useCallback`
   - Virtualizare liste lungi
   - Optimizare imagini

2. **Accessibility:**
   - Semantic HTML
   - ARIA labels
   - Keyboard navigation
   - Focus management

3. **SEO:**
   - Meta tags în `index.html`
   - SSR pentru pagini critice (opțional)
   - Semantic markup
   - sitemap.xml

4. **Code Quality:**
   - ESLint rules
   - Consistent formatting
   - Comments pentru logică complexă
   - Unit tests (opțional)

---

## Contribuții și Mentenanță

### Contribuții

Pentru a contribui la proiect:
1. Fork repository
2. Creare branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Deschide Pull Request

### Versioning

Proiectul urmează [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### License

Acest proiect este licențiat sub termenii specificați în fișierul LICENSE.

---

## Contact și Suport

**Developer:** Adrian  
**Repository:** [github.com/adrian909/fancy-food-truck-FE](https://github.com/adrian909/fancy-food-truck-FE)  
**Backend:** https://backend.trifadrian.ro

Pentru întrebări, bug reports sau feature requests, deschide un issue pe GitHub.

---

*Documentație generată: Februarie 2026*  
*Versiune aplicație: 0.0.0*
