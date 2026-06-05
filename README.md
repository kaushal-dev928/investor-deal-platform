Investor Deal Platform
Overview
Investor Deal Platform is a backend application developed using Node.js, Express.js, and MongoDB. The platform allows corporates to create investment deals and investors to discover, evaluate, and invest in suitable opportunities.

The system includes authentication, role-based access control, investment tracking, recommendation engine, analytics, pagination, and security features.

Features
Authentication & Authorization
JWT Authentication
Secure Login and Registration
Role-Based Access Control (Investor, Corporate)
Deal Management
Create Deal
Update Deal
Soft Delete Deal
View All Deals
View Deal by ID
Investor Preferences
Risk Appetite
Preferred Industries
Budget Range
Recommendation Engine
Deals are recommended based on:

Risk Match (30%)
Industry Match (25%)
Budget Compatibility (20%)
ROI Attractiveness (15%)
Popularity (10%)
Investment Engine
Investors can invest in deals
Investment amount validation
Over-investment prevention
Automatic deal status updates
Analytics
Total Deals
Total Investments
Total Amount Raised
Performance Optimization
Pagination
MongoDB Indexes
Optimized Queries
Security
JWT Authentication
Input Validation
Rate Limiting
Password Hashing using bcrypt
Technology Stack
Node.js
Express.js
MongoDB
Mongoose
JWT
bcryptjs
express-validator
express-rate-limit
API Endpoints
Authentication
POST /api/auth/register

POST /api/auth/login

Deals
POST /api/deals

GET /api/deals

GET /api/deals/:id

PUT /api/deals/:id

DELETE /api/deals/:id

GET /api/deals/recommended

Preferences
POST /api/preferences

Investments
POST /api/investments

Analytics
GET /api/analytics/summary

Installation
Clone the repository:

git clone

Install dependencies:

npm install

Create .env file:

PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/investor-platform

JWT_SECRET=mysecretkey

Run the project:

npm run dev

Server URL:

http://localhost:5000

Database Collections
users
deals
investments
investorpreferences
interests
Future Improvements
Redis Caching
Refresh Tokens
MongoDB Transactions
Advanced Analytics
Search and Filtering
Author
Kaushal Ghongade
