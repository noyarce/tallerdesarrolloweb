import React from "react";
import { Button, Card, CardActions, CardContent } from "@mui/material";

const Poke = ({ pokemon, estilo = null, funcion = null }) => {
  /**poke recibe 3 elementos, el pokemon, el estilo y funcion, estilo y funcion pueden ser nullables, esto 
  significa que en caso de que no venga con un valor desde el componente padre, este tomará un valod por defecto el cual será
  null.
   */
  return (
    <Card sx={estilo}>
      <CardContent>{pokemon.label} : {pokemon.id}</CardContent>
      <CardActions>
        {funcion && <Button onClick={() => funcion(pokemon)}>acción </Button>}
      </CardActions>
    </Card>
  );
};

export default Poke;
