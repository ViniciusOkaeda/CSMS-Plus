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
        }}>Informa????es</h1>
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

            <ListItemText primary="Buscar Usu??rios"  />
            
          <Collapse in={open2} timeout="auto" unmountOnExit >
            <p>A aba de Buscar Usu??rios tem a op????o de buscar usu??rios espec??ficos pelo NOME, caso n??o utilize a pesquisa pelo nome, ser?? listado todos os usu??rios cadastrados.</p>
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

            <ListItemText primary="Criar Usu??rio"  />
            
          <Collapse in={open3} timeout="auto" unmountOnExit >
            <p>Para criar um novo usu??rio da plataforma, ?? necess??rio preencher TODOS os campos do formul??rio de novo usu??rio. Caso deixe de informar um ou mais campos, n??o ser?? poss??vel fazer o cadastro.</p>
            <p>Todos os campos de formul??rio obrigat??rios est??o marcados com um *</p>
            <p>O usu??rio Administrador ?? designado para colaboradores da YOUCAST por ter acesso ?? todas as informa????es dispon??veis dos demais clientes da plataforma. Para cadastrar um usu??rio que n??o seja da YOUCAST ?? recomendado que selecione o "USU??RIO COMUM" no tipo do perfil.</p>
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

            <ListItemText primary="Editar Usu??rio"  />
            
          <Collapse in={open4} timeout="auto" unmountOnExit >
            <p>Para editar um usu??rio da plataforma, ?? necess??rio acessar o Buscar Usu??rios, ap??s escolher o usu??rio para editar, na coluna "A????es" clique no bot??o "EDITAR USU??RIO", ap??s isso voc?? ser?? redirecionado para a aba de edi????o do usu??rio.</p>
            <p>Para editar um usu??rio n??o necess??riamente ?? obrigat??rio alterar todos os campos.</p>
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