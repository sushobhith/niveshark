# Project Overview

## Purpose
This application helps users manage their investments by providing AI-driven recommendations based on their risk profile and financial goals. It guides users through a questionnaire to understand their financial situation and investment preferences, then provides personalized investment advice.

## Core Features

### 1. User Authentication
- Sign up and sign in functionality
- Protected routes for authenticated users
- Global auth state management using React Context
- Location: `client/src/components/auth/auth-dialog.tsx`

### 2. Financial Profiling
- Multi-step questionnaire
- Conditional questions based on user responses
- Risk tolerance assessment
- Location: `client/src/pages/questionnaire.tsx`

### 3. Dashboard
- Portfolio overview
- Investment performance tracking
- Risk analysis
- Location: `client/src/pages/dashboard.tsx`

## Adding New Features

### 1. New Pages
To add a new page:
1. Create a new file in `client/src/pages/`
2. Add the route in `client/src/App.tsx`
3. Update the navigation in `client/src/components/layout/navbar.tsx`

Example:
```tsx
// 1. Create new page (client/src/pages/reports.tsx)
export default function Reports() {
  return (
    <div>
      <h1>Investment Reports</h1>
      // Add your page content
    </div>
  );
}

// 2. Add route (client/src/App.tsx)
<Route path="/reports">
  <ProtectedRoute component={Reports} />
</Route>

// 3. Update navigation (client/src/components/layout/navbar.tsx)
<Link href="/reports">
  <Button variant="ghost">Reports</Button>
</Link>
```

### 2. Making API Calls
Use React Query for data fetching and mutations:

```typescript
// Example of fetching data
function useUserData() {
  return useQuery(['userData'], async () => {
    const response = await fetch('/api/user-data');
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  });
}

// Example of mutation (updating data)
function useUpdateUser() {
  return useMutation(
    async (userData) => {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      return response.json();
    },
    {
      onSuccess: () => {
        // Invalidate and refetch user data
        queryClient.invalidateQueries(['userData']);
      }
    }
  );
}
```

### 3. State Management

#### Local State
Use `useState` for component-level state:
```tsx
function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

#### Global State
Use React Context for app-wide state:
```tsx
// Create context
const AppContext = createContext<AppState | null>(null);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    // Initial state
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
}
```

### 4. UI Components
To add new UI components:
1. Create component in `client/src/components/`
2. Use shadcn/ui components as building blocks
3. Follow Tailwind CSS conventions

Example:
```tsx
// client/src/components/reports/report-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReportCard({ title, data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        // Add your component content
      </CardContent>
    </Card>
  );
}
```

## Next Steps
1. Add more interactive features
2. Enhance data visualization
3. Add user preferences
4. Implement custom themes
5. Add mobile responsiveness