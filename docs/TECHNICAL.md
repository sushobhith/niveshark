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

## Key Technologies

### 1. Frontend Tools
- **React**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components
- **React Query**: API data management
- **Wouter**: Routing


## Authentication Flow

```typescript
// hooks/use-auth.tsx
const signUp = async (username: string, password: string) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    setUser(data.user);
    setLocation('/dashboard');
  } catch (error) {
    console.error('Sign up failed:', error);
    throw error;
  }
};
```

## Data Flow

### 1. API Data Flow
```typescript
// Example API call using React Query
const { data, isLoading } = useQuery(['userData'], 
  async () => {
    const response = await fetch('/api/user-data');
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  }
);

// Example mutation
const mutation = useMutation(
  async (newData) => {
    const response = await fetch('/api/user-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    });
    return response.json();
  },
  {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['userData']);
    }
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
  const { data, isLoading } = useQuery(['portfolio'], fetchPortfolioData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Render portfolio data */}
      </CardContent>
    </Card>
  );
}
```

## Performance Optimization

1. **Frontend**
   ```typescript
   // Memoize expensive components
   const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
     // Component logic
   });

   // Use callback for event handlers
   const handleClick = useCallback(() => {
     // Handle click
   }, [/* dependencies */]);

   // Memoize computed values
   const computedValue = useMemo(() => {
     // Expensive computation
   }, [/* dependencies */]);
   ```

## Error Handling

1. **API Error Handling**
```typescript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    // Show error message to user
    toast({
      title: 'Error',
      description: 'Failed to fetch data. Please try again.',
      variant: 'destructive'
    });
  }
}
```

2. **Form Validation**
```typescript
const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </Form>
  );
}
```

## Future Improvements

1. **Features**
   - Add real-time updates using WebSocket
   - Implement infinite scrolling for large data sets
   - Add client-side caching
   - Implement better error boundaries
   - Add accessibility improvements

2. **Performance**
   - Implement code splitting
   - Add service worker for offline support
   - Optimize bundle size
   - Add performance monitoring