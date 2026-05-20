# Practical 4: Connecting TikTok Frontend to Backend

## 📋 Overview

This project connects a **Next.js frontend** to an **Express.js backend** to create a fully functional TikTok-like social media application. The implementation includes user authentication, video streaming, social interactions (likes, comments, following), and personalized feeds.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js (React)
- **HTTP Client**: Axios
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context API
- **UI Components**: Modal, Forms, Video Player
- **Notifications**: React Hot Toast
- **Storage**: Supabase (for video/thumbnail uploads)

### Backend
- **Framework**: Express.js (Node.js)
- **Database**: PostgreSQL with Prisma ORM
- **File Storage**: Supabase
- **Authentication**: JWT with bcrypt password hashing
- **File Upload**: Multer middleware
- **CORS**: Enabled for frontend communication

### Database
- **ORM**: Prisma
- **Models**: User, Video, Like, Comment, Follow

---

## 📦 Prerequisites

- **Node.js** v18+ installed
- **npm** or **yarn** package manager
- **PostgreSQL** database
- **Supabase** account (for file storage)

---

## ⚙️ Installation

### 1. Clone the Repository
```bash
cd c:\Users\kuenz\Desktop\WEB101\Practical4
```

### 2. Backend Setup

```bash
cd TikTok_Server-main

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Set up environment variables
# Create a .env file with:
# DATABASE_URL=your_postgresql_url
# JWT_SECRET=your_secret_key
# SUPABASE_URL=your_supabase_url
# SUPABASE_KEY=your_supabase_key
```

### 3. Frontend Setup

```bash
cd ../TikTok_Frontend-main

# Install dependencies
npm install

# Create .env.local with:
# NEXT_PUBLIC_API_URL=http://localhost:8000/api
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_PUBLIC_KEY=your_supabase_public_key
```

---

## 🚀 Running the Project

### Start Backend Server
```bash
cd TikTok_Server-main
npm run dev
# Server runs on http://localhost:8000
```

### Start Frontend Development Server
```bash
cd TikTok_Frontend-main
npm run dev
# Frontend runs on http://localhost:3000
```

---

## ✅ Implementation Summary

All **12 steps** from the practical guidelines have been successfully implemented:

### **Part 1: API Configuration & Authentication**

#### ✅ Step 1: API Client Configuration
- Created `src/lib/axios.js` with centralized API client
- Configured Axios with base URL from environment variables
- Implemented request interceptors to attach JWT Bearer tokens
- Implemented response interceptors to handle 401 errors
- **File**: [src/lib/axios.js](src/lib/axios.js)

#### ✅ Step 2: Authentication Context
- Created `src/contexts/authContext.js` using React Context API
- Implemented `login()`, `logout()`, `register()`, and `fetchUserDetails()` functions
- JWT token validation on app mount
- Tokens stored securely in localStorage
- **File**: [src/contexts/authContext.js](src/contexts/authContext.js)

#### ✅ Step 3: Authentication UI Components
- Created `src/components/ui/Modal.jsx` - Reusable modal component
- Created `src/components/auth/AuthForms.jsx` - Login and Signup forms with validation
  - Email validation
  - Password strength requirements (min 6 characters)
  - Password confirmation matching
- Created `src/components/auth/AuthModal.jsx` - Combined modal + forms
- Integrated React Hot Toast for notifications
- **Files**: [src/components/ui/Modal.jsx](src/components/ui/Modal.jsx), [src/components/auth/AuthForms.jsx](src/components/auth/AuthForms.jsx), [src/components/auth/AuthModal.jsx](src/components/auth/AuthModal.jsx)

#### ✅ Step 4: Main Layout with Authentication
- Updated `src/components/layout/MainLayout.jsx`
- Added conditional login/logout buttons based on auth status
- Protected navigation items for authenticated users
- User profile dropdown menu
- **File**: [src/components/layout/MainLayout.jsx](src/components/layout/MainLayout.jsx)

---

### **Part 2: Video Feed Integration**

#### ✅ Step 5: Video Service
- Created `src/services/videoService.js` with API functions:
  - `getVideos()` - Fetch all videos
  - `getFollowingVideos()` - Fetch videos from followed users
  - `likeVideo(videoId)` - Like a video
  - `unlikeVideo(videoId)` - Unlike a video
  - `addComment(videoId, text)` - Add comment to video
- **File**: [src/services/videoService.js](src/services/videoService.js)

#### ✅ Step 6: User Service
- Created `src/services/userService.js` with API functions:
  - `getUserProfile(userId)` - Get user details
  - `followUser(userId)` - Follow a user
  - `unfollowUser(userId)` - Unfollow a user
  - `getExploreUsers()` - Get list of users to discover
  - `getUserVideos(userId)` - Get user's uploaded videos
