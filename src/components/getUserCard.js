import React, { useState } from "react";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Link from '@material-ui/core/Link';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './style.css';
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@mui/material/Tooltip';
import EditUserTable from './editUserTable';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Icon from '../assets/loupe.png';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';





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

const token = localStorage.getItem("token");

export default function GetUserCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const [content, setContent] = useState([ {

    name:'', 
    username:'', 
    id_user: '', 
    vendorTable: {
      name: '',
      url: '',
    }}]);

    

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
    window.location.reload();
  };


  const handleClose2 = () => {
    setOpen2(false);
    localStorage.removeItem("usuarioid");
    window.location.reload();
  };


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
      await setContent(resultado.response.content);
      setError("Usuário Encontrado!")

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
            minWidth: '50px',
            height: '55%', 
            backgroundColor: '#616158',  
            borderRadius: '8px', 
            marginTop: '-40px',
            cursor: 'pointer', 
            marginLeft: '20px', 
            boxShadow: '8px 10px 10px rgba(0, 0, 0, 0.4)'}} className="move">
            <div >
              <Tooltip title="Buscar Usuários" placement="right">
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
            }}>Buscar Usuários</h2>
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
                    <div style={{width: '15%', height: '90px', minWidth: '90px', maxWidth: '90px', backgroundColor: "#FBCF00", marginTop: '-60px', borderRadius: '10px'}} >
                      <SearchOutlinedIcon style={{ color: '#fff', width: '70%', height: '60%', margin: '15%' }}/>
                    </div>

                  <h2 style={{fontWeight: 'bold', fontSize: '28px',}}>Buscar Usuários</h2>                  
                    
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



                   {/*Aqui era o Orders */}
                   <Box component="form" noValidate sx={{ mt: 1 }}>
                  <div  style={{display: 'flex', width: '80%', height: '40px', borderRadius: '30px', backgroundColor: '#fff', boxShadow: '0px 0px 15px rgba(220, 220, 220, 1)', margin: '20px auto',}}>
                  <input 
                  className="inputSearch"
                  id="input" 
                  type="text" 
                  autoComplete="off" 
                  placeholder="Pesquisar usuário pelo nome"
                  style={{
                    width: '100%', 
                    height: '40px', 
                    borderColor: 'transparent', 

                    paddingLeft: '40px',
                    outline: '0px',
                    borderTopLeftRadius: '30px',
                    borderBottomLeftRadius: '30px',
                  }}
                  onChange={ (event) => {setSearch(event.target.value)}}
                  /> 

                  <Button onClick={getUsers} className="inputSearch2" style={{
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
                    <TableContainer sx={{ maxHeight: 440, maxWidth: 540 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Usuário</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Vendor</TableCell>
                            <TableCell>Url Vendor</TableCell>
                            <TableCell align="right">Ações</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>

                          {content
                              .filter((item) =>{
                                if(search === "") {
                                  return item
                                } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
                                  return item
                                }
                              })
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((item) => (
                            <TableRow key={item.id_user}>
                              <TableCell>{item.username}</TableCell>
                              <TableCell><p>{item.name}</p></TableCell>
                              <TableCell><p>{item.vendorTable.name}</p></TableCell>
                              <TableCell><p><a target="_blank" rel="noreferrer" href={"https://"+ item.vendorTable.url}>{item.vendorTable.url}</a></p></TableCell>

                              { item.id_user !== "" ?
                              <TableCell>
                                <Fab  aria-label="edit" style={{width: '100%', height: '100%'}} className={classes.submit}> 
                                <Tooltip title="Editar Usuário" placement="right-start">
                                  <Link  onClick={() => {
                                    localStorage.setItem("usuarioid", item.id_user)
                                    setOpen(false);
                                    setOpen2(true);
                                  }} >
                                    <EditIcon style={{
                                      color: '#FFF',
                                    }}/>
                                  </Link> 
                                  </Tooltip>
                                </Fab>
                              </TableCell>
                              :
                              ""
                              }

                            </TableRow>
                          ))
                          }
                                
                        </TableBody>

                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[2, 5, 10, 20]}
                      component="div"
                      count={content.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
                </Fade>
            </Modal>




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
                    <div style={{width: '10%', height: '90px', minWidth: '90px', maxWidth: '90px', backgroundColor: "#616158", marginTop: '-70px', borderRadius: '10px'}}>
                      <EditIcon style={{ color: '#fff', width: '60%', height: '50%', margin: '20%' }}/>
                    </div>

                    <h2 id="transition-modal-title" style={{marginTop: '5px',}}>Editar Usuários</h2>
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
                   {/*Aqui era o Orders */} 
                    <EditUserTable />
                </div>
                </Fade>
            </Modal>

    
    </div>
    
    </React.Fragment>
  );
}


