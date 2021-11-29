import React, { useState } from "react";
import './style.css';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Tooltip from '@mui/material/Tooltip';
import Link from '@material-ui/core/Link';
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



export default function CreateVendorsCard() {
  const tokenH = localStorage.getItem("token");

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState('');
  const [user_token, setUserToken] = useState('');
  const [token, setToken] = useState('');
  const [url, setUrl] = useState('');

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);




  const handleOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);

  };


const createVendor = async e => {
  e.preventDefault();
  setLoading(true);
  let item = {name, user_token, token, url}
  //console.log(JSON.stringify({item}))
  let result = await fetch("http://10.5.0.53/api/v1/vendor", {
                method: 'POST',
                headers: {
                  Authorization: tokenH,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            });
            result = await result.json();
            //console.log("aqui o resultado dos fornecedores", result)
            if(result.status === 1001 ){
              setLoading(false);
              setError("Fornecedor criado com sucesso!");
              window.location.reload();
            } else {
                if(result.status === 1014) {
                  setError("Este fornecedor já existe!");
                } else {
                  if(result.status === 1115) {
                    setError("Dados inválidos, tente novamente.")
                  }
                }
  }
//console.log(result.status)
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
            minWidth: '50px',
            height: '65%', 
            backgroundColor: '#FBCF00',  
            borderRadius: '8px', 
            marginTop: '-40px', 
            marginLeft: '20px', 
            cursor: 'pointer',
            boxShadow: '8px 10px 10px rgba(0, 0, 0, 0.4)'}} className="move">
            <div >
              <Tooltip title="Criar novo Fornecedor" placement="right">
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
            }}>Novo Fornecedor</h2>
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

                    <div style={{width: '15%', height: '90px', minWidth: '90px', maxWidth: '90px', backgroundColor: "#616158", marginTop: '-60px', borderRadius: '10px'}}>
                      <PersonAddIcon style={{ color: '#fff', width: '70%', height: '50%', margin: '12%' }}/>
                    </div>

                    <h2 id="transition-modal-title" style={{marginTop: '5px',}}>Crie um novo fornecedor</h2>
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
                   
                   <form className={classes.form} onSubmit={createVendor} noValidate >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="name"
                  label="Nome do Fornecedor"
                  onChange= {e => setName(e.target.value)}
                  name="nome do fornecedor"
                  autoComplete="nome do fornecedor"
                  autoFocus
                  />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  onChange= {e => setUserToken(e.target.value)}
                  name="user token"
                  label="Usuário SMS"
                  type="text"
                  id="user_token"
                  autoComplete="user token"
                  />

                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="token"
                  label="Token Usuário SMS"
                  onChange= {e => setToken(e.target.value)}
                  name="token"
                  autoComplete="token sms"
                  autoFocus
                  />

                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="url"
                  label="Url Sms (Ex: sms.portal.com.br)"
                  onChange= {e => setUrl(e.target.value)}
                  name="url"
                  autoComplete="url"
                  autoFocus
                  />
                    {error && <div className="error">{error}</div>}

                <Button
                  value={loading ?  "Aguarde..." : "Criar Fornecedor"}
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
                  Criar Fornecedor
                </Button>
                
              </form>


                </div>
                </Fade>
            </Modal>

    
    </div>


    
    </React.Fragment>
  );
}


