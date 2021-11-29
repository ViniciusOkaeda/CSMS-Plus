// nao esta sendo usado

import React, { useState } from "react";
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@mui/material/TableContainer';
import FormControl from '@mui/material/FormControl';
import Icon from '../assets/loupe.png';





const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
      height: '80%',
      margin: 'auto',
      marginTop: '100px',
    },
    paper: {
      backgroundColor: '#fff',
      padding: theme.spacing(2, 4, 3),
      outline: 0,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#FBCF00',
      fontWeight: 'bold',
      "&:hover": {
          background: "rgb(129, 129, 129)"
        },
    },   
  }));

  
  export default function ClientGetAdmin(props) {
  const tokenH = localStorage.getItem("token");
  const vendorName = localStorage.getItem("vendorname");
  const classes = useStyles();
  const [error, setError] = useState(null);

  const [loginSearch, setLoginSearch] = useState('');
  
  const [ clientSubscription, setClientSubscription] = useState ([ {
    id_customer:'',
    name:'',
    lastName:'',
    login:'',
    profileName:'', 
    viewers_id:'', 
    portals_id:'', 
    birthday:'', 
    email:'', 
    phone1:'', 
    phone2:'', 
    password:'', 
    pin:'', 
  }])


  async function searchCustomer() {
    if(loginSearch !== '') {
      let vendor = vendorName
      let search = loginSearch
      let item = {vendor, search}
      let resultado = await fetch("http://10.5.0.53/api/v1/motvCustomer/search", {
          method: 'POST',
          headers: {
              Authorization: tokenH,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(item)
      });
      resultado = await resultado.json();

      if(resultado.status === 1001) {
        await setClientSubscription(resultado.response)
        console.log("aqui está os clientes:", resultado)
      } else if(resultado.status === 1600) {
        setError("Cliente não existe, ou não possui device")
      }



      //await setContent(resultado.response);
      //console.log("aqui o content customer", name);
      //console.log("aqui o item", resultado.response);
      //resultado = await setContent(resultado.json());
      //console.log("aqui> ", content)
      //console.log("aqui o content name ", resultado.response.content);
      //item = (resultado.response.content)
    }
        
}


  return (
    <React.Fragment>

    <div style={{
          width: '100%', 
          height: '100%', 
          backgroundColor: '#fff',  
            }}>
              
              <Box component="form" noValidate sx={{ mt: 1 }}>


                  <div  style={{display: 'flex', width: '70%', height: '40px', borderRadius: '30px', backgroundColor: '#fff', boxShadow: '0px 0px 15px rgba(220, 220, 220, 1)', margin: '30px auto 0',}}>
                  <input 
                  className="inputSearch"
                  id="input" 
                  type="text" 
                  autoComplete="off" 
                  placeholder="Pesquise um cliente pelo nome de usuário"
                  style={{
                    width: '100%', 
                    height: '40px', 
                    borderColor: 'transparent', 

                    paddingLeft: '40px',
                    outline: '0px',
                    borderTopLeftRadius: '30px',
                    borderBottomLeftRadius: '30px',
                  }}
                  onChange={ (event) => {setLoginSearch(event.target.value)}}
                  /> 

                  <Button onClick={searchCustomer} className="inputSearch2" style={{
                    width: '20%', 
                    backgroundImage: `url(${Icon})`,
                    backgroundColor: '#FAFAFA',
                    backgroundRepeat: 'no-repeat',
                    borderColor: 'transparent',
                    borderBottomRightRadius: '30px', 
                    borderTopRightRadius: '30px',
                    backgroundPosition: '20px 10px',
                    cursor: 'pointer',
                    }}
                    
                    />
                  </div>
                  {error && <div className="error" style={{width: '300px', textAlign: 'center', margin: '15px auto'}}>{error}</div>}
                <FormControl variant="standard">

                    </FormControl>
                    </Box>

      <div style={{width: '90%', height: '1px', backgroundColor: '#E6E6E6', margin: 'auto', marginTop: '2%'}}></div>
            
      <div className={classes.paper}>


{/*Aqui era o Orders */}
 {/* <h2 style={{margin: 'auto', marginLeft: '10px', marginBottom: '20px'}}>Buscar Usuários</h2>*/}

 <TableContainer sx={{ maxHeight: 440, maxWidth: 540 }}>
   <Table size="small">
     <TableHead>
       <TableRow>
         <TableCell style={{ minWidth: 170, align: 'center'}}>Id Cliente</TableCell>
         <TableCell style={{ minWidth: 170, align: 'center'}}>Nome</TableCell>
         <TableCell style={{ minWidth: 170, align: 'center'}}>Sobrenome</TableCell>
         <TableCell style={{ minWidth: 170, align: 'center'}}>Login</TableCell>
         <TableCell style={{ minWidth: 170, align: 'center'}}>Nome do Perfil</TableCell>
         <TableCell style={{ minWidth: 170, align: 'center'}}>Id de Visualização</TableCell>
         <TableCell style={{ minWidth: 170, align: 'center'}}>Id do Portal</TableCell>
         <TableCell style={{ minWidth: 170, align: 'center'}}>Nascimento</TableCell>
         <TableCell style={{ minWidth: 170, align: 'center'}}>Email</TableCell>
         <TableCell style={{ minWidth: 170, align: 'center'}}>Tel 1</TableCell>
         <TableCell style={{ minWidth: 170, align: 'center'}}>Tel 2</TableCell>
         <TableCell style={{ minWidth: 170, align: 'center'}}>Token</TableCell>
         <TableCell style={{ minWidth: 170, align: 'center'}}>Senha</TableCell>
         <TableCell style={{ minWidth: 170, align: 'center'}}>Pin</TableCell>
         <TableCell align="right">Ações</TableCell>
       </TableRow>
     </TableHead>
     </Table>
 

     <Table style={{marginBottom: '30px'}}>
      <TableBody>{
        clientSubscription.map((item) => (
          <TableRow key={item.id_customer}> 
           <TableCell style={{ minWidth: 170, align: 'left'}}>{item.id_customer == null ? "Vazio" : item.id_customer}</TableCell>
           <TableCell style={{ minWidth: 170, align: 'left'}}>{item.name == null ? "Vazio" : item.name}</TableCell>
           <TableCell style={{ minWidth: 170, align: 'left'}}>{item.lastName == null ? "Vazio" : item.lastName}</TableCell>
           <TableCell style={{ minWidth: 170, align: 'left'}}>{item.login == null ? "Vazio" : item.login}</TableCell>
           <TableCell style={{ minWidth: 170, align: 'left'}}>{item.profileName == null ? "Vazio" : item.profileName}</TableCell>
           <TableCell style={{ minWidth: 170, align: 'left'}}>{item.viewers_id == null ? "Vazio" : item.viewers_id}</TableCell>
           <TableCell style={{ minWidth: 170, align: 'left'}}>{item.portals_id == null ? "Vazio" : item.portals_id}</TableCell>
           <TableCell style={{ minWidth: 170, align: 'left'}}>{item.birthday == null ? "Vazio" : item.birthday}</TableCell>
           <TableCell style={{ minWidth: 170, align: 'left'}}>{item.email == null ? "Vazio" : item.email}</TableCell>
           <TableCell style={{ minWidth: 170, align: 'left'}}>{item.phone1 == null ? "Vazio" : item.phone1}</TableCell>
           <TableCell style={{ minWidth: 170, align: 'left'}}>{item.phone2 == null ? "Vazio" : item.phone2}</TableCell>
           <TableCell style={{ minWidth: 170, align: 'left'}}>{item.token == null ? "Vazio" : item.token}</TableCell>
           <TableCell style={{ minWidth: 170, align: 'left'}}>{item.password == null ? "Vazio" : item.password}</TableCell>
           <TableCell style={{ minWidth: 170, align: 'left'}}>{item.pin == null ? "Vazio" : item.pin}</TableCell>
           <TableCell align="right">
              
           </TableCell>
          </TableRow>

        ))}

          
      </TableBody>
      </Table>

     </TableContainer>
      </div>
    </div>
    
    </React.Fragment>
  );
}


