import {
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Formulario from "./pages/Formulario";
import { useState } from "react";

const RouterApp = () => {
  const [login, setLogin]= useState(false);
  return (login? <LogInRoutes/>:<LogOutRoutes/>)
};

const LogInRoutes=()=>{
return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/formulario" element={<Formulario />} />
      </Routes>
  );
}
const LogOutRoutes=()=>{
return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route exact path="/formulario" element={<Formulario />} /> */}
      </Routes>
  );
}
export default RouterApp;
