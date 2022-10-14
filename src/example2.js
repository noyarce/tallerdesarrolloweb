import logo from './logo.svg';
import './App.css';
import Home from './components/Poke';
import React,{ useEffect, useState } from 'react';

function App() {
const [infoString, setInfoString] = useState("");
const [infoArray, setInfoArray] = useState([]);
const [info, setInfo]= useState(null);

useEffect(()=>{
  setInfo("hola");
  setInfoString("stringss");
  setInfoArray([{label : "holi", id: 0},{label:"chao",id:1}]);
},[]);

  return (
  <Home props={info} props2 = {infoString} props3={infoArray}/>
  );
}

export default App;