- **File**: [src/services/userService.js](src/services/userService.js)

#### ✅ Step 7: VideoCard Component
- Updated `src/components/ui/VideoCard.jsx`
- Displays video with user info (avatar, username)
- Like/Unlike button with count
- Comment section with reply interface
- Video metadata (caption, timestamp)
- User profile link
- **File**: [src/components/ui/VideoCard.jsx](src/components/ui/VideoCard.jsx)

#### ✅ Step 8: VideoFeed Component
- Updated `src/components/ui/VideoFeed.jsx`
- Fetches real data from backend API
- Handles loading states with skeleton loaders
- Error handling with retry functionality
- Infinite scroll pagination
- Supports both "For You" and "Following" feeds
- **File**: [src/components/ui/VideoFeed.jsx](src/components/ui/VideoFeed.jsx)

---

### **Part 3: User Discovery & Personalized Feed**

#### ✅ Step 9: Following Page
- Created `src/app/following/page.jsx`
- Personalized feed showing only followed users' videos
- Empty state when user hasn't followed anyone
- Integration with VideoFeed component
- **File**: [src/app/following/page.jsx](src/app/following/page.jsx)

#### ✅ Step 10: Explore Users Page
- Created `src/app/explore-users/page.jsx`
- Displays list of users to discover
- Follow/Unfollow buttons for each user
- User profile information (username, follower count, avatar)
- Real-time follow status updates
- **File**: [src/app/explore-users/page.jsx](src/app/explore-users/page.jsx)

#### ✅ Step 11: Dynamic Profile Page
- Created `src/app/profile/[userId]/page.jsx`
- Displays user profile with avatar, username, bio
- Shows follower/following counts
- Lists all videos uploaded by the user
- Follow/Unfollow button (if not own profile)
- **File**: [src/app/profile/[userId]/page.jsx](src/app/profile/[userId]/page.jsx)

#### ✅ Step 12: Video Upload
- Created `src/app/upload/page.jsx`
- Video file upload with validation
- Thumbnail upload
- Caption/title input
- Upload progress indicator
- Success notification and redirect to feed
- **File**: [src/app/upload/page.jsx](src/app/upload/page.jsx)

---

## 🎯 Features Implemented

### Authentication
- ✅ User Registration with email and password
- ✅ User Login with JWT token generation
- ✅ Automatic token refresh on page reload
- ✅ Logout functionality
- ✅ Protected routes (redirect to login if not authenticated)

### Video Management
- ✅ Fetch and display all videos in feed
- ✅ Video player with play/pause controls
- ✅ Video metadata display (title, description, user info)
- ✅ Timestamp display
- ✅ Like/Unlike functionality
- ✅ Like counter

### Comments
- ✅ View comments on videos
- ✅ Add new comments
- ✅ Display comment author and timestamp

### Social Features
- ✅ Follow/Unfollow users
- ✅ View user profiles
- ✅ See follower/following counts
- ✅ Explore users discovery page
- ✅ Personalized "Following" feed

### Video Upload
- ✅ Upload video files
- ✅ Upload custom thumbnail
- ✅ Add caption/title
- ✅ Upload progress tracking

---

## 📡 API Endpoints

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/auth/register` | POST | User registration | No |
| `/auth/login` | POST | User login | No |
| `/videos` | GET | Get all videos (For You feed) | Yes |
| `/videos/following` | GET | Get videos from followed users | Yes |
| `/videos/:id` | GET | Get single video details | Yes |
| `/videos/:id/like` | POST | Like a video | Yes |
| `/videos/:id/unlike` | DELETE | Unlike a video | Yes |
| `/videos/:id/comments` | GET | Get video comments | Yes |
| `/comments` | POST | Add comment to video | Yes |
| `/users/:id` | GET | Get user profile | Yes |
| `/users/:id/videos` | GET | Get user's videos | Yes |
| `/users/:id/follow` | POST | Follow a user | Yes |
| `/users/:id/unfollow` | DELETE | Unfollow a user | Yes |
| `/users/explore` | GET | Get users to explore | Yes |
| `/videos/upload` | POST | Upload new video | Yes |

---

## 📁 Project Structure

```
TikTok_Frontend-main/
├── src/
│   ├── app/
│   │   ├── page.jsx (Home - For You Feed)
│   │   ├── layout.js (Root layout with AuthProvider)
│   │   ├── explore-users/page.jsx (User discovery)
│   │   ├── following/page.jsx (Following feed)
│   │   ├── login/page.jsx (Login page)
│   │   ├── profile/[userId]/page.jsx (User profile)
│   │   ├── signup/page.jsx (Signup page)
│   │   └── upload/page.jsx (Video upload)
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthForms.jsx
│   │   │   └── AuthModal.jsx
│   │   ├── layout/
│   │   │   └── MainLayout.jsx
│   │   └── ui/
│   │       ├── Modal.jsx
│   │       ├── VideoCard.jsx
│   │       ├── VideoFeed.jsx
│   │       ├── comments.jsx
│   │       └── Loading.jsx
│   ├── contexts/
│   │   └── authContext.js (Authentication context)
│   ├── hooks/
│   │   └── useIntersectionObserver.js
│   ├── lib/
│   │   ├── axios.js (API client)
│   │   └── supabase.js (Supabase client)
│   └── services/
│       ├── videoService.js (Video API calls)
│       └── userService.js (User API calls)
├── .env.local (Environment variables)
├── package.json
└── next.config.mjs

