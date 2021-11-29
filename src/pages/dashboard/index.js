import React from "react";
import { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { mainListItems, secondaryListItems } from './listItems';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grafico from './chart';
import HeaderBG from "../../assets/HeaderBG.png";
import Paper from '@material-ui/core/Paper';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import User from '../../assets/user.png';
import Channels from '../../assets/tv.png';
import Package from '../../assets/package.png';
import Suitcase from '../../assets/suitcase.png';
import Portifolio from '../../assets/portfolio.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    palette: {
        primary: {
            main: '#f44336',
        }
    },

  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    backgroundColor: '#fbcf00',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    backgroundImage: `url(${HeaderBG})`,
    backgroundPositionX: 'center',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));




const currencies = [
  {
    value: 'USD',
  },
  {
    value: 'EUR',
  },
  {
    value: 'BTC',
  },
  {
    value: 'JPY',
  },
];

export default function Dashboard() {

const [contarVendor, setContarVendor] = useState (0);
const [contarUser, setContarUser] = useState (0);
//console.log("contei vendor e deu:", contarVendor)
//console.log("contei user e deu:", contarUser)
const history = useHistory();


  useEffect(() => {

    const token = localStorage.getItem("token");

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
        await setContarUser(resultado.response.numberOfElements)
        console.log("users aqui", resultado.response.numberOfElements)
        //await setContent(resultado.response.content);
        //console.log("aqui esta", contente)
        //for (var j = 0 ; j < resultado.response.content.length; j++ ) {
        //contente[j] += 1;
          //setContar(content2[i])
        //console.log("aqui esta o", j)
        //console.log("resultado", resultado.response.numberOfElements)
        //console.log("resultado", resultado)
        //}
      } else if (resultado.status === 1027){
        await localStorage.clear();
        await sessionStorage.clear();
        await history.push("/")
      }          
  }



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
        await setContarVendor(resultado.response.numberOfElements)
        console.log("vendors aqui", resultado.response.numberOfElements)
        //await setContent2(resultado.response.content);
        //for (var i = 0 ; i < content2.length; i++ ) {
          //content2[i] = i+1;
          //setContar(content2[i])
          //console.log("aqui esta a", i)
        //}

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

    
    getUsers();
    getVendors();

  }, [])

    const profile = localStorage.getItem("profile");
    const user = localStorage.getItem("user")

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openM = Boolean(anchorEl);

  const handleClickM = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseM = () => {
    setAnchorEl(null);
  };

    async function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('profile')
        localStorage.removeItem('session')
        localStorage.removeItem('usuariodi')
        history.push('/')
    }
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
    return (
      <div className={classes.root} >
        
        <CssBaseline />

        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              
            >
              <MenuIcon style={{ color: '#fff' }}/>
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>


            
      <button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={openM ? 'true' : undefined}
        onClick={handleClickM}
        style={{
          backgroundColor: '#616158',
          borderRadius: '50px',
          fontSize: '18px',
          width: '45px',
          borderStyle: 'none',
          color: '#FFF',
          height: '45px',
          cursor: 'pointer'
        }}
      >
        {user.substring(0, 2)}
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openM}
        onClose={handleCloseM}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={logout}>Sair <ExitToAppIcon /></MenuItem>
      </Menu>
  
            

          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon style={{ color: '#fff' }}/>
            </IconButton>
          </div>

          <Divider />
          <List>{profile === "1" ? mainListItems : secondaryListItems}</List>
          <Divider />
          <List>{}</List>          
        </Drawer>


        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={12} lg={12}>
                <h1 style={{fontWeight: 'bold', color: '#3c4858',}}>Seja bem vindo {user}!</h1>
                
                  
              </Grid>

              {/* 
              <Grid item xs={12} md={12} lg={12}>
                <Paper>
                  <Grafico />
                </Paper>
              </Grid>*/}

              { profile === "1" ? 
                <Grid item xs={12} md={6} lg={4} style={{height: '90px', margin: '10px auto 40px auto'}}>

                              <Paper style={{height: '120px', boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.3)', backgroundColor: '#fbcf00' }}>
                                <div style={{display: 'flex', margin: 'auto'}}>
              
                                  <div style={{color: '#FFF', width: '70%', height: '120px', display: 'flex', flexDirection: 'column'}}>
                                    <h2 style={{fontWeight: 'bold', fontSize: '50px', marginLeft: '15px', textShadow: '2px 2px 4px rgba(230, 230, 230, 0.4)', marginTop: '5px', marginBottom: '0px'}}>{contarVendor}</h2>
                                    <h2 style={{fontWeight: 'bold', fontSize: '18px', marginLeft: '15px', textShadow: '2px 2px 4px rgba(230, 230, 230, 0.4)', marginTop: '0px'}}>Vendors Ativos</h2>
                                  </div>
              
                                  <div style={{
                                    width: '30%', 
                                    height: '120px', 
                                    backgroundImage: `url(${Portifolio})`, 
                                    backgroundRepeat: 'no-repeat', 
                                    backgroundSize: '90%',
                                    backgroundPosition:  ' -10% 90%',
                                    opacity: '0.6',
                                    }}>
                                  
                                  </div>
              
              
                                </div>
                              </Paper>
                </Grid>
              : ""}





            { profile === "1" ? 
              <Grid item xs={12} md={6} lg={4} style={{height: '90px', margin: '10px auto 40px auto'}}>

                <Paper style={{height: '120px', boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.3)', backgroundColor: '#616158',}}>
                <div style={{display: 'flex', margin: 'auto'}}>

                  <div style={{color: '#FFF', width: '70%', height: '120px', display: 'flex', flexDirection: 'column'}}>
                    <h2 style={{fontWeight: 'bold', fontSize: '50px', marginLeft: '15px', textShadow: '2px 2px 4px rgba(230, 230, 230, 0.4)', marginTop: '5px', marginBottom: '0px'}}>{contarUser}</h2>
                    <h2 style={{fontWeight: 'bold', fontSize: '18px', marginLeft: '15px', textShadow: '2px 2px 4px rgba(230, 230, 230, 0.4)', marginTop: '0px'}}>Usuários Cadastrados</h2>
                  </div>

                  <div style={{
                    width: '30%', 
                    height: '120px', 
                    backgroundImage: `url(${User})`, 
                    backgroundRepeat: 'no-repeat', 
                    backgroundSize: '90%',
                    backgroundPosition:  ' -10% 55%',
                    opacity: '0.6',
                    }}>

                  </div>
                </div>
                </Paper>
              </Grid>
            : ""}

            { profile === "1" ? 
              <Grid item xs={12} md={6} lg={4} style={{height: '90px', margin: '10px auto 40px auto'}}>

                <Paper style={{height: '120px', boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.3)', backgroundColor: '#5D63D4',}}>
                <div style={{display: 'flex', margin: 'auto'}}>

                <div style={{color: '#FFF', width: '70%', height: '120px', display: 'flex', flexDirection: 'column'}}>
                  <div style={{display: 'flex', }}>

                  <h2 style={{fontWeight: 'bold', fontSize: '50px', marginLeft: '15px', textShadow: '2px 2px 4px rgba(230, 230, 230, 0.4)', marginTop: '5px', marginBottom: '0px'}}>119</h2>

                    <select style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#DDD',
                      fontWeight: 'bold',
                      margin: 'auto',
                      fontSize: '18px',

                    }}>
                      {currencies.map((item) => (
                        <option value={item.value}>{item.value}</option>

                      ))}
                      </select>
                  </div>
                  <h2 style={{fontWeight: 'bold', fontSize: '18px', marginLeft: '15px', textShadow: '2px 2px 4px rgba(230, 230, 230, 0.4)', marginTop: '0px'}}>Pacotes Disponíveis</h2>
                  </div>

                  <div style={{
                    width: '30%', 
                    height: '120px', 
                    backgroundImage: `url(${Channels})`, 
                    backgroundRepeat: 'no-repeat', 
                    backgroundSize: '90%',
                    backgroundPosition:  ' -10% 60%',
                    opacity: '0.6',
                    }}>
                </div>


</div>
                </Paper>
              </Grid>
            : ""}




            </Grid>
          </Container>
        </main>
      </div>
    );
}

