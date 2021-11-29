import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Logo from "../../assets/logo_csmsplus.png";
import { motion } from "framer-motion";
import Yvideo from "../../movies/videoplayback.mp4";
import './style.css';

//material ui

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://youcast.tv.br/">
          Youcast
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        background: '#fff',
      },
      image: {
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



function LoginTest() {


    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const history = useHistory();




    useEffect(() => {
        if(localStorage.getItem('token')){
            history.push('/dashboard')
        }
    })

        async function login() {
            setError(null);
            setLoading(true);
            //console.warn(username, password)
            let item = { username, password};
            let result = await fetch("http://10.5.0.53/login", {
                method: 'POST',
                headers: {},
                body: JSON.stringify(item)
            });
            result = await result.json();
            /*console.log('este e o result>>>>>>>', result)*/
            if(result.status === 1021 ){
              setError('Digite um usuário e/ou senha válidos');
                setLoading(false);
            } else {
                if(result.status === 1001) {
                  /*console.log('este e o result profile>>>>', result.response.profile)*/
                  setLoading(false);
                 /* console.log('deu bom', result.response.name)*/
                  localStorage.setItem("session", JSON.stringify(result));
                  localStorage.setItem("user", result.response.name);
                  localStorage.setItem("profile", result.response.profile);
                  localStorage.setItem("token", result.response.token);
                  history.push('/dashboard')
                 /* console.log('este e o item>>>', item.username) */ 
                }
            }  
        }
        return(
            <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={8} className={classes.image}>
             <div className="banner">

               <video autoPlay loop muted style={{
               }}>
                 <source src={Yvideo} type="video/mp4"/>
               </video>
               <div className="content">
                 <motion.div
                initial={{ x: '-50vw', opacity: 0  }}
                animate={{ x: 0, opacity: 1  }}
                transition={{ delay: 1, duration: 1, opacity: 0 }}

                style={{
                  width: '100%',
                  height: 'auto',
                  margin: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '80px',
                  marginBottom: '-40px',
                  backgroundColor: 'rgba(251, 207, 0, 0.9)',
                }}
                > 
                    <div style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    margin: 'auto',
                    }}>

                    <motion.div
                    initial={{ x: '-100vw', opacity: 0  }}
                    animate={{ x: 0, opacity: 1  }}
                    transition={{ type: 'spring', delay: 2, opacity: 0 }}
                    >

                    <h1 style={{
                      width: '80%',
                      color: '#fff',
                      margin: 'auto',
                      fontWeight: 'bold',
                      fontSize: '36px',
                      textShadow: '3px 6px 10px black',
                      textAlign: 'left'
                    }}>Resolver seus problemas nunca foi tão fácil!</h1>
                    </motion.div>
                    </div>
                </motion.div>
                
                <motion.div 
                initial={{ x: '-100vw', opacity: 0  }}
                animate={{ x: 0, opacity: 1  }}
                transition={{ type: 'spring', delay: 2, opacity: 0 }}
                >
                  <div  className="geometric" style={{
                    backgroundColor: 'rgba(251, 207, 0, 0.8)',
                    display: 'flex', 
                    alignSelf: 'flex-end', 
                    width: '38%',
                    height: 'auto',
                    marginTop: '20%',
                    marginBottom: '15%',
                    }}>
                      <h2 style={{color: '#fff', margin: 'auto', textShadow: '3px 5px 10px black'}}>Acesse já nosso portal</h2>
                  </div>
                </motion.div>

                </div>
            </div>

          </Grid>
                    
                    

          <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square style={{width: '100%', height: '100%', backgroundColor: '#fff', position: 'relative'}}>
            <div className={classes.paper}>
                <img src={Logo} alt="Customer Management System" style={{ width: '50%', marginBottom: '50px', marginTop: '20px'}}/>

              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="username"
                  label="Nome de Usuário"
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
                    {error && <div className="error">{error}</div>}

                <Button
                  value={loading ?  "Aguarde..." : "Fazer Login"}
                  disabled={loading}
                  onClick={login}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  >
                  Fazer Login
                </Button>
                

                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
              
            </div>
          </Grid>
                   

        </Grid>
        )
    }


export default LoginTest;