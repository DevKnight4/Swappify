
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Search, 
  MessageCircle, 
  User, 
  Settings,
  Shield,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UserProfile from "./components/UserProfile";
import SkillBrowser from "./components/SkillBrowser";
import SwapRequests from "./components/SwapRequests";
import AdminDashboard from "./components/AdminDashboard";

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Users },
    { id: 'browse', label: 'Browse Skills', icon: Search },
    { id: 'requests', label: 'My Swaps', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Index />;
      case 'browse':
        return <SkillBrowser />;
      case 'requests':
        return <SwapRequests />;
      case 'profile':
        return <UserProfile />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Index />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          {/* Navigation Header */}
          <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gradient-primary">
                      Swappify
                    </h1>
                    <p className="text-xs text-muted-foreground font-medium">Fusion Exchange</p>
                  </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-1">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? "default" : "ghost"}
                      className={`flex items-center gap-2 transition-all ${
                        currentPage === item.id 
                          ? "bg-gradient-primary text-white shadow-primary" 
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      }`}
                      onClick={() => setCurrentPage(item.id)}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  ))}
                </nav>

                {/* User Menu */}
                <div className="flex items-center gap-3">
                  {/* Admin Toggle */}
                  <Button
                    variant={isAdmin ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setIsAdmin(!isAdmin);
                      if (!isAdmin) {
                        setCurrentPage('admin');
                      } else {
                        setCurrentPage('home');
                      }
                    }}
                    className={`hidden md:flex items-center gap-2 transition-all ${
                      isAdmin 
                        ? "bg-gradient-to-r from-destructive to-orange-500 text-white shadow-primary" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    {isAdmin ? 'Admin Mode' : 'User Mode'}
                  </Button>

                  <Avatar className="w-8 h-8 cursor-pointer animate-glow">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="bg-gradient-primary text-white text-sm font-medium">
                      SF
                    </AvatarFallback>
                  </Avatar>

                  {/* Mobile Menu Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Mobile Navigation */}
              {mobileMenuOpen && (
                <div className="md:hidden py-4 border-t border-border bg-card/80 backdrop-blur-sm">
                  <nav className="flex flex-col space-y-2">
                    {navigationItems.map((item) => (
                      <Button
                        key={item.id}
                        variant={currentPage === item.id ? "default" : "ghost"}
                        className={`justify-start transition-all ${
                          currentPage === item.id 
                            ? "bg-gradient-primary text-white shadow-primary" 
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        }`}
                        onClick={() => {
                          setCurrentPage(item.id);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </Button>
                    ))}
                    
                    <Button
                      variant={isAdmin ? "default" : "ghost"}
                      className={`justify-start ${
                        isAdmin 
                          ? "bg-gradient-to-r from-red-600 to-orange-600 text-white" 
                          : "text-gray-600"
                      }`}
                      onClick={() => {
                        setIsAdmin(!isAdmin);
                        if (!isAdmin) {
                          setCurrentPage('admin');
                        } else {
                          setCurrentPage('home');
                        }
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      {isAdmin ? 'Exit Admin' : 'Admin Mode'}
                    </Button>
                  </nav>
                </div>
              )}
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {renderCurrentPage()}
          </main>

          {/* Footer */}
          <footer className="bg-card border-t border-border mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gradient-primary">
                      Swappify
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Connect with your community to exchange skills, learn new talents, and build meaningful relationships through our fusion-powered skill exchange platform.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    © 2024 Swappify Platform. Built for community fusion.
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Platform</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground hover:*:text-foreground *:transition-colors *:cursor-pointer">
                    <li>How It Works</li>
                    <li>Safety Guidelines</li>
                    <li>Community Rules</li>
                    <li>Success Stories</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Support</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground hover:*:text-foreground *:transition-colors *:cursor-pointer">
                    <li>Help Center</li>
                    <li>Contact Us</li>
                    <li>Report Issue</li>
                    <li>Privacy Policy</li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
