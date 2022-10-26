import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, TextField } from "@mui/material";

const EjemploObjeto = () => {
  const [errors, setErrors] = useState(false);
  const [objetoPrueba, setObjetoPrueba] = useState({
    pokemon: "",
    pokemonDos: "",
  });
  /** creamos de partida nuestro objeto para hacer pruebas. 
  
  lo primero a destacar son 2 puntos.
  1.-  se declaran el objeto poniendole {} en el useState.
  2.- dentro del objeto se debe declarar los nombres de los parametros que
  llevará nuestro objeto en este caso serán pokemon y pokemonDos, 
  uds pueden usar el nombre que estimen conveniente.


   */

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setObjetoPrueba({ ...objetoPrueba, [name]: value });
  };
  /**para explicar los cambios en la funcion handler se debe considerar lo siguiente:
  1.- hacemos un console log del event, si uds echan a correr el proyecto notarán que 
  al escribir en los textfields tendrán un log con información, ese es nuestro event.
  al profundizar sobre la información que contiene este evento pueden notar que hay un apartado
  llamado "target" y dentro de este hay otros tantos elementos más. nos enfocaremos en 
  el "name" y el "value", con ello en mente, en la linea 23 uds notarán que creamos dos constantes, name y value y que al pasarle
  el evento, estos tomarán los valores indicados. 

  en la linea 24 hacemos el set de los valores. se usa primero abrir llaves dentro del parentesis, para indicar que debe mantener
  los datos antiguos y modificar los nuevos. si quitamos esto se borrarán los datos antiguos, generando que el sistema no reconozca 
  el value en el textfield.
  al usar las constantes definidas anteriormente, podemos setear el valor "name" como parametro a rellenar y el value el dato obtenido
  en este caso:

  si escribimos en el textfield pokemon, este tomará el nombre del textfield y lo traerá en el evento, al momento de setear, usará el nombre pokemon
  y el valor que escribieron para setearlo en el objeto, si escriben en el 2do textfield hará lo mismo con pokemonDos, ignorando que el otro 
  campo ya se relleno y tampoco lo eliminará.

puntos a considerar:
  no confundir label y name. 
  al momento de setear el name llega [ ], eso para que tome el valor como un parametro, si ponemos name a secas, este se seteará como name y no como 
  pokemon o pokemonDos
  si ustedes quieren setear un valor por defecto, pueden hacerlo al momento de declarar su objeto

  prueben haciendo el siguiente ejercicio:

  const [objetoPrueba, setObjetoPrueba] = useState({
    pokemon: "pikachu",
    pokemonDos: "",
  });

  el valor de pokemon se iniciará como pikachu, lo podrán modificar sin problemas, pero iniciará siempre asi.

  pueden crear muchas funciones handler para setear cada valor por separado, es factible pero para fines practicos no es recomendable por la repetición
  de codigo optimizable.

   */

  console.log(objetoPrueba);
  return (
    <Box sx={{ border: 1, mt: 2 }}>
      <Grid container spacing={1} sx={{ mt: 2,ml: 2 ,height: 100 }}>
        <Grid item md={5} >
          <TextField
            fullWidth
            error={errors}
            helperText={errors && "hay error"}
            label="Pokemon"
            name="pokemon"
            type="text"
            variant="outlined"
            value={objetoPrueba.pokemon}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item md={5}>
          <TextField
            fullWidth
            error={errors}
            helperText={errors && "hay error"}
            label="PokemonDos"
            name="pokemonDos"
            type="text"
            variant="outlined"
            value={objetoPrueba && objetoPrueba.pokemonDos}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          {objetoPrueba.pokemon.trim() !== "" &&
            (objetoPrueba.pokemon.trim() == objetoPrueba.pokemonDos.trim()
              ? "iguales"
              : "distintos")}
        </CardContent>
      </Card>
    </Box>
  );
};

export default EjemploObjeto;
