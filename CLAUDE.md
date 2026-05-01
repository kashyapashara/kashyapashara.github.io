# Kashyap Ashara Portfolio - Development Guide

## Project Overview

Modern React portfolio website hosted on GitHub Pages. Built with React 18, TypeScript, Tailwind CSS, React Router, and Framer Motion. Features dark mode support, responsive design, and content management via JSON.

**Live Site**: https://kash9350.github.io  
**Repository**: https://github.com/kash9350/kash9350.github.io  
**Stack**: Vite + React + TypeScript + Tailwind CSS

## Tech Stack

### Core Dependencies
- **React 18**: UI framework with hooks
- **React Router v6**: Client-side routing for detail pages
- **TypeScript 5**: Static type checking (strict mode)
- **Tailwind CSS 3**: Utility-first styling
- **Framer Motion 10**: Smooth animations and transitions
- **Lucide React**: Icon library

### Build & Dev Tools
- **Vite 5**: Fast dev server and optimized production builds
- **PostCSS**: CSS processing with autoprefixer
- **ESLint + TypeScript**: Code quality and type checking
- **TypeScript Strict Mode**: Full type safety

## Project Structure

```
src/
├── features/           # Feature-based sections (Hero, Skills, etc.)
│   ├── Hero/          # Introduction component
│   ├── Skills/        # Skills showcase
│   ├── Experience/    # Work history
│   ├── Projects/      # Project showcase
│   ├── Contact/       # Contact section
│   └── Header/        # Navigation & theme toggle
├── pages/             # Page components
│   ├── Home.tsx       # Main portfolio page
│   ├── ProjectDetail.tsx  # Individual project (Phase 5)
│   └── ExperienceDetail.tsx  # Individual experience (Phase 5)
├── components/        # Shared UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   └── Container.tsx
├── hooks/             # Custom React hooks
│   ├── usePortfolioData.ts   # Load data.json
│   ├── useTheme.ts          # Dark mode hook
│   └── useScrollToTop.ts    # Scroll to top on route change
├── context/           # Global state management
│   └── ThemeContext.tsx    # Dark mode provider
├── types/             # TypeScript definitions
│   └── index.ts
├── utils/             # Utility functions
│   ├── animations.ts  # Framer Motion presets
│   ├── constants.ts
│   └── helpers.ts
├── styles/            # Global styles
│   └── globals.css    # Tailwind + custom animations
├── App.tsx            # Router setup
└── main.tsx           # React entry point

public/
├── data.json          # All portfolio content (SINGLE SOURCE OF TRUTH)
└── resume.pdf         # Downloadable resume

Configuration Files:
├── vite.config.ts     # Vite configuration (base: './')
├── tsconfig.json      # TypeScript configuration (strict mode)
├── tailwind.config.ts # Tailwind theme customization
├── postcss.config.js  # PostCSS plugins
└── package.json       # Dependencies and scripts
```

## Data Management

### Content Structure (`public/data.json`)

All portfolio content is stored in a single JSON file. Update this file to change portfolio content without rebuilding.

**Structure**:
```json
{
  "personal": { /* Name, title, links */ },
  "about": "String description",
  "skillCategories": [
    {
      "id": "unique-id",
      "category": "Category Name",
      "skills": [
        { "id": "skill-id", "name": "Skill Name", "level": 85 }
      ]
    }
  ],
  "experience": [
    {
      "id": "exp-id",
      "company": "Company Name",
      "role": "Role",
      "duration": "2023 - Present",
      "description": "Short description",
      "longDescription": "Full description (for detail page)",
      "technologies": ["React", "TypeScript"],
      "achievements": ["Achievement 1"]
    }
  ],
  "projects": [
    {
      "id": "proj-id",
      "title": "Project Title",
      "description": "Short description",
      "longDescription": "Full description",
      "technologies": ["React"],
      "links": { "github": "url", "demo": "url" },
      "featured": true
    }
  ]
}
```

### Updating Content

**To add new project/experience/skill**:
1. Edit `public/data.json`
2. Add entry to appropriate array with unique `id`
3. Commit and push to GitHub
4. GitHub Actions auto-deploys (within 2 minutes)

**No rebuild needed!** JSON is a static asset loaded at runtime.

## Development Workflow

### Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Development Tips

- **Hot Module Replacement**: Changes auto-reload without refresh
- **Type Safety**: Always define TypeScript types before implementing
- **Path Aliases**: Use `@components/*`, `@features/*`, etc. (configured in tsconfig.json)
- **Dark Mode**: Use `dark:` Tailwind classes for dark mode styles
- **Animations**: Import from `src/utils/animations.ts` for consistency

### Code Style

- **TypeScript**: Use strict mode, avoid `any`
- **Components**: Use functional components with hooks
- **Naming**: Use PascalCase for components, camelCase for functions
- **Imports**: Organize by: React → external → local → types
- **Styling**: Prefer Tailwind utility classes over CSS modules

## Implementation Phases

