"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { User, UserRole, AuthState, getDashboardRoute } from "@/lib/auth";

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    role: UserRole,
  ) => Promise<void>;
  logout: () => void;
  updateUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: false,
    isAuthenticated: false,
  });

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error("Failed to restore auth state:", error);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string, role: UserRole) => {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/auth/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, password, role }),
        // });

        // Mock: Create user object (replace with real API response)
        const user: User = {
          id: "1",
          email,
          firstName: "",
          lastName: "",
          role,
          createdAt: new Date(),
        };

        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Also set a cookie for middleware (you'll need js-cookie or similar)
        document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/`;

        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        });

        // Redirect to role-specific dashboard
        window.location.href = getDashboardRoute(role);
      } catch (error) {
        console.error("Login error:", error);
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        throw error;
      }
    },
    [],
  );

  const register = useCallback(
    async (
      email: string,
      firstName: string,
      lastName: string,
      password: string,
      role: UserRole,
    ) => {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/auth/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, username, password, role }),
        // });

        // Mock: Create user object (replace with real API response)
        const user: User = {
          id: "1",
          email,
          firstName,
          lastName,
          role,
          createdAt: new Date(),
        };

        localStorage.setItem("user", JSON.stringify(user));
        document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/`;

        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        });

        // Redirect to role-specific dashboard
        window.location.href = getDashboardRoute(role);
      } catch (error) {
        console.error("Register error:", error);
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        throw error;
      }
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
    window.location.href = "/auth/login";
  }, []);

  const updateUserRole = useCallback(
    (role: UserRole) => {
      if (authState.user) {
        const updatedUser = { ...authState.user, role };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        document.cookie = `user=${encodeURIComponent(JSON.stringify(updatedUser))}; path=/`;
        setAuthState((prev) => ({
          ...prev,
          user: updatedUser,
        }));
        window.location.href = getDashboardRoute(role);
      }
    },
    [authState.user],
  );

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
