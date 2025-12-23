import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { usePageMeta } from "@/hooks/usePageMeta";
import { seoPages } from "@/lib/seoMeta";
import { View } from "@/types/dashboard";
import { DashboardNav } from "@/components/DashboardNav";
import { AppDashboard } from "@/components/AppDashboard";
import { AskAI } from "@/components/AskAI";
import { MeetingsPanel } from "@/components/MeetingsPanel";
import { SettingsPanel } from "@/components/SettingsPanel";

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  usePageMeta(seoPages.app);

  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  // Render the appropriate view based on currentView state
  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <AppDashboard />;
      case View.ASK_AI:
        return <AskAI />;
      case View.MEETINGS:
        return <MeetingsPanel />;
      case View.SETTINGS:
        return <SettingsPanel />;
      case View.REWIND:
      case View.PENDANT:
      default:
        return <AppDashboard />;
    }
  };

  return (
    <div className="h-screen flex bg-[#f5f5f7] overflow-hidden font-sans">
      {/* Navigation Sidebar */}
      <DashboardNav currentView={currentView} setView={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {renderView()}
      </main>
    </div>
  );
}
