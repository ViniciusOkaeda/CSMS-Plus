import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';




const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
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


export default function EditVendorsTable() {
  const tokenH = localStorage.getItem("token");

  const id_vendor = parseInt(localStorage.getItem("vendorid"));
  const classes = useStyles();
  const [user_token, setUserToken] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [url, setUrl] = useState('');

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })



  useEffect(() => {

    const getVendorsById = async () => {

      let resultadovendor = await fetch("http://10.5.0.53/api/v1/vendor/id?id=" + id_vendor, {
          method: 'GET',
          headers: {
              Authorization: tokenH,
          },
  
      });
      resultadovendor = await resultadovendor.json();
      await setName(resultadovendor.response.name);
      await setUserToken(resultadovendor.response.user_token);
      await setToken(resultadovendor.response.token);
      await setUrl(resultadovendor.response.url);
      //console.log("aqui o content", resultado.response.content);
      //console.log("aqui o user", resultadovendor.response.name);      
  }

    getVendorsById();
  }, [id_vendor, tokenH])


  const editVendor = async e => {
      e.preventDefault();
      let item = { id_vendor, name, user_token, token, url};
      console.log(JSON.stringify({item}))
      await fetch("http://10.5.0.53/api/v1/vendor", {
        method: 'PUT',
        headers: {
          Authorization: tokenH,
          'Content-Type': 'application/json',

      },
      body: JSON.stringify(item)
      }).then((response) => response.json())
        .then((resultadovendor) => {
          console.log(resultadovendor);
          if(resultadovendor.error){
            setStatus({
              type: 'error',
              mensagem: 'nada'
            });
          }else{
            setStatus({
              type: 'sucess',
              mensagem: 'Fornecedor Editado com sucesso!'
            });
            window.location.reload();
            localStorage.removeItem('vendorid')
          }
        }).catch(() => {
          setStatus({
            type: 'error',
            mensagem: 'Fornecedor não editado, tente novamente!'
          });
        })
      }

  return (
    <div>
      {status.type === 'erro' ? <p>{status.mensagem}</p> : ""}
      {status.type === 'sucess' ? <p>{status.mensagem}</p> : ""}
      <form className={classes.form} onSubmit={editVendor} >
                
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="component-outlined" >Nome do Fornecedor</InputLabel>
                        <OutlinedInput
                        id="component-outlined"
                        value={name}
                        label="Nome de Usuário (opcional)"
                        onChange={e => setName(e.target.value)}
                        fullWidth
                        />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="component-outlined" >Usuário do Token</InputLabel>
                        <OutlinedInput
                        id="component-outlined"
                        value={user_token}
                        type="text"
                        label="Nova Usuário do Token (opcional)"
                        onChange={e => setUserToken(e.target.value)}
                        fullWidth
                        />
                </FormControl>
                
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="component-outlined" >Token</InputLabel>
                        <OutlinedInput
                        id="component-outlined"
                        variant="outlined"
                        select
                        label="Token"
                        type="text"
                        value={token}
                        style={{marginRight: '30px'}}
                        onChange= {e => setToken(e.target.value)}
                        fullWidth
                        />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="component-outlined" >Url</InputLabel>
                        <OutlinedInput
                            id="outlined-select-currency"
                            variant="outlined"
                            select
                            label="Url (opcional)"
                            type="text"
                            value={url}
                            onChange= {e => setUrl(e.target.value)}
                            style={{marginRight: '10px'}}
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