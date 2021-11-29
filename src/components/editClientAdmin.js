import React, { useState, useEffect } from "react";
import './style.css';

import MenuItem from '@mui/material/MenuItem';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '80%',
    margin: 'auto',
  },
  paper: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    outline: 0,
    boxShadow: '0px 0px 20px rgba(220, 220, 220, 1)',
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#FBCF00',
    fontWeight: 'bold',
    "&:hover": {
        background: "rgb(129, 129, 129)",
      },
  },
}));


export default function EditClientAdmin() {
  const classes = useStyles();
  const vendorName = localStorage.getItem("vendorname");
  const client = sessionStorage.getItem("client")
  const tokenH = localStorage.getItem("token");

  
  const [vendor, setVendor] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [login, setLogin] = useState('');
  const [profileName, setProfileName] = useState('');
  const [portals_id, setPortalsId] = useState('');
  //const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([ {
    portalName:'',
    portalId:'', 
}]);






    

  useEffect(() => {
    const vendorName = localStorage.getItem("vendorname");
    const client = sessionStorage.getItem("client")
    const tokenH = localStorage.getItem("token");
    async function getAvailablePortal() {
  
      let resultadoPortal = await fetch("http://10.5.0.53/api/v1/motvCustomer/portals?vendor="+vendorName,  {
          method: 'GET',
          headers: {
              Authorization: tokenH,
          },
  
      });
      resultadoPortal = await resultadoPortal.json();
      //console.log("aqui o content", resultado.response.content);
      //console.log("aqui o item", resultadoPortal);
      await setContent(resultadoPortal.response);
      //resultado = await setContent(resultado.json());
      //console.log("aqui> ", content)
      //console.log("aqui o content name ", resultado.response.content);
      //item = (resultado.response.content)
          
  }

  async function getMotvCustomer() {
    //console.log("olha o vendorname", vendorName)
      let resultado = await fetch("http://10.5.0.53/api/v1/motvCustomer?id="+client+"&vendor="+vendorName, {
          method: 'GET',
          headers: {
              Authorization: tokenH,
          },
  
      });
      resultado = await resultado.json();

      if(resultado.status === 1001) {
        await setName(resultado.response.name)
        await setLastName(resultado.response.lastName)
        await setLogin(resultado.response.login)
        await setProfileName(resultado.response.profileName)
        await setPortalsId(resultado.response.portals_id)
        //await setBirthday(resultado.response.birthday)
        await setEmail(resultado.response.email)
        await setPhone1(resultado.response.phone1)
        await setPhone2(resultado.response.phone2)
        await setPassword(resultado.response.password)
        await setPin(resultado.response.pin)
        //console.log("cliente encontrado!")
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

    getMotvCustomer();
    getAvailablePortal();
  }, [])

const editClient = async e => {
  e.preventDefault();
  setLoading(true);
  let vendor = vendorName
  let viewers_id = client
  let data = {name, lastName, login, profileName, password, viewers_id, portals_id, email, phone1, phone2,  pin}
  let item = {vendor, data}
  console.log(JSON.stringify({item}))

let result = await fetch("http://10.5.0.53/api/v1/motvCustomer", {
                method: 'PUT',
                headers: {
                  Authorization: tokenH,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            });
            result = await result.json();
            if(result.status === 1001 ){
              setError("Cliente Editado com sucesso!")
              sessionStorage.removeItem("client")
              window.location.reload();
            } else if (result.status === 1147) {
              setError("Fornecedor Inválido")
              setLoading(false);
            } else if (result.status === 1015) {
              setError("Este email já está cadastrado!")
              setLoading(false);
            }  else if (result.status === 1415) {
              setError("Email inválido")
              setLoading(false);
            }  else if (result.status === 1600) {
              setError("Nome de Usuário já existe")
              setLoading(false);
            } 
}




  return (
    <React.Fragment>
      <div style={{
          width: '100%', 
          height: '100%', 
          backgroundColor: '#fff', 
          marginTop: '30px', 
            }}>

                
                <form className={classes.form} noValidate onSubmit={editClient}>

                <Grid container component="main" className={classes.root}>
                    <Grid item xs={6} sm={6} md={6} elevation={6} square="true" style={{marginRight: '10px'}}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="text"
                        id="name"
                        value={name}
                        label="Nome"
                        onChange= {e => {
                            setName(e.target.value)
                            setProfileName(e.target.value)
                        }}
                        name="nome"
                        autoComplete="nome"
                        autoFocus
                        
                        />
                        
                    </Grid>

                    <Grid item xs={5} sm={5} md={5} elevation={6} square="true">
                        <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="text"
                        id="lastName"
                        value={lastName}
                        label="Sobrenome"
                        onChange= {e => setLastName(e.target.value)}
                        name="Sobrenome"
                        autoComplete="sobrenome"
                        autoFocus
                        />

                    </Grid>


                </Grid>

                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="text"
                    id="login"
                    value={login}
                    label="Nome de Usuário"
                    onChange= {e => setLogin(e.target.value)}
                    name="login"
                    autoComplete="login"
                    autoFocus
                    />
                
                <Grid container component="main" className={classes.root} >
                  <Grid item xs={8} sm={8} md={8} elevation={8} square="true" style={{marginRight: '10px'}}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  onChange= {e => setPassword(e.target.value)}
                  name="senha"
                  label="Senha"
                  value={password}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  />
                  </Grid>
                
                  <Grid item xs={3} sm={3} md={3} elevation={3} square="true">
                    <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="password"
                    id="pin"
                    value={pin}
                    label="Pin (opcional) "
                    onChange= {e => setPin(e.target.value)}
                    name="pin"
                    autoComplete="pin"
                    autoFocus
                    />
                  </Grid>

                
                  </Grid>

                  <Grid container component="main" className={classes.root}>
                  <Grid item xs={6} sm={6} md={6} elevation={6} square="true">
                  <TextField
                    id="outlined-currency"
                    variant="outlined"
                    disabled
                    margin="normal"
                    type="text"
                    label="Fornecedor"
                    value={vendorName}
                    onChange= {e => setVendor(e.target.value)}
                    >
                  </TextField>
                  </Grid>
                  
                  <Grid item xs={6} sm={6} md={6} elevation={6} square="true">
                  <TextField
                    id="outlined-select-currency"
                    variant="outlined"
                    margin="normal"
                    select
                    label="Portal"
                    type="number"
                    value={portals_id}
                    onChange= {e => setPortalsId(e.target.value)}
                    style={{minWidth: '120px'}}
                    >
                    {content.map((option, w) => (
                      <MenuItem key={w} value={option.portalId}>
                        {option.portalName}
                      </MenuItem>
                    ))}

                  </TextField>
                  </Grid>
                  </Grid>


                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="email"
                  label="Email"
                  onChange= {e => setEmail(e.target.value)}
                  name="email"
                  value={email}
                  autoComplete="email"
                  autoFocus
                  />
                

                <Grid container component="main" className={classes.root} >
                <Grid item xs={6} sm={6} md={6} elevation={6} square="true" style={{marginRight: '10px'}}>
                  <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="text"
                  id="phone1"
                  value={phone1}
                  label="Telefone 1 (opcional)"
                  onChange= {e => setPhone1(e.target.value)}
                  name="phone1"
                  autoComplete="phone1"
                  autoFocus
                  />
                  </Grid>
                
                  <Grid item xs={5} sm={5} md={5} elevation={5} square="true">
                  <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="text"
                  id="phone2"
                  value={phone2}
                  label="Telefone 2 (opcional)"
                  onChange= {e => setPhone2(e.target.value)}
                  name="phone2"
                  autoComplete="phone2"
                  autoFocus
                  />
                  </Grid>
                  </Grid>

                  
                  
                    {error && <div className="error">{error}</div>}

                <Button
                  value={loading ?  "Aguarde..." : "Criar Cliente"}
                  disabled={loading}
                  fullWidth
                  type="submit"
                  variant="contained"
                  style={{
                    color: '#fff',
                    marginTop: '40px',
                  }}
                  className={classes.submit}
                  >
                  Salvar
                </Button>
                
              </form>

           <div style={{width: '85%', height: '1px', backgroundColor: '#E6E6E6', margin: 'auto', marginTop: '6%'}}></div>

    </div>


    
    </React.Fragment>
  );
}


