import React, { useState, Fragment } from "react";
import {
  Button,
  Card,
  CardActions,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
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
      caja: { id: "", label: "" },

      poke: { id: "", label: "" },
    },
  });

  const [params, setParams] = useState({ limit: 151 });
  const [pokemones, setPokemones] = useState([]);
  const {
    data: nuevoListado,
    isLoading: cargando,
    refetch: recargar,
    isError: errorQuery,
  } = useBuscarInfoQuery(params);

  const cajas = [
    { id: 0, label: "fuego" },
    { id: 1, label: "agua" },
  ];

  const onSubmit = (data) => {
   
    guardarInfo(data);
  };

  const guardarInfo = (data) => {
        setPokemones((pokemones) => [...pokemones,data]);

  };

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
                <Grid item md={4}>
                  <CustomAutocomplete
                    name="poke"
                    label="pokemons"
                    options={nuevoListado}
                    control={control}
                  />
                </Grid>
                <Grid item md={4}>
                  <CustomAutocomplete
                    name="caja"
                    label="caja"
                    options={cajas}
                    control={control}
                  />
                </Grid>
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
                  Terminar Registro
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>
        <Grid item md={12}>
          {pokemones?.map((element, index) => (
            <Typography>
              {element.poke.label} - {element.caja.label}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};
export default Formulario;