TikTok_Server-main/
├── src/
│   ├── app.js (Express app setup)
│   ├── index.js (Server entry point)
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── videoController.js
│   │   └── commentController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── videos.js
│   │   └── comments.js
│   ├── middleware/
│   │   ├── auth.js (JWT authentication)
│   │   └── upload.js (File upload handling)
│   ├── services/
│   │   └── storageService.js (Supabase file handling)
│   └── lib/
│       ├── prisma.js (Prisma client)
│       └── supabase.js (Supabase client)
├── prisma/
│   ├── schema.prisma (Database schema)
│   └── migrations/
├── .env (Environment variables)
├── package.json
└── README.md
```

---

## 🧪 Testing the Application

### 1. Register Multiple Users
- Navigate to `http://localhost:3000/signup`
- Create 2-3 different accounts with unique emails
- Verify registration success and redirect to home page

### 2. Upload Videos
- Login with different accounts
- Go to `/upload` page
- Upload videos with captions and thumbnails
- Verify videos appear in feed

### 3. Test Social Features
- Use one account to visit another user's profile
- Click "Follow" button
- Switch to following feed (`/following`)
- Verify only followed users' videos appear

### 4. Test Video Interactions
- Like/Unlike videos in feed
- Watch like count update in real-time
- Add comments to videos
- View comments from other users

### 5. Test Navigation
- Navigate between "For You" and "Following" tabs
- Click on user profiles from videos
- Test explore users page
- Verify follow/unfollow buttons update correctly

### 6. Test Authentication
- Logout from current account
- Login with different account
- Verify personalized feed is different
- Test protected routes (redirect to login)

---

## 🎬 Screenshots

Screenshots demonstrating all features are available in the project documentation.

### Key Screenshots Include:
- Authentication flow (login, signup, logout)
- Home feed with multiple videos
- Video interaction (likes, comments)
- Explore users page
- User profile page
- Following personalized feed
- Video upload interface

---

## 🔐 Security Implementation

- ✅ JWT tokens for authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes with middleware
- ✅ Secure token storage in localStorage
- ✅ CORS configured for frontend origin
- ✅ Request/response interceptors for token handling

---

## 📝 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLIC_KEY=your_supabase_public_key
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/tiktok_db
JWT_SECRET=your_jwt_secret_key
PORT=8000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
```

---

## 🚨 Troubleshooting

### Issue: "supabaseUrl is required"
**Solution**: The app uses placeholder Supabase values for development. Full file upload features require real Supabase credentials.

### Issue: Database connection error
**Solution**: Ensure PostgreSQL is running and DATABASE_URL in .env is correct.

### Issue: CORS errors
**Solution**: Verify NEXT_PUBLIC_API_URL matches the backend server address.

### Issue: Port 8000 already in use
**Solution**: 
```powershell
Get-Process | Where-Object {$_.Name -like "*node*"} | Stop-Process -Force
```

### Issue: Prisma client not initialized
**Solution**:
```bash
npx prisma generate
```

---

## 🎓 Learning Outcomes

By completing this practical, you've learned:
- ✅ Frontend-backend communication with Axios
- ✅ JWT-based authentication flow
- ✅ React Context for state management
- ✅ Building reusable UI components
- ✅ API service layer architecture
- ✅ File upload handling
- ✅ Prisma ORM for database operations
- ✅ Express.js middleware and routing
- ✅ Social feature implementation (follow, like, comment)
- ✅ Building responsive social media applications

---

## 📚 References

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Axios Documentation](https://axios-http.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [React Context API](https://react.dev/reference/react/useContext)
- [Supabase Documentation](https://supabase.com/docs)

---

## 👨‍💻 Author & Date

**Completed**: May 20, 2026

---

## 📄 License

This project is part of the WEB101 Practical series.

