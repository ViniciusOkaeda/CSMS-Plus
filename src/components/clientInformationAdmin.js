import React, { useState, useEffect } from "react";
import './style.css';
import TableContainer from '@mui/material/TableContainer';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@mui/material/Tooltip';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';

const useStyles = makeStyles((theme) => ({
  root:{
    "&:hover": {
      background: "rgba(240, 240, 240, 0.5)",
    },
  },
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
  paper2: {
    padding: theme.spacing(0.5),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    borderRadius: '10px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: 'auto',
    width: 'auto',
    height: 'auto',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    borderStyle: 'none',

    "&:hover": {
        background: "rgb(129, 129, 129)",
        transform: 'scale(1.1)'
      },
  },
}));


export default function ClientInformationAdmin() {
  const classes = useStyles();
  const vendor = localStorage.getItem("vendorname");
  const user_id = parseInt(sessionStorage.getItem("client"));
  const tokenH = localStorage.getItem("token");

  const [open3, setOpen3] = React.useState(false);
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  const [open4, setOpen4] = React.useState(false);
  const handleClick4 = () => {
    setOpen4(!open4);
  };
  
  const [product, setProduct] = useState('');
  const [productId2, setProductId2] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const [ allowedProduct, setAllowedProduct] = useState ([ {
    productId: '',
    productName: '',
  }])

  const [ clientSubscription, setClientSubscription] = useState ([ {
    isCancelled:'',
    productId:'',
    from:'',
    to:'',
    productName:'', 
  }])

  useEffect(() => {
    const vendor = localStorage.getItem("vendorname");
    const user_id = parseInt(sessionStorage.getItem("client"));
    const tokenH = localStorage.getItem("token");

  async function getMotvCustomer() {
    //console.log("olha o vendorname", vendorName)
      let resultado = await fetch("http://10.5.0.53/api/v1/motvCustomer?id="+user_id+"&vendor="+vendor, {
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
        await setEmail(resultado.response.email)
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
  async function getAllowedProductCustomer() {
    //console.log("olha o product customer", vendorName)
      let resultado = await fetch("http://10.5.0.53/api/v1/motvSubscription/allowed/products?id="+user_id+"&vendor="+vendor, {
          method: 'GET',
          headers: {
              Authorization: tokenH,
          },
  
      });
      resultado = await resultado.json();

      if(resultado.status === 1001) {
        await setAllowedProduct(resultado.response)

        //console.log("pacotes encontrados", resultado.response)
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
  async function getSubscriptionInfoCustomer() {
    //console.log("olha o product customer", vendorName)
      let resultado = await fetch("http://10.5.0.53/api/v1/motvSubscription?id="+user_id+"&vendor="+vendor, {
          method: 'GET',
          headers: {
              Authorization: tokenH,
          },
  
      });
      resultado = await resultado.json();

      if(resultado.status === 1001) {
        await setClientSubscription(resultado.response)

      //console.log("cliente pacotes encontrados", resultado.response)
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

    getSubscriptionInfoCustomer()
    getAllowedProductCustomer()
    getMotvCustomer();
  }, [])

const cancelPackage = async e => {
  e.preventDefault();
  let product_id = productId2
  let item = {vendor, user_id, product_id}
  console.log(JSON.stringify({item}))

let result = await fetch("http://10.5.0.53/api/v1/motvSubscription", {
                method: 'PUT',
                headers: {
                  Authorization: tokenH,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            });
            result = await result.json();
            if(result.status === 1001 ){
              setError("Pacote Cancelado com sucesso!")
              sessionStorage.removeItem("client")
              localStorage.removeItem("vendorname")
              localStorage.removeItem("vendorid")
              window.location.reload();
            } else if (result.status === 1147) {
              setError("Fornecedor Inválido")
            } else if (result.status === 1600) {
              setError("Dados inválidos")
            } 
}

const createPackage = async e => {
  e.preventDefault();
  let product_id = product
  let item = {vendor, user_id, product_id}
  console.log(JSON.stringify({item}))
let result = await fetch("http://10.5.0.53/api/v1/motvSubscription", {
                method: 'POST',
                headers: {
                  Authorization: tokenH,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            });
            result = await result.json();
            if(result.status === 1001 ){
              setError("Pacote Cadastrado com sucesso!")
              sessionStorage.removeItem("client")
              localStorage.removeItem("vendorname")
              localStorage.removeItem("vendorid")
              window.location.reload();
            } else if (result.status === 1147) {
              setError("Fornecedor Inválido")
            } else if (result.status === 1600) {
              setError("Nome de Usuário já existe")
            } 
}




  return (
    <React.Fragment>
      <div style={{
          width: '100%', 
          height: '100%',
          maxWidth: '490px', 
          backgroundColor: '#fff', 
          marginTop: '30px',

            }}>

                
<Grid container component="main" style={{ marginTop: '-10px', boxShadow: '0px 6px 5px gray', borderRadius: '10px', backgroundColor: '#616158', paddingTop: '10px'}}>
                    <Grid item xs={12} sm={6} md={6} elevation={6} square="true" style={{height: '100%', borderRadius: '10px',}} >
                      <div style={{display: 'flex', marginBottom: '10px', margin: 'auto auto 10px 10px', borderRadius: '10px'}}>

                        <div style={{margin: 'auto 10px auto 0px', backgroundColor: '#44443f', borderRadius: '10px'}}>
                          <h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize: '18px', textShadow: '1px 1px 30px white', color: '#fff', margin: 'auto 10px',}}>Cliente</h2>
                        </div>
                          <h2 style={{textAlign: 'center', fontSize: '18px', textShadow: '1px 1px 30px white', color: '#f2f2f2', margin: '0px'}}>{name} {lastName}</h2>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} elevation={6} square="true" style={{height: '100%', borderRadius: '10px',}}>
                      <div style={{display: 'flex', marginBottom: '10px', margin: 'auto auto 10px 10px', borderRadius: '10px'}}>

                        <div style={{margin: 'auto 10px auto 0px', backgroundColor: '#44443f', borderRadius: '10px'}}>
                          <h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize: '18px', textShadow: '1px 1px 30px white', color: '#fff', margin: 'auto 10px',}}>ID</h2>
                        </div>
                          <h2 style={{textAlign: 'center', fontSize: '18px', textShadow: '1px 1px 30px white', color: '#f2f2f2', margin: '0px'}}>{user_id}</h2>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} elevation={6} square="true" style={{height: '100%', borderRadius: '10px',}}>
                      <div style={{display: 'flex', marginBottom: '10px', margin: 'auto auto 10px 10px', borderRadius: '10px'}}>

                        <div style={{margin: 'auto 10px auto 0px', backgroundColor: '#44443f', borderRadius: '10px'}}>
                          <h2 style={{textAlign: 'center', fontSize: '18px', textShadow: '1px 1px 30px white', color: '#FFF', margin: 'auto 10px',}}>Email</h2>
                        </div>
                          <h2 style={{textAlign: 'center', fontSize: '18px', textShadow: '1px 1px 30px white', color: '#FFF', margin: '0px'}}>{email}</h2>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} elevation={6} square="true" style={{height: '100%', borderRadius: '10px',}}>
                      <div style={{display: 'flex', marginBottom: '10px', margin: 'auto auto 10px 10px', borderRadius: '10px'}}>

                        <div style={{margin: 'auto 10px auto 0px', backgroundColor: '#44443f', borderRadius: '10px'}}>
                          <h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize: '18px', textShadow: '1px 1px 30px white', color: '#fff', margin: 'auto 10px',}}>Usuário</h2>
                        </div>
                          <h2 style={{textAlign: 'center', fontSize: '18px', textShadow: '1px 1px 30px white', color: '#FFF', margin: '0px'}}>{login}</h2>
                      </div>
                    </Grid>
                </Grid>
{error && <div className="error" style={{width: '300px', textAlign: 'center', margin: '15px auto', marginBottom: '10px'}}>{error}</div>}

<TableContainer style={{marginTop: '15px'}}>
<Grid container component="main"  style={{ marginTop: '8px', height: '100%', borderRadius: '10px', maxHeight: '300px' }}>
        

        {/* Informações de Pacotes do Cliente */}
    <Grid item xs={12} sm={12} md={12} elevation={6} square="true">
    <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          disablePadding
          
          >
          <div className={classes.root} style={{
                width: '100%', 
                height: '100%', 

                borderRadius: '8px', 
                marginTop: '20px', 
                //boxShadow: '0px 0px 5px rgba(251,207,0,1)',
                  }}>

            <div style={{   
                display: 'flex',
                width: '100%'
                
                }}>
        <ListItem button onClick={handleClick3}>
        <h2 style={{
            fontWeight: 'bold',
            fontSize: '18px',
            margin: '0',
            color: '#3C4858'
        }}>Informações de Pacotes do Cliente</h2>
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      </div>
      <Collapse in={open3} timeout="auto" unmountOnExit style={{backgroundColor: '#F7F7F7'}}>
        <List component="div" disablePadding >
          
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
                      {/* Chart */}
              {clientSubscription

              .filter((item) => item.isCancelled === "0")
              .map((item) => (

                <Grid item xs={10} style={{margin: '30px auto 15px auto', marginTop: '30px', marginBottom: '15px'}} key={item.productId}>
                <Paper className={classes.paper2}>
                  
                  <div style={{backgroundColor: '#6D6D65', margin: '-25px auto -15px 5%', borderRadius: '10px', position: 'absolute', width: '35px', height: '35px'}}>
                    <p style={{fontWeight: 'bold', color: '#FFF', textAlign: 'center', margin: '8px auto auto auto'}}>{item.productId}</p>
                  </div>
                  <div style={{display: 'flex', width: '80%', height: '60px', margin: 'auto auto auto 20%', justifyContent: 'space-between', alignItems: 'center'}}> 
                  <div style={{ flexDirection: 'column'}}>
                  <p style={{fontWeight: 'bold', textAlign: 'left', marginLeft: '10px'}}>{item.productName}</p>
                  <p style={{ textAlign: 'left', color: '#c4c4c4', fontSize: '12px', marginTop: '-10px', marginLeft: '10px'}}>Ativo em: {item.from.split("-", [2]).reverse().join('/') }</p>
                  </div>

                    <form className={classes.form} noValidate onSubmit={cancelPackage} style={{width: '30%'}}>
                    
                    <Tooltip title="Deletar pacote do cliente" placement="right">
                      <button
                        value={loading ?  "Aguarde..." : "Novo Pacote"}
                        disabled={loading}
                        type="submit"
                        onClick={ (e) => {
                          setProductId2(item.productId);
                        }
                         }
                        variant="contained"
                        style={{
                          color: '#fff',
                          borderRadius: '10px',
                            }}
                            className="click"
                            >
                        <DeleteForeverIcon style={{
                          color: '#FBCF00',
                          margin: 'auto',
                          width: 30,
                          height: 30,
                          cursor: 'pointer',
                          "&:hover": {
                            color: "#FFF",
                          },

                        }}/>

                      </button>  
                      </Tooltip>

                    </form>                 
                  </div>
                  

                </Paper>
              </Grid>

              ))}


          </Grid>
        </Container>


        </List>
      </Collapse>
  
        </div>
      </List>
    </Grid>

        {/* Pacotes Disponíveis Fornecedor */}
    <Grid item xs={12} sm={12} md={12} elevation={6} square="true">
    <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          disablePadding
          
          >
          <div className={classes.root} style={{
                width: '100%', 
                height: '100%', 

                borderRadius: '8px', 
                marginTop: '20px', 
                //boxShadow: '0px 0px 5px rgba(251,207,0,1)',
                  }}>

            <div style={{   
                display: 'flex',
                width: '100%'
                
                }}>
        <ListItem button onClick={handleClick4}>
        <h2 style={{
            fontWeight: 'bold',
            fontSize: '18px',
            margin: '0',
            color: '#3C4858'
        }}>Pacotes Disponíveis Fornecedor</h2>
        {open4 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      </div>
      <Collapse in={open4} timeout="auto" unmountOnExit style={{backgroundColor: '#F7F7F7'}}>
        <List component="div" disablePadding >
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
                      {/* Chart */}
              {allowedProduct.map((item) => (
                <Grid item xs={10} style={{margin: '30px auto 15px auto', marginTop: '30px', marginBottom: '15px', }} key={item.productId}>
                <Paper className={classes.paper2}>
                  <div style={{backgroundColor: '#6D6D65', margin: '-25px auto -15px 5%', borderRadius: '10px', position: 'absolute', width: '35px', height: '35px'}}>
                    <p style={{fontWeight: 'bold', color: '#FFF', textAlign: 'center', margin: '8px auto auto auto'}}>{item.productId}</p>
                  </div>
                  <div style={{display: 'flex', width: '80%', height: '50px', margin: 'auto auto auto 20%', justifyContent: 'space-between', alignItems: 'center'}}> 
                    <p style={{fontWeight: 'bold', width: '90%', marginTop: '20px'}}>{item.productName}</p>

                    <form className={classes.form} noValidate onSubmit={createPackage} style={{width: '30%'}}>

                    <Tooltip title="Adicionar pacote ao cliente" placement="right">
                      <button
                        value={loading ?  "Aguarde..." : "Novo Pacote"}
                        disabled={loading}
                        type="submit"
                        onClick={ (e) => {
                          setProduct(item.productId);
                        }
                         }
                        variant="contained"
                        style={{
                          color: '#fff',
                          borderRadius: '10px',
                            }}
                            className="click"
                            >
                        <AddBoxIcon style={{
                          color: '#FBCF00',
                          margin: 'auto',
                          width: 30,
                          height: 30,
                          cursor: 'pointer',
                          "&:hover": {
                            color: "#FFF",
                          },

                        }}/>

                      </button>  
                      </Tooltip>

                    </form>                 
                  </div>
                </Paper>
              </Grid>

              ))}


          </Grid>
        </Container>
        </List>
      </Collapse>
  
        </div>
      </List>
    </Grid>
           <div style={{width: '85%', height: '1px', backgroundColor: '#E6E6E6', margin: 'auto', marginTop: '6%', marginBottom: '20px'}}></div>
  
  </Grid>
</TableContainer>





    
    </div>


    
    </React.Fragment>
  );
}


