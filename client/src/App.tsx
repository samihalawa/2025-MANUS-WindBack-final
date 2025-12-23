import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// 公开网站页面
const MarketingHomeView = lazy(() => import("./pages/MarketingHomeView"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Contact = lazy(() => import("./pages/Contact"));

// 应用页面（需要登录）
const AppDashboard = lazy(() => import("./pages/AppDashboard"));
const AppRecording = lazy(() => import("./pages/AppRecording"));
const AppSettings = lazy(() => import("./pages/AppSettings"));

// 其他页面
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const NotFound = lazy(() => import("./pages/NotFound"));

// 旧页面（保留兼容性）
const LandingOriginal = lazy(() => import("./pages/LandingOriginal"));
const Landing = lazy(() => import("./pages/Landing"));
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const LandingImproved = lazy(() => import("./pages/LandingImproved"));
const DashboardFull = lazy(() => import("./pages/DashboardFull"));
const Recording = lazy(() => import("./pages/Recording"));

// Loading component for suspense fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* ===== 公开网站路由 ===== */}
        <Route path="/" component={MarketingHomeView} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/contact" component={Contact} />
        <Route path="/checkout/success" component={CheckoutSuccess} />

        {/* ===== 应用路由（需要登录） ===== */}
        <Route path="/app/dashboard" component={AppDashboard} />
        <Route path="/app/recording" component={AppRecording} />
        <Route path="/app/settings" component={AppSettings} />

        {/* ===== 旧路由（保留兼容性） ===== */}
        <Route path="/original" component={LandingOriginal} />
        <Route path="/modern" component={Landing} />
        <Route path="/app" component={Home} />
        <Route path="/dashboard" component={DashboardFull} />
        <Route path="/recording-old" component={Recording} />
        <Route path="/landing-improved" component={LandingImproved} />
        <Route path="/dashboard-old" component={Dashboard} />

        {/* ===== 404 ===== */}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
