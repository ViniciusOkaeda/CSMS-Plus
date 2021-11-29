import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';




const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper2,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

export default function InfoUser() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
  
    const handleClick = () => {
      setOpen(!open);
    };

    const handleClick2 = () => {
      setOpen2(!open2);
    };

    const handleClick3 = () => {
      setOpen3(!open3);
    };
    const handleClick4 = () => {
      setOpen4(!open4);
    };


  return (
    <React.Fragment>
        <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
    <div style={{
          width: '100%', 
          height: '100%', 

          borderRadius: '8px', 
          marginTop: '20px', 
          boxShadow: '0px 0px 20px rgba(220, 220, 220, 1)',
            }}>

      <div style={{   
          display: 'flex',
          width: '100%'
          
          }}>


        <div color="primary" style={{
            width: '60px',
            minWidth: '40px', 
            height: '55%', 
            backgroundColor: '#616158',  
            borderRadius: '8px', 
            marginTop: '-30px', 
            marginLeft: '20px', 
            boxShadow: '8px 10px 10px rgba(0, 0, 0, 0.4)'}}>
            <div >
                <LiveHelpIcon style={{ color: '#fff', width: '60%', height: '60%', margin: '20%' }}/>
            </div>
        </div>

        <ListItem button onClick={handleClick}>
        <h1 style={{
            fontWeight: 'bold',
            fontSize: '26px',
            margin: '0',
            color: '#3C4858'
        }}>Informações</h1>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>


          <ListItem button onClick={handleClick2} className={classes.nested} >
          <div style={{display: 'flex',}}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <div style={{flexDirection: 'column'}}>

            <ListItemText primary="Buscar Usuários"  />
            
          <Collapse in={open2} timeout="auto" unmountOnExit >
            <p>A aba de Buscar Usuários tem a opção de buscar usuários específicos pelo NOME, caso não utilize a pesquisa pelo nome, será listado todos os usuários cadastrados.</p>
          </Collapse>
            </div>
            </div>
          </ListItem>

          <ListItem button onClick={handleClick3} className={classes.nested} >
          <div style={{display: 'flex',}}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <div style={{flexDirection: 'column'}}>

            <ListItemText primary="Criar Usuário"  />
            
          <Collapse in={open3} timeout="auto" unmountOnExit >
            <p>Para criar um novo usuário da plataforma, é necessário preencher TODOS os campos do formulário de novo usuário. Caso deixe de informar um ou mais campos, não será possível fazer o cadastro.</p>
            <p>Todos os campos de formulário obrigatórios estão marcados com um *</p>
            <p>O usuário Administrador é designado para colaboradores da YOUCAST por ter acesso à todas as informações disponíveis dos demais clientes da plataforma. Para cadastrar um usuário que não seja da YOUCAST é recomendado que selecione o "USUÁRIO COMUM" no tipo do perfil.</p>
          </Collapse>
            </div>
            </div>
          </ListItem>

          <ListItem button onClick={handleClick4} className={classes.nested} >
          <div style={{display: 'flex',}}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <div style={{flexDirection: 'column'}}>

            <ListItemText primary="Editar Usuário"  />
            
          <Collapse in={open4} timeout="auto" unmountOnExit >
            <p>Para editar um usuário da plataforma, é necessário acessar o Buscar Usuários, após escolher o usuário para editar, na coluna "Ações" clique no botão "EDITAR USUÁRIO", após isso você será redirecionado para a aba de edição do usuário.</p>
            <p>Para editar um usuário não necessáriamente é obrigatório alterar todos os campos.</p>
          </Collapse>
            </div>
            </div>
          </ListItem>

        </List>
      </Collapse>
  
    </div>
    </List>


    </React.Fragment>
  );
}