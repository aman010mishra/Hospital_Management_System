
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Hospitals from "./pages/Hospitals";
import HospitalDetails from "./pages/HospitalDetails";
import CreateHospital from "./pages/CreateHospital";
import EditHospital from "./pages/EditHospital";
import NotFound from "./pages/NotFound";
import { HospitalProvider } from "./context/HospitalContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <HospitalProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/hospital/:id" element={<HospitalDetails />} />
            <Route path="/create" element={<CreateHospital />} />
            <Route path="/edit/:id" element={<EditHospital />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HospitalProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