### ✅ Phase 1: Project Setup (COMPLETED)
- Vite + React + TypeScript initialization
- Tailwind CSS configuration
- Folder structure
- TypeScript types
- Theme context
- Basic routing

### Phase 2: Routing Setup
- React Router configuration
- Home page main route
- Detail page routes (`/project/:id`, `/experience/:id`)
- Navigation state management
- Scroll-to-top on route change

### Phase 3: Global Hooks
- `usePortfolioData()` - Load and cache data.json
- `useTheme()` - Dark mode state
- `useScrollToTop()` - Route change effects

### Phase 4: Feature Components
- Header with navigation and theme toggle
- Hero section with intro
- Skills grid by category
- Experience timeline
- Projects showcase with filtering
- Contact section

### Phase 5: Detail Pages
- Project detail page with full description
- Experience detail page with achievements
- Navigation between pages
- Back button navigation

### Phase 6: Animations
- Page enter/exit animations
- Component stagger animations
- Card hover effects
- Smooth transitions
- Scroll animations

### Phase 7: Shared Components
- Reusable UI components (Button, Card, Badge)
- Layout wrapper components
- Loading and error states

### Phase 8: Dark Mode
- Theme toggle in header
- Persistent theme via localStorage
- Smooth theme transitions
- Comprehensive dark mode styling

### Phase 9: Data Loading
- Load data.json at app startup
- Error handling for failed loads
- Loading states while fetching
- Type-safe data access

### Phase 10: GitHub Pages Deployment
- GitHub Actions workflow
- Auto-deploy on push to main
- CI pipeline with tests (optional)

## GitHub Pages Deployment

### Configuration

**vite.config.ts**: Already set with `base: './'` for relative paths

**GitHub Actions** (`.github/workflows/deploy.yml`):
- Automatically triggers on push to main branch
- Runs `npm install && npm run build`
- Deploys `dist/` folder to GitHub Pages

### Deploy Commands

```bash
# Build for production
npm run build

# (GitHub Actions handles deployment automatically)
git add .
git commit -m "Update portfolio"
git push origin main
```

## Key Files Reference

| File | Purpose |
|------|---------|
| `public/data.json` | All portfolio content (UPDATE THIS) |
| `src/App.tsx` | Router and app setup |
| `src/types/index.ts` | TypeScript interfaces |
| `src/context/ThemeContext.tsx` | Dark mode state |
| `src/hooks/usePortfolioData.ts` | Data loading (to be created) |
| `vite.config.ts` | Build configuration |
| `tailwind.config.ts` | Design system tokens |

## Common Tasks

### Add New Project

1. Edit `public/data.json`
2. Add to `projects` array:
```json
{
  "id": "unique-id",
  "title": "Project Name",
  "description": "Short description",
  "longDescription": "Full description",
  "technologies": ["React", "TypeScript"],
  "links": { "github": "url", "demo": "url" },
  "featured": false
}
```
3. Commit and push

### Add New Skill

1. Edit `public/data.json`
2. Add to existing category or create new one in `skillCategories`

### Update Personal Info

1. Edit `public/data.json` → `personal` object
2. Update name, title, email, social links

### Change Colors

1. Edit `tailwind.config.ts` → `theme.extend.colors`
2. Update primary color palette
3. Components using `bg-primary-*` classes auto-update

### Add Dark Mode Styling

- Use Tailwind's `dark:` prefix: `<div className="bg-white dark:bg-dark-900">`

## Performance Optimization

- **Bundle Size**: ~50-70KB (gzipped) including React
- **Lazy Loading**: Detail pages loaded on-demand
- **Code Splitting**: Automatic via Vite
- **Image Optimization**: Use responsive images in future
- **Tree Shaking**: Unused code automatically removed in build

## Testing Checklist

Before deployment:
- [ ] TypeScript compiles without errors
- [ ] All sections render correctly
- [ ] Dark mode toggle works and persists
- [ ] Responsive on mobile/tablet/desktop
- [ ] All links in data.json are valid
- [ ] No console errors
- [ ] Lighthouse score 90+
- [ ] Links work correctly

## Troubleshooting

### Build Fails
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

### Dark Mode Not Working
- Ensure `ThemeProvider` wraps app in `App.tsx`
- Check localStorage key: should be `theme`

### Data Not Loading
- Verify `public/data.json` exists
- Check browser console for fetch errors
- Ensure JSON is valid: use jsonlint.com

### Deploy Issues
- Check GitHub Actions tab for workflow status
- Verify `vite.config.ts` has `base: './'`
- Ensure main branch is default

## Future Enhancements

- Add blog section with markdown
- Implement contact form
- Add testimonials section
- Create interactive skill visualization
- Add search functionality
- Implement analytics tracking
- Add PWA support

## Resources

- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Quick Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Check TypeScript errors
npm run lint         # Run ESLint
```

---

**Last Updated**: May 1, 2026  
**Maintained by**: Kashyap Ashara
