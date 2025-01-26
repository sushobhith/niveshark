# Development Guidelines

## Getting Started

### Prerequisites
1. Node.js (v18 or higher)
2. npm (comes with Node.js)
3. PostgreSQL database
4. Basic understanding of:
   - React
   - TypeScript
   - Tailwind CSS
   - Express.js

### Development Workflow

1. **Setting Up Your Environment**
   ```bash
   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

2. **Code Organization**
   - Follow the established project structure
   - Keep components small and focused
   - Use TypeScript types for better code quality

### Adding New Features

#### 1. Frontend Development

##### Components
- Place reusable components in `client/src/components/`
- Use meaningful names that describe the component's purpose
- Follow this template:
```tsx
// client/src/components/example/my-component.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  // State management
  const [isActive, setIsActive] = useState(false);

  // Event handlers
  const handleClick = () => {
    setIsActive(!isActive);
    onAction();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <Button onClick={handleClick}>
        {isActive ? 'Active' : 'Inactive'}
      </Button>
    </div>
  );
}
```

##### Pages
- Place page components in `client/src/pages/`
- Include proper routing in `App.tsx`
- Handle authentication if needed

##### State Management
- Use React Context for global state
- Use React Query for API data
- Keep component state local when possible

#### 2. Backend Development

##### API Routes
- Add routes in `server/routes.ts`
- Follow RESTful conventions
- Include proper error handling
- Example:
```typescript
app.get('/api/resource', async (req, res) => {
  try {
    // Your logic here
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ 
      error: 'Something went wrong',
      details: error.message 
    });
  }
});
```

##### Database
- Define schemas in `db/schema.ts`
- Use Drizzle ORM for database operations
- Include proper validation

### Best Practices

1. **Code Style**
   - Use meaningful variable names
   - Write small, focused functions
   - Comment complex logic
   - Use TypeScript types

2. **Performance**
   - Minimize unnecessary rerenders
   - Use React.memo for expensive components
   - Implement proper loading states
   - Handle errors gracefully

3. **Security**
   - Validate all user input
   - Use proper authentication
   - Sanitize data before storing
   - Handle sensitive data carefully

4. **Testing**
   - Test component rendering
   - Test user interactions
   - Test API endpoints
   - Test error cases

### Common Tasks

1. **Adding a New Page**
```typescript
// 1. Create page component
// client/src/pages/new-page.tsx
export default function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  );
}

// 2. Add route
// client/src/App.tsx
<Route path="/new-page">
  <ProtectedRoute component={NewPage} />
</Route>
```

2. **Adding an API Endpoint**
```typescript
// server/routes.ts
app.post('/api/resource', async (req, res) => {
  try {
    const data = req.body;
    // Process data
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

3. **Creating a New Component**
```typescript
// client/src/components/ui/my-component.tsx
interface Props {
  title: string;
}

export function MyComponent({ title }: Props) {
  return (
    <div className="p-4 bg-background">
      <h2>{title}</h2>
    </div>
  );
}
```

### Troubleshooting

1. **Common Issues**
   - Check console for errors
   - Verify API endpoints
   - Check authentication state
   - Verify database connection

2. **Development Tools**
   - Use React DevTools
   - Use Network tab for API issues
   - Use console.log for debugging
   - Check application state
