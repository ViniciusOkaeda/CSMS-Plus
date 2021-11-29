import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Logo from "../../assets/logo_csmsplus.png";
import { motion } from "framer-motion";
import Banner from "../../assets/banner_csms.png";
import Youcast from "../../assets/youcast_logo.png";


import axios from "axios";
import { getProfile } from "../../utils/common";

//material ui

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
        background: '#000',
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
        backgroundColor: '#fbcf00',
      },
    }));



function LoginTest() {


    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const item = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
      }



    useEffect(() => {
        if(localStorage.getItem('token')){
            history.push('/dashboard')
        }
    }, [])

        async function login() {
            setError(null);
            setLoading(true);
            console.warn(username, password)
            let item = { username, password};
            let result = await fetch("http://10.10.151.107/login", {
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

        const handleLogin = () => {
            setError(null);
            setLoading(true);
            axios({
                method: 'post',
                url: 'http://10.10.151.107/login',
                data: {
                    username: username,
                    password: password        
                },
                config: { headers: {}}
              }).then(response => {
                setLoading(false);
                getProfile ( {response} )
                console.log('response >>>>', response)
                }).catch(status => {
                  setLoading(false);
                  if( status.response === 401 || status.response === 1021 ){
                    setError('aa');
                  } else {
                    setError('Tentativas excedidas. Tente novamente mais tarde.')
                  }
                  console.error('error >>>>>>>>>', error)
              });
        
        }    


        return(
            <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={8} className={classes.image} 
          style={{backgroundImage: "url(" + Banner + ")"}} >
                <motion.div
                initial={{ y: '-100vw', opacity: 0,  }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', delay: 0.5, opacity: 0 }}

                style={{
                    
                }}
                > 
                    <div style={{
                        width: '70%',
                        height: '100%',
                        margin: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '80px',
                        marginBottom: '-40px',
                    }}>
                    <h1 style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '54px',
                        textShadow: '3px 5px 10px gray',
                    }}>Resolver seus problemas nunca foi tão fácil!</h1>
                    </div>
                </motion.div>

                <motion.div
                initial={{ x: '-100vw'  }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', delay: 0.5, opacity: 0 }}
                > 
                    <div style={{
                        width: '70%',
                        margin: 'auto',

                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'end',

                    }}>
                    <h1 style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        textShadow: '3px 5px 10px gray',
                    }}>Acesse já nosso portal</h1>
                    </div>
                </motion.div>


                <img src={Youcast} style={{ width: '30%', marginTop: '180px', marginLeft:'500px', opacity: '0.8'}}/>
          </Grid>
                    
                    

          <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <img src={Logo} style={{ width: '50%', marginBottom: '50px', marginTop: '20px'}}/>

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
                    {error && <div class="error">{error}</div>}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Lembrar senha"
                  />
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