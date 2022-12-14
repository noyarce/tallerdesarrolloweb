import React from "react";
import { Container } from "@mui/material";

import PermanentDrawerLeft from "./components/Drawer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RouterApp from "./router";

import { BrowserRouter } from "react-router-dom";
import { UsuarioProvider } from "./context/usuarioContext";

const queryClient = new QueryClient();

function App() {
  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <UsuarioProvider>
          <BrowserRouter>
            <RouterApp />
          </BrowserRouter>
        </UsuarioProvider>
      </QueryClientProvider>
    </Container>
  );
}
export default App;
