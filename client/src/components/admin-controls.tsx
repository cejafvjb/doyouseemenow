import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AdminControlsProps {
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
}

export default function AdminControls({ isAdminMode, setIsAdminMode }: AdminControlsProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (creds: { username: string; password: string }) => {
      const response = await apiRequest('POST', '/api/admin/login', creds);
      return response.json();
    },
    onSuccess: () => {
      setIsAdminMode(true);
      setShowLogin(false);
      setCredentials({ username: '', password: '' });
      toast({
        title: "Login successful",
        description: "You are now in admin mode.",
      });
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(credentials);
  };

  const handleLogout = () => {
    setIsAdminMode(false);
    toast({
      title: "Logged out",
      description: "Admin mode disabled.",
    });
  };

  if (isAdminMode) {
    return (
      <div className="mb-8 text-center">
        <button 
          onClick={handleLogout}
          className="admin-control text-black hover:opacity-70 transition-opacity"
        >
          Admin Mode - Click to Logout
        </button>
        <div className="mt-2 text-sm text-black">
          Drag and drop images to reorder
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 text-center">
      {!showLogin ? (
        <button 
          onClick={() => setShowLogin(true)}
          className="admin-control text-black hover:opacity-70 transition-opacity"
        >
          Admin Login
        </button>
      ) : (
        <form onSubmit={handleLogin} className="inline-block">
          <div className="flex gap-2 items-center justify-center mb-2">
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              className="px-2 py-1 border-none bg-gray-50 text-black text-sm"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="px-2 py-1 border-none bg-gray-50 text-black text-sm"
              required
            />
            <button 
              type="submit" 
              disabled={loginMutation.isPending}
              className="text-black hover:opacity-70 transition-opacity text-sm"
            >
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <button 
            type="button"
            onClick={() => setShowLogin(false)}
            className="text-black hover:opacity-70 transition-opacity text-sm"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
