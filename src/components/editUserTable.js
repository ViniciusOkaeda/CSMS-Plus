import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import Button from '@material-ui/core/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@material-ui/core/TextField';



const currencies = [
    {
      label: 1,
      type: 'Administrador',
    },
    {
      label: 0,
      type: 'Usuário Comum',
    },
  ];

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    maxWidth: '450px',
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

export default function EditUserTable() {
  const token = localStorage.getItem("token");
  const id_user = parseInt(localStorage.getItem("usuarioid"));
  const history = useHistory();
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');
  const [vendor, setVendor] = useState('');
  const [content, setContent] = useState([ {
    name:'', 
    }]);

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })



  useEffect(() => {
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

    const getUsersById = async () => {

      let resultadouser = await fetch("http://10.5.0.53/api/v1/user/id?id=" + id_user, {
          method: 'GET',
          headers: {
              Authorization: token,
          },
  
      });
      resultadouser = await resultadouser.json();
      
      if(resultadouser.status === 1001 ){
        await setUsername(resultadouser.response.username);
        await setProfile(resultadouser.response.profile);
        await setPassword(resultadouser.response.password);
        await setName(resultadouser.response.name);
        await setVendor(resultadouser.response.vendorTable.name);

      } else if (resultadouser.status === 1027){
        await localStorage.clear();
        await sessionStorage.clear();
        await history.push("/")
      }
      //console.log("aqui o content", resultado.response.content);
      //console.log("aqui o user", resultadouser.response.vendorTable.name);      
  }


    getUsersById();
    getVendors();
  }, [token, id_user])


  const editUser = async e => {
      e.preventDefault();
      let item = { id_user, username, profile, name, vendor, password};
      console.log(JSON.stringify({item}))
      await fetch("http://10.5.0.53/api/v1/user", {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',

      },
      body: JSON.stringify(item)
      }).then((response) => response.json())
        .then((resultadouser) => {
          console.log(resultadouser);
          if(resultadouser.error){
            setStatus({
              type: 'error',
              mensagem: 'nada'
            });
          }else{
            setStatus({
              type: 'sucess',
              mensagem: 'Usuário Editado com sucesso!'
            });
            window.location.reload();
            localStorage.removeItem('usuarioid')
          }
        }).catch(() => {
          setStatus({
            type: 'error',
            mensagem: 'Usuario não editado, tente novamente!'
          });
        })
      }

    



  return (
    <div>
      {status.type === 'erro' ? <p>{status.mensagem}</p> : ""}
      {status.type === 'sucess' ? <p>{status.mensagem}</p> : ""}
      <form className={classes.form} onSubmit={editUser} >
                
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="component-outlined" >Nome de Usuário</InputLabel>
                        <OutlinedInput
                        
                        value={username}
                        label="Nome de Usuário"
                        onChange={e => setUsername(e.target.value)}
                        autoComplete="username"
                        required
                        fullWidth
                        />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="component-outlined" >Nova Senha (opcional)</InputLabel>
                        <OutlinedInput
                        
                        type="password"
                        label="Nova Senha (opcional)"
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                        fullWidth
                        />
                </FormControl>

                <TextField
                    id="outlined-select-currency"
                    variant="outlined"
                    margin="normal"
                    select
                    label="Perfil"
                    type="number"
                    value={profile}
                    style={{marginRight: '30px'}}
                    onChange= {e => setProfile(e.target.value)}
                    helperText="Selecione o tipo de Perfil (opcional)"
                    >
                    {currencies.map((option, i) => (
                      <MenuItem key={i} value={option.label}>
                        {option.type}
                      </MenuItem>
                    ))}
                  </TextField>

                
                <TextField
                    id="outlined-select-currency"
                    variant="outlined"
                    margin="normal"
                    select
                    type="text"
                    label="Vendor"
                    value={vendor}
                    onChange= {e => setVendor(e.target.value)}
                    helperText="Selecione o seu Vendor (opcional)"
                    >
                    {content.map((option, w) => (
                      <MenuItem key={w} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="component-outlined">Nome e Sobrenome</InputLabel>
                        <OutlinedInput
                        id="component-outlined"
                        value={name}
                        label="Nome e Sobrenome"
                        onChange={e => setName(e.target.value)}
                        
                        required
                        fullWidth
                        />
                </FormControl>

                    
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  type="submit"
                  className={classes.submit}
                  >
                  Salvar
                </Button>
                
              </form>

    </div>
  );
}