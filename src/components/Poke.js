import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";

const Poke = ({ nombre , estilo}) => {
  return (
    <Card>
      <CardContent sx={estilo} >{nombre}</CardContent>
    </Card>
  );
};

export default Poke;
