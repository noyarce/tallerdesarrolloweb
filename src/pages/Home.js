import React, { useState } from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import Poke from "../components/Poke";
import { LinearProgress } from "@mui/material";
import { useBuscarInfoQuery } from "../Queries/QueriEjemplo";

const Home = () => {
  const [params, setParams] = useState({ limit: 151 });

  const {
    data: nuevoListado,
    isLoading: cargando,
    refetch: recargar,
    isError: errors,
  } = useBuscarInfoQuery(params);

  const handleInputChange = (event) => {
    setParams({limit: event.target.value});
  };
  return (
    <Container fixed sx={{ height: 1 }}>
      <Box>
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          error={errors}
          helperText={errors && "hay error"}
          label="Pokemon"
          name="pokemon"
          type="number"
          variant="outlined"
          value={params?.limit}
          onChange={handleInputChange}
        />
        <Button onClick={() => recargar()}>holi</Button>
        <Grid
          container
          spacing={1}
          sx={{
            mt: 2,
            height: 400,
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <Grid item md={4}>
            {cargando ? (
              <LinearProgress />
            ) : (
              nuevoListado?.map((element, index) => (
                <Poke pokemon={element} key={index} />
              ))
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
