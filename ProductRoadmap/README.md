# AdEasy - Self-Serve Campaign Creation Tool

A React + TypeScript web application that simplifies ad campaign creation for SMB advertisers. Built as a Product Management case study prototype.

## 🚀 Features

- **5-Step Campaign Wizard**: Guided campaign creation in under 5 minutes
- **AI-Powered Ad Copy**: Generate compelling ad copy using Google Gemini AI
- **Budget Planning**: Visual budget slider with reach estimation
- **Audience Targeting**: Location, age, and gender targeting
- **Campaign Dashboard**: Manage and monitor all campaigns
- **Mobile-Friendly**: Responsive design for all devices

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite for fast development
- Tailwind CSS + Shadcn/ui components
- Wouter for routing
- TanStack React Query for state management

**Backend:**
- Express.js + TypeScript
- In-memory storage for demo
- Google Gemini AI integration
- RESTful API design

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd adeasy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🔑 Getting API Keys

**Gemini API Key (Free):**
1. Visit https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API key"
4. Copy the generated key

## 📱 Usage

1. **Welcome Screen**: Click "Get Started" to begin campaign creation
2. **Objective**: Choose between Brand Awareness, Website Traffic, or Sales & Conversions
3. **Budget**: Set your budget (₹500 - ₹50,000) with real-time reach estimation
4. **Creative**: Describe your product and generate AI-powered ad copy
5. **Audience**: Target by location, age, and gender
6. **Preview & Launch**: Review and launch your campaign
7. **Dashboard**: Monitor all your campaigns

## 🎯 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions
│   │   └── hooks/          # Custom React hooks
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # In-memory storage
│   └── gemini.ts          # Gemini AI integration
└── shared/                # Shared types and schemas
    └── schema.ts          # Database schemas
```

## 🚀 Deployment

This project is designed to run on Replit. For other platforms:

1. Build the project:
```bash
npm run build
```

2. Set environment variables on your hosting platform
3. Deploy the built files

## 📊 Campaign Creation Flow

The application implements a multi-step wizard:
1. Welcome → Objective → Budget → Creative → Audience → Preview → Success
2. Progress tracking with visual indicators
3. Form validation at each step
4. AI-powered content generation
5. Real-time budget and reach calculations

## 🤖 AI Integration

- Uses Google Gemini AI for ad copy generation
- Fallback templates when AI is unavailable
- Customized prompts based on campaign objectives
- Multiple copy variations for user selection

## 💾 Data Storage

- In-memory storage for demonstration
- Easily extensible to PostgreSQL with Drizzle ORM
- Sample campaign data included
- Full CRUD operations supported

## 🎨 Design System

- Clean, card-based UI design
- Soft shadows and rounded corners
- Mobile-first responsive design
- Consistent color scheme and typography
- Intuitive navigation and progress indicators

---

Built with ❤️ for SMB advertisers who need simple, effective campaign creation tools.