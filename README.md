# 🍲 Recipe Sharing API

A comprehensive, production-ready REST API for sharing and discovering recipes, built with modern backend technologies and best practices.

## Features

### 🔐 Authentication & Security

- **JWT-based authentication** with secure token management
- **Password hashing** using bcrypt for enhanced security
- **Input validation** and sanitization using express-validator
- **CORS configuration** for cross-origin requests

### 📊 Database & ORM

- **PostgreSQL** database with complex relational design
- **Sequelize ORM** with advanced relationship modeling
- **Database migrations** for version-controlled schema management
- **Data seeding** with comprehensive test data
- **Many-to-many relationships** between recipes, ingredients, tags, and categories

### 🍽️ Recipe Management

- **CRUD operations** for recipes with photo uploads
- **Advanced search** across titles, instructions, ingredients, and tags
- **File upload** to Google Cloud Storage
- **Recipe categorization** by cuisine type, meal type, and dietary restrictions

### 👥 Social Features

- **User following system** with follower/following relationships
- **Recipe rating system** (1-5 stars) with update capabilities
- **Comment system** for recipe feedback and discussions
- **Favorite recipes** for personalized collections
- **Automated notifications** for user interactions

### 📚 API Documentation

- **Swagger/OpenAPI** documentation with interactive testing
- **Comprehensive endpoint documentation** with examples
- **Request/response schemas** for all API endpoints

### 🔧 Development & Monitoring

- **Request logging** using Morgan for HTTP request tracking
- **Centralized error handling** with custom error middleware
- **Environment-based configuration** for different deployment stages
- **Modular architecture** following MVC pattern

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5.1.0
- **Database:** PostgreSQL
- **ORM:** Sequelize 6.37.7
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **File Storage:** Google Cloud Storage
- **Documentation:** Swagger UI Express
- **Validation:** Express Validator
- **Security:** bcrypt for password hashing
- **Logging:** Morgan for HTTP logging

## 📁 Project Structure

```
recipie-sharing/
├── config/                 # Database configuration
├── helper/                 # Utility functions
├── middleware/             # Custom middleware
│   ├── auth.js            # JWT authentication
│   ├── error.js           # Error handling
│   ├── uploadFile.js      # File upload to GCS
│   └── validationError.js # Input validation
├── migrations/             # Database migrations
├── models/                 # Sequelize models and associations
├── modules/                # Feature-based modules
│   ├── user/              # User management
│   ├── recipe/            # Recipe operations
│   ├── ingredient/        # Ingredient management
│   ├── tag/               # Tag system
│   ├── category/          # Category management
│   ├── comment/           # Comment system
│   ├── rating/            # Rating system
│   └── notification/      # Notification system
├── seed-data/             # Test data
├── seeders/               # Data seeding scripts
└── uploads/               # Temporary file storage
```

## 🗄️ Database Schema

The application uses a comprehensive relational database design with **14 entities** and complex relationships:

### Entity Relationship Diagram

![Database Schema ERD](/recipie-sharing/er_diagram.png)

_Comprehensive Entity-Relationship Diagram showing all 14 database tables and their relationships_

### Database Schema Overview

The Recipe Sharing API implements a sophisticated database architecture with the following key components:

#### Core Entities:

- **`user`** - User accounts with authentication (username, email, password)
- **`recipe`** - Recipe content with photos and instructions
- **`ingredient`** - Recipe ingredients with unique names
- **`tag`** - Recipe tags for categorization
- **`category`** - Recipe categories (cuisine type, meal type, dietary restrictions)

#### Social Features:

- **`follow`** - User-to-user following relationships
- **`favourite_recipe`** - User's saved recipes
- **`recipe_rating`** - Recipe ratings (1-5 stars)
- **`recipe_comment`** - User comments on recipes
- **`notification`** - User activity notifications

#### Relationship Tables:

- **`recipe_ingredient`** - Many-to-many relationship between recipes and ingredients
- **`recipe_tag`** - Many-to-many relationship between recipes and tags
- **`recipe_category`** - Many-to-many relationship between recipes and categories
- **`recipe_follower`** - Users following specific recipes

### Key Database Features:

- **UUID Primary Keys** for better distributed system support
- **Timestamps** on all entities for audit trails
- **Unique Constraints** on usernames, emails, and tag names
- **Foreign Key Constraints** for data integrity
- **Cascade Deletes** for proper cleanup
- **Complex Many-to-Many Relationships** with junction tables

### Database Design Highlights:

- **Normalized Design** with proper separation of concerns
- **Scalable Architecture** supporting thousands of users and recipes
- **Data Integrity** through foreign key constraints and validation
- **Performance Optimization** with proper indexing and query optimization
- **Audit Trail** with createdAt and updatedAt timestamps

> 📋 **Detailed Database Documentation:** See [docs/database-schema.md](docs/database-schema.md) for comprehensive schema documentation and relationship details.

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- Google Cloud Storage account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd recipie-sharing
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

4. **Database setup**

   ```bash
   npm run db:create
   npm run db:migrate
   npm run db:seed
   ```

5. **Start the server**
   ```bash
   npm run dev  # Development mode
   npm start    # Production mode
   ```

## 📖 API Documentation

Once the server is running, visit:

- **Swagger UI:** `https://masteringbackend-project.onrender.com/api-docs`
- **Health Check:** `https://masteringbackend-project.onrender.com`

## 🔗 API Endpoints

### Authentication

- `POST /api/users/signup` - User registration
- `POST /api/users/signin` - User login

### Recipes

- `GET /api/recipes` - Get all recipes (with search)
- `POST /api/recipes` - Create new recipe
- `GET /api/recipes/:id` - Get recipe by ID
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

### Social Features

- `POST /api/recipes/:id/add-rating` - Rate a recipe
- `POST /api/recipes/:id/add-comment` - Comment on recipe
- `POST /api/recipes/:id/mark-favourite` - Save recipe to favorites
- `POST /api/users/follow/:id` - Follow a user

### Management

- `GET /api/ingredients` - Get all ingredients
- `GET /api/tags` - Get all tags
- `GET /api/categories` - Get all categories

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Environment-based configuration
- Secure file upload handling

## 📊 Performance Features

- Database query optimization with Sequelize
- Efficient file upload to cloud storage
- Request logging and monitoring
- Modular architecture for scalability
- Comprehensive error handling

## 📚 Documentation

- **[Database Schema Documentation](docs/database-schema.md)** - Comprehensive database design and relationships
- **[Environment Configuration](recipie-sharing/.env.example)** - Complete environment variables setup
- **[API Documentation](https://masteringbackend-project.onrender.com/api-docs)** - Interactive Swagger documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ using modern backend technologies**

## 📚 References

- [Node.js Project Structure Best Practices](https://medium.com/@jayjethava101/node-js-project-structure-best-practices-and-example-for-clean-code-3e1f5530fd3b)
- [JWT Authentication with PostgreSQL](https://www.bezkoder.com/node-js-jwt-authentication-postgresql/)
- [Recipe Sharing API Project](https://projects.masteringbackend.com/projects/build-your-own-recipe-sharing-api)
