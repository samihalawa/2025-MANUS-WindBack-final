import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    // 重定向到登录
    window.location.href = getLoginUrl();
    return null;
  }

  return <>{children}</>;
}
