import React, { useState, Fragment } from "react";
import { Button, Card, CardActions, Container, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomTextField from "../components/CustomTextfield";
import { format } from "date-fns";
import axios from "axios";
import { CustomAutocomplete } from "../components/CustomAutocomplete";
import { useBuscarInfoQuery } from "../Queries/QueriEjemplo";

const Formulario = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      cantidad: "",
      poke: { id: "", label: "" },
      fecha: new Date(),
    },
  });


  const [params, setParams] = useState({ limit: 151 });

  const {
    data: nuevoListado,
    isLoading: cargando,
    refetch: recargar,
    isError: errorQuery,
  } = useBuscarInfoQuery(params);

  /** Lo primero a considerar serán la declaración de nuestro useForm. 
          https://react-hook-form.com/api/useform
    use Form es un hook personalizado por la libreria react-hook-form, que se encarga de gestionar nuestros formularios, 
    este hook contiene varias funciones
    las cuales ustedes pueden revisar en el link anterior, en nuestro caso usaremos 3 funciones de nuestro hook, 
    handleSubmit:
      esta funcion recibe la data que hubiesemos puesto en nuestro formulario en caso de que esté correcta.

    reset:
      devuelve nuestros valores por default a como se declararon inicialmente.
    
    control:
    contiene los metodos para registrar los componentes. (vease a detalle con el componente CustomTextField)


además, nosotros podemos declarar los valores por defecto del formulario, en este caso se usan valores basicos y vacios, se pueden declarar 
valores por defecto para que no estén vacios pero eso depende del caso en que se quieran utilizar.

 */
  const onSubmit = (data) => {
    console.log("original", data);
    data.fecha = format(data.fecha, "dd-MM-yyyy");
    console.log("modificado", data);
    guardarInfo(data);
    reset();
  };

  const guardarInfo = (data) => {
    axios
      .post("https://httpbin.org/post", data)
      .then((response) => console.log(response));
  };
  /**cuando los datos del formulario estan validados, onsubmit recibe la data como un objeto, se puede manipular la data dentro del onsubmit para
enviar a una api y almacenar los datos enviados. */

  /**https://react-hook-form.com/get-started */

  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={12} xs={12} sx={{ mb: 5 }}>
          <form id="formulario" onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ p: 1 }}>
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item md={4} xs={4}>
                  <CustomTextField
                    name="nombre"
                    label="nombre"
                    control={control}
                    type="text"
                    inputProps={{ required: true }}
                  />
                </Grid>
                <Grid item md={4} xs={4}>
                  <CustomTextField
                    name="cantidad"
                    label="cantidad"
                    control={control}
                    type="number"
                    rules={{ pattern: "[0-9]*", min: 1, max: 99 }}
                    inputProps={{
                      inputMode: "numeric",
                    }}
                  />
                </Grid>
                <Grid item md={4} xs={4} sx={{ mt: 1 }}>
                  <CustomDatePicker
                    name="fecha"
                    label="Fecha"
                    control={control}
                  />
                </Grid>
              </Grid>
              <Grid item md={4}>
                <CustomAutocomplete
                  name="poke"
                  label="pokemons"
                  options={nuevoListado}
                  control={control}
                />
              </Grid>
              <CardActions>
                <Button
                  id="terminar_registro"
                  color="primary"
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ r: 0 }}
                >
                  {" "}
                  Terminar Registro
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
/** para fines practicos de la clase les facilito 3 componentes custom, que será el autocomplete,
  el date picker y Textfield. con los cuales podrán tener una base para lo que estimen conveniente utilizar. 
  ustedes además pueden crear sus propios componentes custom para utilizarlos y complementar sus formularios.
  
  */
export default Formulario;
