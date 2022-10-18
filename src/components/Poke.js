import React from "react";
import { Card, CardContent } from "@mui/material";

const Poke = ({ nombre , estilo}) => {
  return (
    <Card>
      <CardContent sx={estilo} >{nombre}</CardContent>
    </Card>
  );
};

export default Poke;
