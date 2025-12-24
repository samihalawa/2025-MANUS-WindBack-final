import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { LogOut, Home, Mic, Settings } from "lucide-react";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-background">
      {/* 侧边栏 */}
      <aside className="w-64 border-r border-border bg-card">
        <div className="p-6">
          <Link href="/app/dashboard">
            <a className="flex items-center gap-2 text-xl font-bold">
              <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white">
                W
              </div>
              <span>WindBack</span>
            </a>
          </Link>
        </div>

        <nav className="space-y-2 px-4">
          <Link href="/app/dashboard">
            <a className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent text-foreground">
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
          </Link>

          <Link href="/app/recording">
            <a className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent text-foreground">
              <Mic className="w-5 h-5" />
              <span>Recording</span>
            </a>
          </Link>

          <Link href="/app/settings">
            <a className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent text-foreground">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </Link>
        </nav>
      </aside>

      {/* 主内容 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航栏 */}
        <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Welcome, {user?.name || "User"}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => logout()}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </header>

        {/* 内容区域 */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
