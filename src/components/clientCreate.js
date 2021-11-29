import React, { useState, useEffect } from "react";
import './style.css';
import { useHistory } from "react-router";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Tooltip from '@mui/material/Tooltip';
import Link from '@material-ui/core/Link';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@material-ui/core/Grid';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
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



export default function ClientCreate() {
  const tokenH = localStorage.getItem("token");
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
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


  const handleOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);

  };

  useEffect(() => {
    const tokenH = localStorage.getItem("token");
    async function getAvailablePortal() {
      let resultadoPortal = await fetch("http://10.5.0.53/api/v1/motvCustomer/portals",  {
          method: 'GET',
          headers: {
              Authorization: tokenH,
          },
  
      });
      resultadoPortal = await resultadoPortal.json();
      //console.log("aqui o content", resultado.response.content);
      //console.log("aqui o item", resultadoPortal);
      if(resultadoPortal.status === 1001 ){
        await setContent(resultadoPortal.response);

      } else if (resultadoPortal.status === 1027){
        await localStorage.clear();
        await sessionStorage.clear();
        await history.push("/")
      }

      
      //resultado = await setContent(resultado.json());
      //console.log("aqui> ", content)
      //console.log("aqui o content name ", resultado.response.content);
      //item = (resultado.response.content)
          
  }


    getAvailablePortal();
  }, [])

const createClient = async e => {
  
  setLoading(true);
  e.preventDefault();
  let data = {name, lastName, login, profileName, portals_id, email, phone1, phone2, password, pin}
  let item = {data}
  console.log(JSON.stringify({item}))

let result = await fetch("http://10.5.0.53/api/v1/motvCustomer", {
                method: 'POST',
                headers: {
                  Authorization: tokenH,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            });
            result = await result.json();
            if(result.status === 1001 ){
              setError("Cliente Cadastrado com sucesso!")
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
            } else if(result.status === 1027) {
              history.push("/")
            }
}



  return (
    <React.Fragment>
      <div style={{
          width: '100%', 
          height: '65%', 
          backgroundColor: '#fff',  
          borderRadius: '8px', 
          marginTop: '30px', 
          boxShadow: '0px 0px 20px rgba(220, 220, 220, 1)',
            }}>

      <div style={{   
          display: 'flex',
          }}>


        <Link color="primary" onClick={handleOpen} style={{
            width: '21%', 
            height: '65%', 
            backgroundColor: '#FBCF00',  
            borderRadius: '8px', 
            marginTop: '-40px', 
            marginLeft: '20px', 
            cursor: 'pointer',
            boxShadow: '8px 10px 10px rgba(0, 0, 0, 0.4)',
            }} className="move">
            <div >
              <Tooltip title="Criar novo Cliente" placement="right">
                <PersonAddOutlinedIcon style={{ color: '#fff', width: '60%', height: '60%', margin: '20%' }}/>
              </Tooltip>
            </div>
        </Link>
          
            

           <h2 style={{
               fontWeight: 'bold',
               fontSize: '26px',
               margin: 'auto',
               marginTop: '',
               //textShadow: '2px 3px 5px gray',
            }}>Novo Cliente</h2>
      </div>
           <div style={{width: '85%', height: '1px', backgroundColor: '#E6E6E6', margin: 'auto', marginTop: '6%'}}></div>
  
           <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}>
                <Fade in={open}>
                <div className={classes.paper}>

                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between'
                }}>

                    <div style={{width: '20%', height: '80px', backgroundColor: "#616158", marginTop: '-60px', borderRadius: '10px'}}>
                      <PersonAddOutlinedIcon style={{ color: '#fff', width: '60%', height: '50%', margin: '20%' }}/>
                    </div>

                    <h2 id="transition-modal-title" style={{marginTop: '5px',}}>Crie um novo cliente</h2>
                    <button style={{
                        width: '80px',
                        height: '40px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        
                        cursor: 'pointer',
                    }}
                    onClick={handleClose}
                    >   
                        <Tooltip title="Fechar" placement="right-start">
                        <HighlightOffIcon style={{ color: '#616158', width: '100%', height: '100%', }}/>
                        </Tooltip>
                    </button>

                </div>
                   

                   <form className={classes.form} noValidate onSubmit={createClient}>

                <Grid container component="main" className={classes.root}>
                    <Grid item xs={6} sm={6} md={6} elevation={6} square="true" style={{marginRight: '10px'}}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="text"
                        id="name"
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
                        required
                        fullWidth
                        type="text"
                        id="lastName"
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
                    required
                    fullWidth
                    type="text"
                    id="login"
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
                  required
                  fullWidth
                  onChange= {e => setPassword(e.target.value)}
                  name="senha"
                  label="Senha"
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
                  label="Telefone 2 (opcional)"
                  onChange= {e => setPhone2(e.target.value)}
                  name="phone2"
                  autoComplete="phone2"
                  autoFocus
                  />
                  </Grid>
                  </Grid>

                  
                  
                    {error && <div class="error">{error}</div>}

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
                  Criar Cliente
                </Button>
                
              </form>


                </div>
                </Fade>
            </Modal>

    
    </div>


    
    </React.Fragment>
  );
}


