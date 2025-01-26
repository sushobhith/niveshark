# Project Overview

## Purpose
This application helps users manage their investments by providing AI-driven recommendations based on their risk profile and financial goals. It guides users through a questionnaire to understand their financial situation and investment preferences, then provides personalized investment advice.

## Core Features

### 1. User Authentication
- Sign up and sign in functionality
- Protected routes for authenticated users
- Session management
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

### 2. New API Endpoints
To add new API endpoints:
1. Add routes in `server/routes.ts`
2. Create corresponding frontend API calls
3. Use React Query for data fetching

Example:
```typescript
// server/routes.ts
app.get('/api/reports', (req, res) => {
  // Add your API logic
});

// client/src/hooks/use-reports.ts
export function useReports() {
  return useQuery(['reports'], async () => {
    const response = await fetch('/api/reports');
    return response.json();
  });
}
```

### 3. UI Components
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
1. Implement real API integration
2. Add more sophisticated investment analysis
3. Enhance user experience with animations
4. Add notification system
5. Implement real-time updates
