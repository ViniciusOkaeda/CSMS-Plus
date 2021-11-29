import React from "react";
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
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


import GetUserCard from "../../../components/getUserCard";
import CreateUserCard from "../../../components/createUserCard";
import InfoUser from "../../../components/infoUser";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { mainListItems } from '../listItems';
import HeaderBG from "../../../assets/HeaderBG.png";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


  
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
    paper2: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      backgroundColor: 'transparent',
      borderRadius: '30px',
      boxShadow: 'none',


    },
    fixedHeight: {
      height: 240,
    },
    fixedHeight2: {
      height: 200,
    },
  }));

export default function Users() {


  const history = useHistory();
    
    
        async function logout() {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('profile')
            localStorage.removeItem('session')
            history.push('/')
        }
        const user = localStorage.getItem("user")
        const [anchorEl, setAnchorEl] = React.useState(null);
        const openM = Boolean(anchorEl);
      
        const handleClickM = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleCloseM = () => {
          setAnchorEl(null);
        };

        const classes = useStyles();
        const [open, setOpen] = React.useState(true);
        const handleDrawerOpen = () => {
          setOpen(true);
        };
        const handleDrawerClose = () => {
          setOpen(false);
        };
        const fixedHeightPaper = clsx(classes.paper2, classes.fixedHeight2);
        



            return (
              <div className={classes.root}>
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
                      Usuários
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
                  <List>{mainListItems}</List>
                  <Divider />
                  <List>{}</List>

                </Drawer>
        
        
                <main className={classes.content}>
                  <div className={classes.appBarSpacer} />
                  <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                      {/* Chart */}

                      <Grid item xs={12} style={{marginTop: '40px', marginBottom: '40px'}}>
                        <Paper className={classes.paper2}>
                          <InfoUser />
                        </Paper>
                      </Grid>

                      <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaper}>
                            <GetUserCard />
                        </Paper>
                      </Grid>
                    
                      {/* Recent Deposits */}
                      <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaper}>
                          <CreateUserCard />
                        </Paper>
                      </Grid>

                       {/* Recent Deposits */}
                       <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaper}>
                          
                        </Paper>
                      </Grid>

                       {/* Recent Deposits */}
                       <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaper}>
                          
                        </Paper>
                      </Grid>
                      

                    </Grid>
                  </Container>
                </main>
              </div>
        );


}