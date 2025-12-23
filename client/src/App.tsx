import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const LandingOriginal = lazy(() => import("./pages/LandingOriginal"));
const Landing = lazy(() => import("./pages/Landing"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const LandingImproved = lazy(() => import("./pages/LandingImproved"));
const DashboardFull = lazy(() => import("./pages/DashboardFull"));
const Recording = lazy(() => import("./pages/Recording"));
const MarketingHomeView = lazy(() => import("./pages/MarketingHomeView"));

// Loading component for suspense fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={MarketingHomeView} />
        <Route path="/original" component={LandingOriginal} />
        <Route path="/modern" component={Landing} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/contact" component={Contact} />
        <Route path="/app" component={Home} />
        <Route path="/dashboard" component={DashboardFull} />
        <Route path="/recording" component={Recording} />
        <Route path="/checkout/success" component={CheckoutSuccess} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

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
