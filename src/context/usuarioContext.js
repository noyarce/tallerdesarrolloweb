import React, { useState, useMemo, useEffect } from "react";
import { setToken, getToken, deleteToken } from "../helpers/token-helpers";
import clienteAxios from "../helpers/clienteAxios";

const UsuarioContext = React.createContext();

const UsuarioProvider = (props) => {
  const [usuario, setUsuario] = useState(null);
  const [errorLogin, setErrorLogin] = useState(false);
  const [cargandoUsuario, setCargandoUsuario] = useState(false);

 
  const loginUsuario = async (form) => {
    try {
      setCargandoUsuario(true);
      const { data } = await clienteAxios.post("api/login-usuario", form);
      if (data.codigo === 401) {
        setToken(null);
        setCargandoUsuario(false);
        setErrorLogin(true);
        return;
      }
      setToken(data.token);
      setCargandoUsuario(false);
      setErrorLogin(false);
      getUsuario();
      window.location = "/home";
    } catch (error) {
      setCargandoUsuario(false);
      console.log(error);
    }
  };

  const getUsuario = async () => {
    if (!getToken()) {
      setCargandoUsuario(false);
      return;
    }

    try {
      setCargandoUsuario(true);
      const { data } = await clienteAxios.get("api/usuario");
      setUsuario(data.data);
      setCargandoUsuario(false);
    } catch (error) {
      setCargandoUsuario(false);
      console.log(error);
    }
  };

  const logout = () => {
    setUsuario(null);
    deleteToken();
    window.location = "/login";
  };

  useEffect(() => {
    getUsuario();
  }, []);

  const value = useMemo(() => {
    return {
      usuario,
      cargandoUsuario,
      loginUsuario,
      setCargandoUsuario,
      logout,
      errorLogin,
      setErrorLogin,
    };
  }, [usuario, cargandoUsuario, errorLogin]);

  return <UsuarioContext.Provider value={value} {...props} />;
};

const useUsuario = () => {
  const context = React.useContext(UsuarioContext);

  if (!context) {
    throw new Error(
      "el hook useUsuario debe estar dentro del proveedor UsuarioContext"
    );
  }

  return context;
};

export { UsuarioProvider, useUsuario };
