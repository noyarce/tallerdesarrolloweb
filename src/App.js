import React from "react";
import { Container } from "@mui/material";
import Formulario from "./pages/Formulario";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./components/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </Container>
  );
}

export default App;
