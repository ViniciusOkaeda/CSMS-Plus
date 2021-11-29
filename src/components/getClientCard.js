import React, { useState } from "react";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Link from '@material-ui/core/Link';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@mui/material/Tooltip';
import { useHistory } from "react-router";
import EditClient from './editClient';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@mui/material/TableContainer';
import FormControl from '@mui/material/FormControl';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import Icon from '../assets/loupe.png';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import ClientInformation from "./clientInformation";

const tokenH = localStorage.getItem("token");


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
      borderRadius: '10px',
      boxShadow: '0px 0px 20px rgba(220, 220, 220, 1)',
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

  export default function GetClientCard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    const [open6, setOpen6] = React.useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const [viewerId, setViewerId] = useState('');
    const [id_customer, setIdCustomer] = useState('');
    const [name2, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [login, setLogin] = useState('');
    const [profileName, setProfileName] = useState('');
    const [viewers_id, setViewersId] = useState('');
    const [portals_id, setPortalsId] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [token2, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');
  

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
  
  
  
    const handleOpen = () => {
      setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    sessionStorage.removeItem("client");
    window.location.reload();
  };


  const handleClose2 = () => {
    setOpen2(false);
    sessionStorage.removeItem("client");
    window.location.reload();
  };

  const handleClose3 = () => {
    setOpen3(false);
    sessionStorage.removeItem("client");
    window.location.reload();
  };

  const handleClose4 = () => {
    setOpen4(false);
    sessionStorage.removeItem("client");
    window.location.reload();
  };

  const handleClose5 = () => {
    setOpen5(false);
    sessionStorage.removeItem("client");
    window.location.reload();
  };

  const handleClose6 = () => {
    setOpen6(false);
    sessionStorage.removeItem("client");
    window.location.reload();
  };


  async function getMotvCustomer() {
    //console.log("olha o vendorname", vendor_Name)
    if(viewerId !== '') {
      let resultado = await fetch("http://10.5.0.53/api/v1/motvCustomer?id="+viewerId, {
          method: 'GET',
          headers: {
              Authorization: tokenH,
          },
  
      });
      resultado = await resultado.json();

      if(resultado.status === 1001) {
        await setIdCustomer(resultado.response.id_customer);
        await setName(resultado.response.name2);
        await setLastName(resultado.response.lastName);
        await setLogin(resultado.response.login);
        await setProfileName(resultado.response.profileName);
        await setViewersId(resultado.response.viewers_id);
        await setPortalsId(resultado.response.portals_id);
        await setBirthday(resultado.response.birthday);
        await setEmail(resultado.response.email);
        await setPhone1(resultado.response.phone1);
        await setPhone2(resultado.response.phone2);
        await setToken(resultado.response.token2);
        await setPassword(resultado.response.password);
        await setPin(resultado.response.pin);
        await setError("Cliente Encontrado!");
      } else if(resultado.status === 1600) {
        setError("Cliente não existe, ou não possui device")
      } else if(resultado.status === 1027) {
        await localStorage.clear();
        await sessionStorage.clear();
        await history.push("/")
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

async function searchCustomer() {
  if(loginSearch !== '') {
    let search = loginSearch
    let item = {search}
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
      //console.log("aqui está os clientes:", resultado)
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
            height: '65%', 
            backgroundColor: '#fff',  
            borderRadius: '8px', 
            marginTop: '30px', 
            boxShadow: '0px 0px 20px rgba(220, 220, 220, 1)',
              }}>
  
        <div style={{   
            display: 'flex',
            width: '100%',
            
            }}>
  
  
          <Link color="primary"  onClick={handleOpen} style={{
              width: '21%', 
              height: '55%', 
              backgroundColor: '#616158',  
              borderRadius: '8px', 
              marginTop: '-40px',
              cursor: 'pointer', 
              marginLeft: '20px', 
              boxShadow: '8px 10px 10px rgba(0, 0, 0, 0.4)'}} className="move">
              <div >
                <Tooltip title="Buscar Clientes" placement="right">
                <SearchOutlinedIcon style={{ color: '#fff', width: '60%', height: '60%', margin: '20%' }}/>
                </Tooltip>
              </div>
          </Link>
              
             <h2 style={{
                 fontWeight: 'bold',
                 fontSize: '26px',
                 margin: 'auto',
                 marginTop: '',
                 //textShadow: '2px 3px 5px gray',
              }}>Buscar Cliente</h2>
        </div>
             <div style={{width: '85%', height: '1px', backgroundColor: '#E6E6E6', margin: 'auto', marginTop: '6%'}}></div>
              
  
  
                      {/*Escolher Ações Disponíveis */}
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
                      <div style={{width: '20%', height: '90px', minWidth: '90px', maxWidth: '90px', backgroundColor: "#616158", marginTop: '-60px', borderRadius: '10px',}}>
                        <EditIcon style={{ color: '#fff', width: '60%', height: '50%', margin: '20%' }}/>
                      </div>
                      

                        <h2 style={{marginTop: '5px'}}>Clientes</h2>



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
                     {/*Aqui é a parte que renderiza a busca dos clientes pelo id*/}
                     
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>

                      <h1 style={{textAlign: 'center', textShadow: '2px 5px 6px rgba(97,97,88, 0.7)', fontWeight: 'bold', fontSize: '28px', margin: 'auto 0 20px 0', color: '#000000'}}>Ações Disponíveis:</h1>


                      
                      <button className="raise2" onClick={() => {
                          setOpen(false);
                          setOpen3(true);
                        }}>
                        <div style={{display: 'flex', justifyContent: 'space-between', margin: 'auto 10px', fontWeight: 'bold'}}>
                            <h2 style={{textShadow: '2px 5px 6px black', fontWeight: 'bold', fontSize: '28px', margin: 'auto 10px auto 0', color: '#fff'}} >Buscar Cliente Por ID  </h2>
                            <div style={{width: '40px', height: '40px', borderRadius: '10px', marginTop: 'auto', marginBottom: 'auto', borderColor: '#fff', borderStyle: 'solid'}}>
                            <SearchOutlinedIcon style={{ color: '#fff', width: '80%', height: '80%', margin: '10%' }}/>
                        </div>
                          </div>
                      </button>

                      <button className="raise" style={{margin: '10px 0'}} onClick={() => {
                          setOpen(false);
                          setOpen4(true);
                        }}>
                        <div style={{display: 'flex', justifyContent: 'space-between', margin: 'auto 10px', fontWeight: 'bold',}}>

                            <h2 style={{textShadow: '2px 5px 6px black', fontWeight: 'bold', fontSize: '28px', margin: 'auto 0', color: '#fff'}} >Buscar Clientes</h2>
                            <div style={{width: '40px', height: '40px', borderRadius: '10px', marginTop: 'auto', marginBottom: 'auto', borderColor: '#fff', borderStyle: 'solid'}}>
                            <SearchOutlinedIcon style={{ color: '#fff', width: '80%', height: '80%', margin: '10%' }}/>
                        </div>
                          </div>
                      </button>
                    </div>

                  </div>
                  </Fade>
              </Modal>
  

                      {/* Buscar Clientes por ID */}
              <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open3}
                  onClose={handleClose3}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                  timeout: 500,
                  }}>
                  <Fade in={open3}>

                  <div className={classes.paper}>
  
                  <div style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between'
                  }}>
                      <div style={{width: '20%', height: '90px', minWidth: '90px', maxWidth: '90px', backgroundColor: "#616158", marginTop: '-70px', borderRadius: '10px'}}>
                        <EditIcon style={{ color: '#fff', width: '60%', height: '50%', margin: '20%' }}/>
                      </div>

                        <Tooltip title="Voltar" placement="right">
                        <Link  onClick={() => {
                          setOpen(true);
                          setError(null);
                          setOpen3(false);
                        }} >
                        <ArrowBackIcon style={{
                          color: '#616158',
                          margin: 'auto',
                          marginTop: '5px',
                          width: 30,
                          height: 30,
                          cursor: 'pointer',
                          borderStyle: 'solid',
                          borderRadius: 30,
                        }}/>
                        </Link> 
                        </Tooltip>
  
                      

                        <h2 style={{marginTop: '5px'}}>Meus Clientes</h2>



                      <button style={{
                          width: '80px',
                          height: '40px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          
                          cursor: 'pointer',
                      }}
                      onClick={handleClose3}
                      >   
                          <Tooltip title="Fechar" placement="right-start">
                          <HighlightOffIcon style={{ color: '#616158', width: '100%', height: '100%', }}/>
                          </Tooltip>
                      </button>
                  </div>
                     {/*Aqui é a parte que renderiza a busca dos clientes pelo id*/} 
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
                  placeholder="Pesquise um Cliente pelo ID"
                  style={{
                    width: '100%', 
                    height: '40px', 
                    borderColor: 'transparent', 

                    paddingLeft: '40px',
                    outline: '0px',
                    borderTopLeftRadius: '30px',
                    borderBottomLeftRadius: '30px',
                  }}
                  onChange={ (event) => {setViewerId(event.target.value)}}
                  /> 

                  <Button onClick={getMotvCustomer} className="inputSearch2" style={{
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
                  {error && <div className="error" style={{width: '300px', textAlign: 'center', margin: '15px auto', marginBottom: '10px'}}>{error}</div>}
                <FormControl variant="standard">

                    </FormControl>
                    </Box>

      <div style={{width: '90%', height: '1px', backgroundColor: '#E6E6E6', margin: 'auto', marginTop: '2%'}}></div>
            
      <div className={classes.paper}>


{/*Aqui era o Orders */}
 {/* <h2 style={{margin: 'auto', marginLeft: '10px', marginBottom: '20px'}}>Buscar Usuários</h2>*/}

 <TableContainer sx={{ maxHeight: 640, maxWidth: 540 }}>
   <Table >
     <TableHead>
       <TableRow>
         <TableCell id="new" style={{ minWidth: 170, textAlign: 'left'}}>Id Cliente</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Nome</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Sobrenome</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Login</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Nome do Perfil</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Id de Visualização</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Id do Portal</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Nascimento</TableCell>
         <TableCell style={{ minWidth: 200, textAlign: 'left'}}>Email</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Tel 1</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Tel 2</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Token</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Senha</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Pin</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Ações</TableCell>
       </TableRow>
     </TableHead>
     </Table>
 

     <Table style={{marginBottom: '30px'}}>
      <TableBody>
        <TableRow >
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{id_customer == null || id_customer === "" ? "Vazio" : id_customer}</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{name2 == null || name2 === "" ? "Vazio" : name2}</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{lastName == null || lastName === "" ? "Vazio" : lastName}</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{login == null || login === "" ? "Vazio" : login}</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{profileName == null || profileName === "" ? "Vazio" : profileName}</TableCell>
         <TableCell style={{ minWidth: 170, atextAlign: 'left'}}>{viewers_id == null || viewers_id === "" ? "Vazio" : viewers_id}</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{portals_id == null || portals_id === "" ? "Vazio" : portals_id}</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{birthday == null || birthday === "" ? "Vazio" : birthday}</TableCell>
         <TableCell style={{ minWidth: 200, textAlign: 'left'}}>{email == null || email === "" ? "Vazio" : email}</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{phone1 == null || phone1 === ""  ? "Vazio" : phone1}</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{phone2 == null || phone2 === "" ? "Vazio" : phone2}</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{token2 == null || token2 === "" ? "Vazio" : token2}</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{password == null ? "Vazio" : password}</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{pin == null || pin === "" ? "Vazio" : pin}</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>

          {id_customer === "" ? 
          ""
          :
          <div style={{display: 'flex', alignItems: 'space-around',}}>
          <Fab  aria-label="edit" style={{width: '30%', minWidth: '35px', height: '30%', margin: 'auto'}} className={classes.submit}> 
          <Tooltip title="Editar Cliente" placement="top-start">
          <Link  onClick={() => {
            setOpen3(false);
            setOpen5(true);
            sessionStorage.setItem("client", viewerId)
            }}>
          <EditIcon style={{
            color: '#FFF',
          }}/>
          </Link> 
          </Tooltip>
          </Fab>

          <Fab  aria-label="edit" style={{width: '30%', minWidth: '35px', height: '30%', margin: 'auto'}} className={classes.submit}> 
          <Tooltip title="Painel do Cliente" placement="top-start">
          <Link  onClick={() => {
            sessionStorage.setItem("client", viewerId)
            setOpen3(false);
            setOpen6(true);
            }}>
          <AssignmentLateOutlinedIcon style={{
            color: '#FFF',
            marginTop: '5px'
            }}/>
          </Link> 
          </Tooltip>
          </Fab>
          </div>
          }
           



        </TableCell>
        </TableRow>

      
      </TableBody>
      </Table>

     </TableContainer>

                </div>

                  </div>
                  </div>
                  </Fade>
              </Modal>

                      {/*Criar clientes - clientCreateAdmin */}
              <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open2}
                  onClose={handleClose2}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                  timeout: 500,
                  }}>
                  <Fade in={open2}>
                  <div className={classes.paper}>
  
                  <div style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between'
                  }}>
                      <div style={{width: '20%', height: '90px', minWidth: '90px', maxWidth: '90px', backgroundColor: "#616158", marginTop: '-70px', borderRadius: '10px'}}>
                        <EditIcon style={{ color: '#fff', width: '60%', height: '50%', margin: '20%' }}/>
                      </div>

                        <Tooltip title="Voltar" placement="right">
                        <Link  onClick={() => {
                          setOpen(true);
                          setOpen2(false);
                        }} >
                        <ArrowBackIcon style={{
                          color: '#616158',
                          margin: 'auto',
                          marginTop: '5px',
                          width: 30,
                          height: 30,
                          cursor: 'pointer',
                          borderStyle: 'solid',
                          borderRadius: 30,
                        }}/>
                        </Link> 
                        </Tooltip>
  
                      

                        <h2 style={{marginTop: '5px'}}>Novo Cliente</h2>



                      <button style={{
                          width: '80px',
                          height: '40px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          
                          cursor: 'pointer',
                      }}
                      onClick={handleClose2}
                      >   
                          <Tooltip title="Fechar" placement="right-start">
                          <HighlightOffIcon style={{ color: '#616158', width: '100%', height: '100%', }}/>
                          </Tooltip>
                      </button>
                  </div>
                     {/*Aqui é a parte que renderiza a busca dos clientes pelo id <ClientCreateAdmin /> */} 
                      

                  </div>
                  </Fade>
              </Modal>

                    {/*Buscar Clientes por Nome de Usuário */}
              <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open4}
                  onClose={handleClose4}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                  timeout: 500,
                  }}>
                  <Fade in={open4}>
                  <div className={classes.paper}>
  
                  <div style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between'
                  }}>
                      <div style={{width: '20%', height: '90px', minWidth: '90px', maxWidth: '90px', backgroundColor: "#616158", marginTop: '-70px', borderRadius: '10px'}}>
                        <EditIcon style={{ color: '#fff', width: '60%', height: '50%', margin: '20%' }}/>
                      </div>

                        <Tooltip title="Voltar" placement="right">
                        <Link  onClick={() => {
                          setOpen(true);
                          setError(null);
                          setOpen4(false);
                        }} >
                        <ArrowBackIcon style={{
                          color: '#616158',
                          margin: 'auto',
                          marginTop: '5px',
                          width: 30,
                          height: 30,
                          cursor: 'pointer',
                          borderStyle: 'solid',
                          borderRadius: 30,
                        }}/>
                        </Link> 
                        </Tooltip>
  
                      

                        <h2 style={{marginTop: '5px'}}>Meus Clientes</h2>



                      <button style={{
                          width: '80px',
                          height: '40px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          
                          cursor: 'pointer',
                      }}
                      onClick={handleClose4}
                      >   
                          <Tooltip title="Fechar" placement="right-start">
                          <HighlightOffIcon style={{ color: '#616158', width: '100%', height: '100%', }}/>
                          </Tooltip>
                      </button>
                  </div>
                     {/*Aqui é a parte que renderiza a busca todos clientes pelo usuario*/} 
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
                  {error && <div className="error" style={{width: '300px', textAlign: 'center', margin: '15px auto', marginBottom: '10px'}}>{error}</div>}
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
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Id Cliente</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Nome</TableCell>
         <TableCell style={{ minWidth: 170, atextAlign: 'left'}}>Sobrenome</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Login</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Nome do Perfil</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Id de Visualização</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Id do Portal</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Nascimento</TableCell>
         <TableCell style={{ minWidth: 200, textAlign: 'left'}}>Email</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Tel 1</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Tel 2</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Token</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Senha</TableCell>
         <TableCell style={{ minWidth: 170, textAlign: 'left'}}>Pin</TableCell>
         <TableCell align="right">Ações</TableCell>
       </TableRow>
     </TableHead>
     </Table>
 

     <Table style={{marginBottom: '30px'}}>
      <TableBody>{
        clientSubscription.map((item) => (
          <TableRow key={item.id_customer}> 
           <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{item.id_customer == null || item.customer === "" ? "Vazio" : item.id_customer}</TableCell>
           <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{item.name == null || item.name === "" ? "Vazio" : item.name}</TableCell>
           <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{item.lastName == null || item.lastName === "" ? "Vazio" : item.lastName}</TableCell>
           <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{item.login == null || item.login === "" ? "Vazio" : item.login}</TableCell>
           <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{item.profileName == null || item.profileName === "" ? "Vazio" : item.profileName}</TableCell>
           <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{item.viewers_id == null || item.viewers_id === "" ? "Vazio" : item.viewers_id}</TableCell>
           <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{item.portals_id == null || item.portals_id === "" ? "Vazio" : item.portals_id}</TableCell>
           <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{item.birthday == null || item.birthday === "" ? "Vazio" : item.birthday}</TableCell>
           <TableCell style={{ minWidth: 200, textAlign: 'left'}}>{item.email == null || item.email === "" ? "Vazio" : item.email}</TableCell>
           <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{item.phone1 == null || item.phone1 === "" ? "Vazio" : item.phone1}</TableCell>
           <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{item.phone2 == null || item.phone2 === "" ? "Vazio" : item.phone2}</TableCell>
           <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{item.token == null || item.token === "" ? "Vazio" : item.token}</TableCell>
           <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{item.password == null || item.password === "" ? "Vazio" : item.password}</TableCell>
           <TableCell style={{ minWidth: 170, textAlign: 'left'}}>{item.pin == null || item.pin === "" ? "Vazio" : item.pin}</TableCell>
           <TableCell style={{ minWidth: 170, textAlign: 'left'}}>
           {item.id_customer === "" ? 
          ""
          :
          <div style={{display: 'flex', alignItems: 'space-around'}}>
          <Fab  aria-label="edit" style={{width: '30%', minWidth: '35px', height: '30%', margin: 'auto'}} className={classes.submit}> 
          <Tooltip title="Editar Cliente" placement="top-start">
          <Link  onClick={() => {
            setOpen4(false);
            setOpen5(true);
            sessionStorage.setItem("client", item.viewers_id)
            }}>
          <EditIcon style={{
            color: '#FFF',
          }}/>
          </Link> 
          </Tooltip>
          </Fab>

          <Fab  aria-label="edit" style={{width: '30%', minWidth: '35px', height: '30%', margin: 'auto'}} className={classes.submit}> 
          <Tooltip title="Painel do Cliente" placement="top-start">
          <Link  onClick={() => {
            sessionStorage.setItem("client", item.viewers_id)
            setOpen4(false);
            setOpen6(true);
            }}>
          <AssignmentLateOutlinedIcon style={{
            color: '#FFF',
            marginTop: '5px'
            }}/>
          </Link> 
          </Tooltip>
          </Fab>
          </div>
          }
           </TableCell>
          </TableRow>

        ))}

          
      </TableBody>
      </Table>

     </TableContainer>
      </div>
    </div>

                  </div>
                  </Fade>
              </Modal>
  
                        {/*Editar clientes - editClientAdmin */}
              <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open5}
                  onClose={handleClose5}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                  timeout: 500,
                  }}>
                  <Fade in={open5}>
                  <div className={classes.paper}>
  
                  <div style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between'
                  }}>
                      <div style={{width: '20%', height: '90px', minWidth: '90px', maxWidth: '90px', backgroundColor: "#616158", marginTop: '-70px', borderRadius: '10px'}}>
                        <EditIcon style={{ color: '#fff', width: '60%', height: '50%', margin: '20%' }}/>
                      </div>

                        <Tooltip title="Voltar" placement="right">
                        <Link  onClick={() => {
                          sessionStorage.removeItem("client")
                          setOpen(true);
                          setOpen5(false);
                        }} >
                        <ArrowBackIcon style={{
                          color: '#616158',
                          margin: 'auto',
                          marginTop: '5px',
                          width: 30,
                          height: 30,
                          cursor: 'pointer',
                          borderStyle: 'solid',
                          borderRadius: 30,
                        }}/>
                        </Link> 
                        </Tooltip>
  
                      

                        <h2 style={{marginTop: '5px'}}>Editar Cliente</h2>



                      <button style={{
                          width: '80px',
                          height: '40px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          
                          cursor: 'pointer',
                      }}
                      onClick={handleClose5}
                      >   
                          <Tooltip title="Fechar" placement="right-start">
                          <HighlightOffIcon style={{ color: '#616158', width: '100%', height: '100%', }}/>
                          </Tooltip>
                      </button>
                  </div>
                     {/*Aqui é a parte que renderiza a edição dos clientes pelo id  */} 
                     <EditClient />

                  </div>
                  </Fade>
              </Modal>

                      {/*Informações do cliente - clientInformation */}
              <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open6}
                  onClose={handleClose6}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                  timeout: 500,
                  }}>
                  <Fade in={open6}>
                  <div className={classes.paper}>
  
                  <div style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between'
                  }}>
                      <div style={{width: '20%', height: '90px', minWidth: '90px', maxWidth: '90px', backgroundColor: "#616158", marginTop: '-70px', borderRadius: '10px'}}>
                        <AssignmentLateOutlinedIcon style={{ color: '#fff', width: '60%', height: '50%', margin: '20%' }}/>
                      </div>

                        <Tooltip title="Voltar" placement="right">
                        <Link  onClick={() => {
                          setOpen(true);
                          setOpen6(false);
                          sessionStorage.removeItem("client")
                        }} >
                        <ArrowBackIcon style={{
                          color: '#616158',
                          margin: 'auto',
                          marginTop: '5px',
                          width: 30,
                          height: 30,
                          cursor: 'pointer',
                          borderStyle: 'solid',
                          borderRadius: 30,
                        }}/>
                        </Link> 
                        </Tooltip>
  
                      

                        <h2 style={{marginTop: '5px'}}>Meu Cliente</h2>



                      <button style={{
                          width: '80px',
                          height: '40px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          
                          cursor: 'pointer',
                      }}
                      onClick={handleClose6}
                      >   
                          <Tooltip title="Fechar" placement="right-start">
                          <HighlightOffIcon style={{ color: '#616158', width: '100%', height: '100%', }}/>
                          </Tooltip>
                      </button>
                  </div>
                     {/*Aqui é a parte que renderiza a busca dos clientes pelo id */} 
                     <ClientInformation />

                  </div>
                  </Fade>
              </Modal>

      </div>
      
      </React.Fragment>
    );
  }
  
  
  