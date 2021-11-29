import React, { useState, useEffect, PureComponent } from "react";
import { useHistory } from "react-router";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
  {
    name: 'Fornecedores Ativos',
    uv: '',
  },

];



export default function Grafico() {
  const [contarVendor, setContarVendor] = useState (0);
  const [contarUser, setContarUser] = useState (0);
  console.log("contei vendor e deu:", contarVendor)
  console.log("contei user e deu:", contarUser)
  const history = useHistory();


  useEffect(() => {

    const token = localStorage.getItem("token");

    async function getUsers() {

      let resultado = await fetch("http://10.5.0.53/api/v1/user?size=20", {
          method: 'GET',
          headers: {
              Authorization: token,
          },
  
      });
      resultado = await resultado.json();
      //console.log("aqui o content", resultado.response.content);
      //console.log("aqui o item", resultado);
      if(resultado.status === 1001 ){
        await setContarUser(resultado.response.numberOfElements)
        console.log("users aqui", resultado.response.numberOfElements)
        //await setContent(resultado.response.content);
        //console.log("aqui esta", contente)
        //for (var j = 0 ; j < resultado.response.content.length; j++ ) {
        //contente[j] += 1;
          //setContar(content2[i])
        //console.log("aqui esta o", j)
        //console.log("resultado", resultado.response.numberOfElements)
        //console.log("resultado", resultado)
        //}
      } else if (resultado.status === 1027){
        await localStorage.clear();
        await sessionStorage.clear();
        await history.push("/")
      }          
  }



    async function getVendors() {
  
      let resultado = await fetch("http://10.5.0.53/api/v1/vendor?size=100", {
          method: 'GET',
          headers: {
              Authorization: token,
          },
    
      });
      resultado = await resultado.json();
      //console.log("aqui o content", resultado.response.content);
      //console.log("aqui o vendor", resultado.response.content);
      if(resultado.status === 1001 ){
        await setContarVendor(resultado.response.numberOfElements)
        console.log("vendors aqui", resultado.response.numberOfElements)
        //await setContent2(resultado.response.content);
        //for (var i = 0 ; i < content2.length; i++ ) {
          //content2[i] = i+1;
          //setContar(content2[i])
          //console.log("aqui esta a", i)
        //}

      } else if (resultado.status === 1027){
        await localStorage.clear();
        await sessionStorage.clear();
        await history.push("/")
      }
      //resultado = await setContent(resultado.json());
      //console.log("aqui> ", content)
      //console.log("aqui o content name ", resultado.response.content);
      //item = (resultado.response.content)
          
    }

    
    getUsers();
    getVendors();

  }, [])


  return (
    <React.Fragment>
<div style={{ width: '100%' }}>
        <h4>A demo of synchronized AreaCharts</h4>
        <h4>{}</h4>
        <BarChart width={730} height={250} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="contar" fill="#82ca9d" />
</BarChart>
      </div>
    </React.Fragment>
  );
}