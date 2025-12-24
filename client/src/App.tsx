import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Import = lazy(() => import("./pages/Import"));
const AppDashboard = lazy(() => import("./pages/AppDashboard"));
const AppRecording = lazy(() => import("./pages/AppRecording"));
const AppSettings = lazy(() => import("./pages/AppSettings"));

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
        {/* Public Marketing Website */}
        <Route path={"/"} component={Home} />
        <Route path={"/pricing"} component={Pricing} />
        <Route path={"/privacy"} component={Privacy} />
        <Route path={"/terms"} component={Terms} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/import"} component={Import} />

        {/* Protected App Routes */}
        <Route path={"/app"}>
          <ProtectedRoute>
            <AppLayout>
              <AppDashboard />
            </AppLayout>
          </ProtectedRoute>
        </Route>
        <Route path={"/app/dashboard"}>
          <ProtectedRoute>
            <AppLayout>
              <AppDashboard />
            </AppLayout>
          </ProtectedRoute>
        </Route>
        <Route path={"/app/recording"}>
          <ProtectedRoute>
            <AppLayout>
              <AppRecording />
            </AppLayout>
          </ProtectedRoute>
        </Route>
        <Route path={"/app/settings"}>
          <ProtectedRoute>
            <AppLayout>
              <AppSettings />
            </AppLayout>
          </ProtectedRoute>
        </Route>

        {/* 404 */}
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
