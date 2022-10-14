import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import Poke from "./Poke";
const Home = () => {
  useEffect(() => {
    cargarPokemones();
  }, []);

  const [listado, setListado] = useState([]);

  const cargarPokemones = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151").then(
      (response) => {
        console.log(response.data.results);
        setListado(response.data.results);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Card>
      <CardContent>
        {listado.map((element, index) => (
          <Poke nombre= {element.name}></Poke>
        ))}
      </CardContent>
    </Card>
  );
};

export default Home;
