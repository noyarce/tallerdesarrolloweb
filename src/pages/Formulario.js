import React, { useState, Fragment } from "react";
import {
  Button,
  Card,
  CardActions,
  Container,
  Grid,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomTextField from "../components/CustomTextfield";
import { format } from "date-fns";

const Formulario = () => {
 
  const {handleSubmit,reset,control
  } = useForm({
    defaultValues: {
      nombre: "",
      cantidad: "",
      fecha: new Date(),
    },
  });

  const onSubmit = (data) => {
    console.log("original", data);
    data.fecha = format(data.fecha, "dd-MM-yyyy");
    console.log("modificado", data);
    reset();
  };
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
                  />
                </Grid>
                <Grid item md={4} xs={4}>
                  <CustomTextField
                    name="cantidad"
                    label="cantidad"
                    control={control}
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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

export default Formulario;
