
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Marketplace from "./pages/Marketplace";
import Freelancing from "./pages/Freelancing";
import EditProfile from "./pages/EditProfile";
import Community from "./pages/Community";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import FreelancerProfile from "./pages/FreelancerProfile";
import ProductDisplay from "./pages/ProductDisplay";
import PaymentSuccess from "./pages/PaymentSuccess";
import About from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import FindExpert from "./pages/FindExpert";
import BecomeMentor from "./pages/BecomeMentor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/freelancing" element={<Freelancing />} />
          <Route path="/product/:id" element={<ProductDisplay />} />
          <Route path="/community" element={<Community />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/freelancer/:id" element={<FreelancerProfile />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/find-expert" element={<FindExpert />} />
          <Route path="/become-mentor" element={<BecomeMentor />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
