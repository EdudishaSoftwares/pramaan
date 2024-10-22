# Backend Service Structure and Conventions Guide

## Table of Contents
1. Introduction and Welcome
2. Project Architecture Overview
3. Folder Structure Convention
4. Template Repository
5. Detailed Component Description

## 1. Introduction and Welcome

Dear Team,

Welcome to our backend development documentation. This guide outlines our project structure and conventions to ensure consistency across all microservices.

## 2. Project Architecture Overview

We have adopted a microservices architecture using micro repositories. This approach offers several key advantages:

- **Isolated Development**: Teams can work independently on different services
- **Easier Maintenance**: Smaller, focused codebases are easier to maintain and debug
- **Independent Scaling**: Services can be scaled individually based on demand
- **Technology Flexibility**: Each service can potentially use different technologies if needed
- **Faster Deployment**: Smaller codebases lead to quicker builds and deployments
- **Better Fault Isolation**: Issues in one service don't directly affect others

## 3. Folder Structure Convention

All backend services must follow this standardized folder structure. Everything must be contained within the `src` folder:

```
src/
├── config/         # Configuration files and environment variables
├── constants/      # Application-wide constants and enums
├── controllers/    # Request handlers and business logic controllers
├── dao/           # Data Access Objects for database operations
├── databases/     # Database connections and configurations
├── exceptions/    # Custom exception classes and error handlers
├── helpers/       # Utility functions specific to business logic
├── http/          # HTTP-related utilities and classes
├── interfaces/    # TypeScript interfaces and type definitions
├── middlewares/   # Express middlewares
├── models/        # Data models and schemas
├── routes/        # API route definitions
├── services/      # Business logic services
├── typings/       # Additional TypeScript type definitions
├── utils/         # General utility functions
├── app.ts         # Express application setup
└── server.ts      # Server initialization and configuration
```

## 4. Template Repository

To help you get started quickly, we maintain a template repository that follows all these conventions. You can find it here:
[[Template Repository Link](https://github.com/EdudishaSoftwares/edu-pramaan)]

## 5. Detailed Component Description

### config/
- Environment configurations
- Third-party service configurations
- Application settings

### constants/
- Shared constants
- Enum definitions
- Static configurations

### controllers/
- Request handling logic
- Route-specific business logic
- Request validation

### dao/
- Database queries
- Data access methods
- Repository pattern implementations

### databases/
- Database connection setup
- Migration scripts
- Database utilities

### exceptions/
- Custom error classes
- Error handling utilities
- Exception filters

### helpers/
- Business logic helpers
- Domain-specific utilities

### http/
- HTTP clients
- Request/Response utilities
- API integrations

### interfaces/
- TypeScript interfaces
- Type definitions
- Contracts

### middlewares/
- Authentication middleware
- Logging middleware
- Request preprocessing

### models/
- Data models
- Schema definitions
- Entity classes

### routes/
- API route definitions
- Route grouping
- Endpoint documentation

### services/
- Core business logic
- External service integrations
- Complex operations

### typings/
- Additional type definitions
- Module declarations
- Type augmentations

### utils/
- Generic utility functions
- Helper methods
- Shared tools

### app.ts
- Express app configuration
- Middleware setup
- Route registration

### server.ts
- Server initialization
- Port configuration
- Process management
