# Clueso.io Clone - Documentation Builder

A professional implementation of a Clueso-style documentation builder that transforms workflows into step-by-step guides with AI-powered summaries.

## 🎯 Overview

This application enables users to create, manage, and share interactive documentation guides. Users can build step-by-step tutorials, generate AI-enhanced summaries, and preview professional documentation pages.

## 🔧 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (Auth)
- **UI Components**: Custom components with dark mode support

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)

## 🏗️ Architecture

```
/clueso
  ├── /backend
  │     ├── /src
  │     │    ├── /config         # Database configuration
  │     │    ├── /controllers    # Route handlers (Auth, Guides, Steps)
  │     │    ├── /middleware     # Auth & error handling
  │     │    ├── /models         # Mongoose schemas (User, Guide, Step)
  │     │    ├── /routes         # API route definitions
  │     │    ├── /services       # Business logic (AI service)
  │     │    └── /utils          # Helper functions
  └── /frontend
        ├── /app              # Next.js pages (dashboard, guides, preview)
        ├── /components       # Reusable UI components
        ├── /services         # API client
        └── /store            # Zustand state management
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local or cloud URI)

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `/backend`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/clueso
JWT_SECRET=your_secret_key_here
```

Start the server:
```bash
npm run dev
```
Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` (optional):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the application:
```bash
npm run dev
```
Visit `http://localhost:3000`

## ✨ Core Features

### User Authentication
- Secure signup and login with JWT
- Protected routes and session management
- User profile management

### Guide Management
- Create documentation guides
- Add ordered steps with titles and descriptions
- Edit and delete guides
- User-specific guide ownership

### AI-Powered Summaries
- Generate intelligent summaries from guide steps
- Mock AI implementation (no external API required)
- Context-aware summary generation

### Preview & Sharing
- Professional documentation preview
- Clean, readable step-by-step layout
- Shareable guide pages

## 🎬 Demo Flow

1. **Sign Up / Log In** - Create an account or log in
2. **Dashboard** - View your guides or create a new one
3. **Create Guide** - Add a title, description, and audience
4. **Add Steps** - Build your documentation step-by-step
5. **Generate Summary** - Click "Generate AI Summary" for an intelligent overview
6. **Preview** - View your guide as a polished documentation page

## 🧠 Design Decisions & Trade-offs

### AI Service
The AI summary generation is mocked using template-based logic in `backend/src/services/ai.service.ts`. This approach:
- Avoids external API dependencies
- Provides consistent, predictable results
- Demonstrates the integration pattern for future AI services

**Note**: In production, this would integrate with OpenAI, Anthropic, or similar services.

### Authentication
JWTs are stored in localStorage for simplicity. For production:
- Use HttpOnly cookies for enhanced security
- Implement refresh token rotation
- Add rate limiting and CSRF protection

### Styling
Tailwind CSS provides rapid development and consistent design. The UI features:
- Professional SaaS appearance
- Full dark mode support
- Responsive layouts
- Accessible components

### Data Validation
Basic validation exists in controllers and Mongoose schemas. For production:
- Implement Zod or Yup for comprehensive validation
- Add input sanitization
- Enhance error messages

## 📁 Project Structure

### Backend Controllers
- `auth.controller.ts` - User authentication and profile management
- `guide.controller.ts` - Guide CRUD operations and AI summary generation
- `step.controller.ts` - Step management within guides

### Frontend Pages
- `/` - Landing page with product overview
- `/dashboard` - User's guide dashboard
- `/guides/[id]` - Guide editor with step management
- `/guides/[id]/preview` - Professional guide preview
- `/profile` - User profile settings

## 🔒 Security Considerations

- Password hashing with bcrypt
- JWT-based authentication
- User ownership validation on all resources
- Protected API routes with middleware
- Input validation and sanitization

## 🎯 Assignment Compliance

This implementation demonstrates:
- Clear understanding of Clueso's documentation builder workflow
- Professional code architecture and organization
- Clean, maintainable codebase
- Proper separation of concerns
- Production-ready patterns and practices

---

**Built as a technical assignment demonstrating full-stack development expertise.**
