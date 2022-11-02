import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import Poke from "./Poke";
import { LinearProgress } from "@mui/material";

import { useBuscarInfoQuery } from "../Queries/QueriEjemplo";

const Home = () => {
  /** cambiamos el nombre que habiamos usado en las listas para hacerlos mas descriptivos. 
además personalizamos un poco el codigo para hacerlo un poco mas funcional y bonito. cada funcion tendrá comentarios
sobre que hace cada cosa.
 */
  const [listadoOriginal, setListadoOriginal] = useState([]);
  const [listadoAuxiliar, setListadoAuxiliar] = useState([]);
  const [listadoSeleccionado, setListadoSeleccionado] = useState([]);

  const { data: nuevoListado, isLoading: cargando } = useBuscarInfoQuery();

  console.log(nuevoListado);

  const [buscador, setBuscador] = useState("");
  const [errors, setErrors] = useState(false);

  let estilo = { backgroundColor: "red" };

  const cargarPokemones = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151").then(
      (response) => {
        /**aqui cambiamos lo siguiente, ordenamos los resultados antes de setearlos en el listado original, 
        los ordenamos por nombres ya que la api no entrega una id.
        el metodo localeCompare sirve de forma muy resumida para la funcionalidad aplicada. se recomienda repasar el
        sorting con javascript. 

        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

        */
        let listadoOrdenado = response.data.results.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setListadoOriginal(listadoOrdenado);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleInputChange = (event) => {
    setBuscador(event.target.value);
  };

  const stack = (itemExterno) => {
    /** durante la clase revisamos esta opcion quedará comentada para fines practicos.
    para profundizar les recomiendo este articulo (en inglés) que explica las practicas 
    que se utilizan para añadir items en un array 
    https://javascript.plainenglish.io/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc

    setListadoSeleccionado((listadoSeleccionado) => [
      ...listadoSeleccionado,
      itemExterno,
    ]);
    
    ###########################################################3

    aqui concatenamos el item externo y nuevamente lo ordenamos para setearlo en la lista. 

*/
    let concatenarItem = listadoSeleccionado.concat(itemExterno);
    let ordenarListadoSeleccionado = concatenarItem.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setListadoSeleccionado(ordenarListadoSeleccionado);

    /**en este tramo buscamos el item externo dentro del listado original,
    y seleccionamos todos los items distintos a este
    estos los guardamos en un listado filtrado para setearlo en el original. 
    asi removemos el item de el listado original y auxiliar
    */
    let listadoOriginalFiltrado = listadoOriginal.filter(
      (item) => item.name !== itemExterno.name
    );
    setListadoOriginal(listadoOriginalFiltrado);

    let listadoAuxiliarFiltrado = listadoAuxiliar.filter(
      (item) => item.name !== itemExterno.name
    );
    setListadoAuxiliar(listadoAuxiliarFiltrado);
  };

  const unstack = (itemExterno) => {
    /**esta funcion es el inverso de la funcion anterior, salvo que ahora toma los items de forma ordenada en el
    listado original y los setea donde corresponde
     */
    let concatenarItem = listadoOriginal.concat(itemExterno);
    let listadoOriginalOrdenado = concatenarItem.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setListadoOriginal(listadoOriginalOrdenado);

    let listadoSeleccionadoFiltrado = listadoSeleccionado.filter(
      (item) => item.name !== itemExterno.name
    );
    setListadoSeleccionado(listadoSeleccionadoFiltrado);

    /*


    este era el codigo original,  solo hacia el inverso de la funcion anterior, tomaba el item seleccionado 
    y lo enviaba de vuelta al listado original, para despues quitarlo del listado seleccionado
      original desde aqui --->

    setListadoOriginal((listadoOriginal) => [...listadoOriginal, itemExterno]);

    let listadoSeleccionadoFiltrado = listadoSeleccionado.filter(
      (item) => item.name !== itemExterno.name
    );
    setListadoSeleccionado(listadoSeleccionadoFiltrado);
    */
  };

  // useEffect(() => {
  //   cargarPokemones();
  // }, []);

  useEffect(() => {
    if (buscador.trim() !== "") {
      let result = listadoOriginal.filter((item) =>
        item.name.toString().includes(buscador.toString().trim())
      );
      if (result.length !== 0) {
        errors && setErrors(false);

        /**en esta etapa añadirmos el validador "errors", el cual muestra un mensaje en caso de que
        no tengamos pokemones disponibles, para probar su funcionalidad les recomiendo escribir en el buscador
        "Pikachu" y deberia mostrarles solamente 1, si escriben "Pikachux" deberia marcar error. 
        
        la funcionalidad hace lo siguiente: 
        en la linea 132 valida el largo de resultado de la busqueda, al buscar pikachu este tendra un lenght = 1
        en la linea 133 tiene que errors && setError(false) 
        se usa el operador logico && que valida que errors sea true, en caso de que sea true, seteará como false
        en caso de que sea falso no hará nada, esto evitará que se setee una y otra vez en false. 

        */
      } else {
        /**en caso contrario, si el array está vacio, diremos que el error se vuelve true  */
        !errors && setErrors(true);
      }

      /** el resultado vacio o no se seteará al final*/
      setListadoAuxiliar(result);
    }
    console.log(buscador);
  }, [buscador]);

  return (
    /* este tramo lo mejoramos de forma visual, utilizaremos Container y box para acomodar los espacios. 
    la prop sx en todos los casos aqui se encarga de acomodar la información y dar estilos como CSS pero de Material UI

    https://mui.com/system/getting-started/the-sx-prop/
    pueden probar en casa sobre las propiedades de SX y jueguen a acomodar todo. 
    */
    <Container fixed sx={{ height: 1 }}>
      <Box
        sx={{
          border: 1,
          borderColor: "red",
          height: 700,
          overflowY: "scroll",
        }}
      >
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          error={errors}
          helperText={errors && "hay error"}
          label="Pokemon"
          name="pokemon"
          type="text"
          variant="outlined"
          value={buscador}
          onChange={handleInputChange}
        />
        <Grid
          container
          spacing={1}
          sx={{
            mt: 2,
            height: 700,
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <Grid item md={4}>
            {cargando ? (
              <LinearProgress />
            ) : (
              nuevoListado.map((element, index) => (
                <Poke pokemon={element} key={index} />
              ))
            )}
          </Grid>
          <Grid item md={4}>
            {buscador &&
              listadoAuxiliar.map((element, index) => (
                <Poke pokemon={element} key={index} funcion={stack} />
              ))}
          </Grid>
          <Grid item md={4}>
            {listadoSeleccionado.map((element, index) => (
              <Poke pokemon={element} key={index} funcion={unstack} />
            ))}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
/**en las lineas 203 y 208 le entregamos a poke una prop llamada funcion, esta se encarga de recibir eso
una funcion la cual dentro de poke, poke no se preocupa de nada, solo se encargará de hacer el llamado a la funcion
con los datos entregados. es por ello que se le puede entregar dos funciones distintas en distintas listas. 
*/

export default Home;
