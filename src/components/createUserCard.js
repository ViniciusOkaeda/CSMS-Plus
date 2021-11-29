import React, { useState, useEffect } from "react";
import './style.css';
import { useHistory } from "react-router";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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
        background: "rgb(129, 129, 129)"
      },
  },
}));

const currencies = [
  {
    label: 1,
    nome: 'Administrador',
  },
  {
    label: 0,
    nome: 'Usuário Comum',
  },
];


export default function CreateUserCard() {
  const token = localStorage.getItem("token");
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
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
        await setContent(resultado.response.content);
        

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


    getVendors();

  }, [])

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [vendor, setVendor] = useState('');
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([ {
    name:'', 
}]);






  const handleOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);

  };



const createUser = async e => {
  setLoading(true);
  e.preventDefault();
  let item = {username, password, vendor, profile, name}
  //console.log(JSON.stringify({item}))
  let result = await fetch("http://10.5.0.53/api/v1/user", {
                method: 'POST',
                headers: {
                  Authorization: token,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            });
            result = await result.json();
            if(result.status === 1001 ){
              setLoading(false);
              setError("Usuário criado com sucesso!");
              window.location.reload();
            } else {
              if(result.status === 1115 ) {
                setError("Preencha todos os campos corretamente!");
                setLoading(false);
              } else {
                if(result.status === 1014 ) {
                  setError("Este usuário já existe.");
                  setLoading(false);
                }
              }
              
  }}

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
            minWidth: '50px', 
            height: '65%', 
            backgroundColor: '#FBCF00',  
            borderRadius: '8px', 
            marginTop: '-40px', 
            marginLeft: '20px', 
            cursor: 'pointer',
            boxShadow: '8px 10px 10px rgba(0, 0, 0, 0.4)'}} className="move">
            <div >
              <Tooltip title="Criar novo Usuário" placement="right">
                <PersonAddIcon style={{ color: '#fff', width: '60%', height: '60%', margin: '20%' }}/>
              </Tooltip>
            </div>
        </Link>
          
            

           <h2 style={{
               fontWeight: 'bold',
               fontSize: '26px',
               margin: 'auto',
               marginTop: '',
               //textShadow: '2px 3px 5px gray',
            }}>Criar Usuário</h2>
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
                      <PersonAddIcon style={{ color: '#fff', width: '60%', height: '50%', margin: '20%' }}/>
                    </div>

                    <h2 id="transition-modal-title" style={{marginTop: '5px',}}>Crie um novo usuário</h2>
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
                   

                   <form className={classes.form} onSubmit={createUser} noValidate >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="username"
                  label="Usuário"
                  onChange= {e => setUsername(e.target.value)}
                  name="usuário"
                  autoComplete="usuario"
                  autoFocus
                  />

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

                  <Grid container component="main" className={classes.root}>
                  <Grid item xs={6} sm={6} md={6} elevation={6} square="true">
                  <TextField
                    id="outlined-select-currency"
                    variant="outlined"
                    margin="normal"
                    required
                    select
                    type="text"
                    label="Vendor"
                    value={vendor}
                    onChange= {e => setVendor(e.target.value)}
                    helperText="Selecione o seu Vendor"
                    >
                    {content.map((option, w) => (
                      <MenuItem key={w} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  </Grid>
                  
                  <Grid item xs={6} sm={6} md={6} elevation={6} square="true">
                  <TextField
                    id="outlined-select-currency"
                    variant="outlined"
                    margin="normal"
                    required
                    select
                    label="Perfil"
                    type="number"
                    value={profile}
                    onChange= {e => setProfile(e.target.value)}
                    helperText="Selecione o tipo de Perfil"
                    >
                    {currencies.map((option, i) => (
                      <MenuItem key={i} value={option.label}>
                        {option.nome}
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
                  id="fullName"
                  label="Nome e Sobrenome"
                  onChange= {e => setName(e.target.value)}
                  name="fullName"
                  autoComplete="fullName"
                  autoFocus
                  />
                  
                    {error && <div className="error">{error}</div>}

                <Button
                  value={loading ?  "Aguarde..." : "Criar Usuário"}
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
                  Criar Usuário
                </Button>
                
              </form>

                </div>
                </Fade>
            </Modal>

    
    </div>


    
    </React.Fragment>
  );
}


