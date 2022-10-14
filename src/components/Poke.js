import React from "react";
import { Card, CardContent } from "@mui/material";

const Poke = ({nombre}) => {
  console.log(nombre)
  return (
    <Card>
      <CardContent>{nombre}</CardContent>
    </Card>
  );
};

export default Poke;
