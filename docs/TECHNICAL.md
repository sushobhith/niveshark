# Technical Documentation

## Architecture Overview

### Frontend Architecture

#### 1. Component Structure
```
client/src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard-specific components
│   ├── layout/         # Layout components (navbar, etc.)
│   └── ui/             # Base UI components (from shadcn)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── App.tsx            # Main application component
```

#### 2. State Management
- **Authentication State**: Managed by `AuthContext` in `hooks/use-auth.tsx`
- **API Data**: Managed by React Query
- **UI State**: Local component state using useState/useReducer

#### 3. Routing
- Uses `wouter` for lightweight routing
- Protected routes using `ProtectedRoute` component
- Route definitions in `App.tsx`

### Backend Architecture

#### 1. Server Structure
```
server/
├── routes.ts           # API route definitions
├── auth.ts            # Authentication logic
└── index.ts           # Server entry point
```

#### 2. Database Schema
```
db/
├── schema.ts          # Database schema definitions
└── index.ts          # Database connection setup
```

## Key Technologies

### 1. Frontend
- **React**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components
- **React Query**: API data management
- **Wouter**: Routing

### 2. Backend
- **Express.js**: Web server
- **Passport.js**: Authentication
- **PostgreSQL**: Database
- **Drizzle ORM**: Database ORM

## Authentication Flow

1. **User Registration**
   ```typescript
   // hooks/use-auth.tsx
   const signUp = async (username: string, password: string) => {
     // Register user
     setUser({ id: '1', username, isNewUser: true });
     setFinancialDetails(null);
     setLocation('/dashboard');
   };
   ```

2. **User Login**
   ```typescript
   // hooks/use-auth.tsx
   const signIn = async (username: string, password: string) => {
     // Authenticate user
     setUser({ id: '1', username, isNewUser: false });
     setFinancialDetails({
       riskTolerance: "Moderate",
       investmentGoals: ["Retirement"],
       monthlyInvestment: 1000,
       investmentHorizon: "5-10 years"
     });
     setLocation('/dashboard');
   };
   ```

## Data Flow

### 1. API Data Flow
```typescript
// Example API call using React Query
const { data, isLoading } = useQuery(['userData'], 
  async () => {
    const response = await fetch('/api/user-data');
    return response.json();
  }
);
```

### 2. State Updates
```typescript
// Example state update in AuthContext
const setFinancialDetails = (details: FinancialDetails) => {
  setState(prev => ({
    ...prev,
    financialDetails: details
  }));
};
```

## UI Components

### 1. Base Components
All base UI components are from shadcn/ui, located in `components/ui/`

### 2. Custom Components
Example of a custom component structure:
```typescript
// components/dashboard/portfolio-summary.tsx
interface PortfolioData {
  total: number;
  allocation: {
    name: string;
    percentage: number;
    color: string;
  }[];
}

export default function PortfolioSummary() {
  // Component implementation
}
```

## Database Schema

```typescript
// db/schema.ts
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});

// Add more tables as needed
```

## API Endpoints

### Current Endpoints
```typescript
// Authentication
POST /api/register     // User registration
POST /api/login       // User login
POST /api/logout      // User logout
GET  /api/user        // Get current user

// (Add more endpoints as implemented)
```

## Security Considerations

1. **Authentication**
   - Session-based authentication
   - Protected routes
   - Password hashing

2. **Data Safety**
   - Input validation
   - SQL injection prevention via ORM
   - XSS protection

## Performance Optimization

1. **Frontend**
   - Code splitting
   - Lazy loading
   - Memoization

2. **Backend**
   - Query optimization
   - Caching
   - Rate limiting

## Error Handling

1. **Frontend Errors**
```typescript
try {
  // Operation
} catch (error) {
  console.error('Operation failed:', error);
  // Show user-friendly error message
}
```

2. **Backend Errors**
```typescript
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

## Future Improvements

1. **Technical Debt**
   - Implement proper API error handling
   - Add comprehensive testing
   - Set up CI/CD pipeline

2. **Features**
   - Real-time updates
   - Advanced analytics
   - Mobile responsiveness
   - PDF report generation
