import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Formulario from "./pages/Formulario";
import Login from "./pages/Login";
import PermanentDrawerLeft from "./components/Drawer";
import { useUsuario } from "./context/usuarioContext";

const RouterApp = () => {
  const { usuario } = useUsuario();
  return !usuario ? <LogInRoutes /> : <LogOutRoutes />;
};

const LogInRoutes = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
    </Routes>
  );
};
const LogOutRoutes = () => {
  return (
    <>
      <PermanentDrawerLeft />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/formulario" element={<Formulario />} />
      </Routes>
    </>
  );
};
export default RouterApp;
