import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Competencies from "@/pages/competencies";
import Courses from "@/pages/courses";
import Participants from "@/pages/participants";
import Passport from "@/pages/passport";
import LearningPaths from "@/pages/learning-paths";
import Assessment from "@/pages/assessment";
import Certificates from "@/pages/certificates";
import Quizzes from "@/pages/quizzes";

function AppRouter() {
  return (
    <Switch>
      <Route path="/app" component={Dashboard} />
      <Route path="/app/competencies" component={Competencies} />
      <Route path="/app/courses" component={Courses} />
      <Route path="/app/learning-paths" component={LearningPaths} />
      <Route path="/app/quizzes" component={Quizzes} />
      <Route path="/app/participants" component={Participants} />
      <Route path="/app/passport" component={Passport} />
      <Route path="/app/assessment" component={Assessment} />
      <Route path="/app/certificates" component={Certificates} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppLayout() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex h-14 items-center justify-between gap-4 px-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto">
            <AppRouter />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  const [location] = useLocation();
  const isLanding = location === "/";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLanding ? <Landing /> : <AppLayout />}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
