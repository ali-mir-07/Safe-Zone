# 🛡️ SafeZone

**Your Safe Space for Mental Peace**

SafeZone is a comprehensive mental health and wellness platform designed to provide users with a safe, supportive digital space for managing their mental wellbeing. Built with modern web technologies, SafeZone offers tools and resources to help individuals navigate their mental health journey.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://safezone-flax.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-86.3%25-blue)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Database Setup](#-database-setup)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **🔐 Secure Authentication**: User authentication and authorization system
- **📝 Mental Health Journaling**: Track your thoughts, feelings, and experiences
- **📊 Mood Tracking**: Monitor your emotional wellbeing over time
- **💬 Support Resources**: Access to mental health resources and information
- **🎯 Goal Setting**: Set and track personal mental health goals
- **🔔 Reminders**: Get gentle reminders for self-care activities
- **📱 Responsive Design**: Seamless experience across all devices
- **🌙 Dark Mode Support**: Comfortable viewing in any lighting condition

---

## 🛠️ Tech Stack

### Frontend
- **React/Next.js** - Modern React framework for building the UI
- **TypeScript** - Type-safe JavaScript for robust code
- **CSS/Tailwind CSS** - Styling and responsive design
- **Vercel** - Frontend hosting and deployment

### Backend
- **Node.js** - JavaScript runtime
- **Express/API Routes** - RESTful API endpoints
- **TypeScript** - Type-safe backend development

### Database
- **Supabase** - PostgreSQL database with real-time capabilities
- **PLpgSQL** - Stored procedures and database functions

### DevOps & Tools
- **Git** - Version control
- **npm** - Package management
- **Vercel** - Continuous deployment
- **ESLint** - Code quality and consistency

---

## 📁 Project Structure

```
Safe-Zone/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages/routes
│   │   ├── hooks/       # Custom React hooks
│   │   ├── utils/       # Utility functions
│   │   ├── styles/      # CSS/styling files
│   │   └── types/       # TypeScript type definitions
│   └── public/          # Static assets
│
├── server/              # Backend API server
│   ├── src/
│   │   ├── routes/      # API route handlers
│   │   ├── controllers/ # Business logic
│   │   ├── middleware/  # Express middleware
│   │   ├── services/    # Service layer
│   │   └── types/       # TypeScript type definitions
│   └── config/          # Server configuration
│
├── shared/              # Shared code between client and server
│   ├── types/           # Shared TypeScript types
│   ├── utils/           # Shared utility functions
│   └── constants/       # Shared constants
│
├── supabase/
│   └── migrations/      # Database migration files
│
├── package.json         # Root package configuration
├── vercel.json          # Vercel deployment configuration
└── .gitignore          # Git ignore rules
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**
- **Supabase account** (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ali-mir-07/Safe-Zone.git
   cd Safe-Zone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Install server dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

### Environment Variables

Create `.env` files in the appropriate directories:

#### Client `.env` file (`client/.env`)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### Server `.env` file (`server/.env`)
```env
PORT=3001
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### Running the Application

#### Development Mode

1. **Start the development server**
   ```bash
   npm run dev
   ```

   This will typically start:
   - Client on `http://localhost:3000`
   - Server on `http://localhost:3001`

#### Production Mode

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

---

## 🗄️ Database Setup

SafeZone uses Supabase (PostgreSQL) for data storage.

### Setting Up Supabase

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Run migrations**
   ```bash
   # Using Supabase CLI
   supabase db push
   
   # Or manually run migration files in the Supabase SQL editor
   ```

3. **Database Schema**
   
   The database includes tables for:
   - **users**: User accounts and profiles
   - **journal_entries**: Mental health journal entries
   - **mood_logs**: Daily mood tracking data
   - **goals**: Personal mental health goals
   - **reminders**: Scheduled self-care reminders
   - **resources**: Mental health resources and articles

### Migration Files

Migration files are located in `supabase/migrations/` and include:
- Schema definitions
- Table creation
- Indexes and constraints
- Row-level security policies
- Database functions and triggers

---

## 🌐 Deployment

SafeZone is deployed on Vercel for both frontend and serverless API routes.

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure Environment Variables**
   
   Add all required environment variables in the Vercel dashboard under:
   `Settings → Environment Variables`

### Automatic Deployments

- **Production**: Automatically deploys from the `master` branch
- **Preview**: Automatically creates preview deployments for pull requests

---

## 📚 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register      # Register new user
POST   /api/auth/login         # User login
POST   /api/auth/logout        # User logout
GET    /api/auth/profile       # Get user profile
PUT    /api/auth/profile       # Update user profile
```

### Journal Endpoints

```
GET    /api/journal            # Get all journal entries
POST   /api/journal            # Create new journal entry
GET    /api/journal/:id        # Get specific journal entry
PUT    /api/journal/:id        # Update journal entry
DELETE /api/journal/:id        # Delete journal entry
```

### Mood Tracking Endpoints

```
GET    /api/mood               # Get mood logs
POST   /api/mood               # Log mood entry
GET    /api/mood/analytics     # Get mood analytics
```

### Goals Endpoints

```
GET    /api/goals              # Get all goals
POST   /api/goals              # Create new goal
PUT    /api/goals/:id          # Update goal
DELETE /api/goals/:id          # Delete goal
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style

- Follow TypeScript best practices
- Use ESLint for code linting
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

---

## 🔒 Security & Privacy

SafeZone takes user privacy and security seriously:

- All data is encrypted in transit and at rest
- User authentication with secure JWT tokens
- Row-level security policies in the database
- HIPAA-compliant data handling practices
- No third-party data sharing without consent

**Note**: SafeZone is not a substitute for professional mental health care. If you're experiencing a mental health crisis, please contact a mental health professional or emergency services immediately.

### Crisis Resources

- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **International Association for Suicide Prevention**: [iasp.info](https://www.iasp.info/resources/Crisis_Centres/)

---

## 📞 Support

If you encounter any issues or have questions:

- **Issues**: [GitHub Issues](https://github.com/ali-mir-07/Safe-Zone/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ali-mir-07/Safe-Zone/discussions)
- **Email**: [Create an email link or remove this section]

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👏 Acknowledgments

- Mental health professionals who provided guidance on best practices
- Open-source community for amazing tools and libraries
- All contributors who help make SafeZone better

---

## 🎯 Roadmap

### Current Version (v1.0)
- ✅ User authentication and profiles
- ✅ Journal entries
- ✅ Mood tracking
- ✅ Basic analytics

### Upcoming Features
- 🔄 AI-powered mood insights
- 🔄 Community support forums
- 🔄 Meditation and breathing exercises
- 🔄 Integration with wearable devices
- 🔄 Therapist matching service
- 🔄 Offline mode support
- 🔄 Multi-language support

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/ali-mir-07/Safe-Zone?style=social)
![GitHub forks](https://img.shields.io/github/forks/ali-mir-07/Safe-Zone?style=social)
![GitHub issues](https://img.shields.io/github/issues/ali-mir-07/Safe-Zone)
![GitHub pull requests](https://img.shields.io/github/issues-pr/ali-mir-07/Safe-Zone)

---

<div align="center">

**Made with ❤️ for mental health awareness**

[Website](https://safezone-flax.vercel.app) • [Report Bug](https://github.com/ali-mir-07/Safe-Zone/issues) • [Request Feature](https://github.com/ali-mir-07/Safe-Zone/issues)

</div>
