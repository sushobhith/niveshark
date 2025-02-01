import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export function AuthDialog({ isOpen, onClose, defaultTab = 'signin' }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(defaultTab);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'signin') {
      signIn(username, password);
    } else {
      signUp(username, password, email);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 mb-4">
          <Button
            variant={activeTab === 'signin' ? 'default' : 'outline'}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </Button>
          <Button
            variant={activeTab === 'signup' ? 'default' : 'outline'}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {activeTab === 'signup' && 
            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />}
          </div>
          <Button type="submit" className="w-full">
            {activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
