import React from "react";
import { Container } from "@mui/material";
import Formulario from "./pages/Formulario";
import PermanentDrawerLeft from "./components/Drawer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <PermanentDrawerLeft />
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/formulario" element={<Formulario />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Container>
  );
}
export default App;
