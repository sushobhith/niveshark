# Development Guidelines

## Getting Started

### Prerequisites
1. Node.js (v18 or higher)
2. npm (comes with Node.js)
3. Basic understanding of:
   - React
   - TypeScript
   - Tailwind CSS

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

Example of managing form state:
```tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define form schema
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email')
});

function UserForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      // Make API call
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

### Best Practices

1. **Code Style**
   - Use meaningful variable names
   - Write small, focused functions
   - Comment complex logic
   - Use TypeScript types
   - Use async/await for promises

2. **Performance**
   - Minimize unnecessary rerenders
   - Use React.memo for expensive components
   - Implement proper loading states
   - Handle errors gracefully

3. **State Management Patterns**
   ```typescript
   // Bad - Nested state updates
   setState(prev => ({
     ...prev,
     data: {
       ...prev.data,
       nested: newValue
     }
   }));

   // Good - Use reducer for complex state
   type Action = 
     | { type: 'UPDATE_NESTED'; value: string }
     | { type: 'RESET' };

   function reducer(state, action: Action) {
     switch (action.type) {
       case 'UPDATE_NESTED':
         return {
           ...state,
           data: {
             ...state.data,
             nested: action.value
           }
         };
       case 'RESET':
         return initialState;
       default:
         return state;
     }
   }
   ```

### Common Tasks

1. **Adding a New Feature**
   ```typescript
   // 1. Define types
   interface Feature {
     id: string;
     name: string;
     enabled: boolean;
   }

   // 2. Create hook for data fetching
   function useFeature(id: string) {
     return useQuery(['feature', id], async () => {
       const response = await fetch(`/api/features/${id}`);
       return response.json();
     });
   }

   // 3. Create component
   function FeatureComponent({ id }: { id: string }) {
     const { data, isLoading } = useFeature(id);

     if (isLoading) {
       return <div>Loading...</div>;
     }

     return (
       <div>
         <h2>{data.name}</h2>
         {/* Component content */}
       </div>
     );
   }
   ```

2. **Form Handling**
   ```typescript
   import { useForm } from 'react-hook-form';
   import { zodResolver } from '@hookform/resolvers/zod';
   import * as z from 'zod';

   const schema = z.object({
     // Define form fields
   });

   function MyForm() {
     const form = useForm({
       resolver: zodResolver(schema)
     });

     return (
       <form onSubmit={form.handleSubmit(onSubmit)}>
         {/* Form fields */}
       </form>
     );
   }
   ```

### Troubleshooting

1. **Common Issues**
   - Check console for errors
   - Verify state updates
   - Check component props
   - Verify event handlers

2. **Development Tools**
   - Use React DevTools
   - Use Network tab for API issues
   - Use console.log for debugging
   - Check application state in React DevTools