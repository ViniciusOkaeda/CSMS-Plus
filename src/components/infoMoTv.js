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


//

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper2,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

export default function InfoMoTv() {
    const classes = useStyles();
    const profile = localStorage.getItem("profile")
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    const [open6, setOpen6] = React.useState(false);
    const [open7, setOpen7] = React.useState(false);
  
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
    const handleClick5 = () => {
      setOpen5(!open5);
    };

    const handleClick6 = () => {
      setOpen6(!open6);
    };
    const handleClick7 = () => {
      setOpen7(!open7);
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

            <ListItemText primary="Buscar Clientes"  />
            
          <Collapse in={open2} timeout="auto" unmountOnExit >
            {profile === "1" ? 
            <p>Para buscar clientes existem duas formas. A primeira opção é buscar um cliente específico diretamente pelo ID. Ex: 1522.<br/> Neste caso irá renderizar somente um cliente(caso for encontrado). Na segunda opção, é possível realizar a busca pelo nome de usuário do cliente. Ex: teste. <br/>Neste caso, irá retornar todos os usuários que tiverem o nome de usuário igual ou parecido com a busca. Para acessar essas buscas, clique em "Meus Clientes", selecione um fornecedor que deseja buscar o cliente e em seguida irá ter a opção de "Buscar cliente por ID" e "Buscar Clientes".</p>
            :  
            <p>Para buscar clientes existem duas formas. A primeira opção é buscar um cliente específico diretamente pelo ID. Ex: 1522.<br/> Neste caso irá renderizar somente um cliente(caso for encontrado). Na segunda opção, é possível realizar a busca pelo nome de usuário do cliente. Ex: teste. <br/>Neste caso, irá retornar todos os usuários que tiverem o nome de usuário igual ou parecido com a busca. Para acessar essas buscas, clique em "Meus Clientes" e em seguida irá ter a opção de "Buscar cliente por ID" e "Buscar Clientes".</p>

          }
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

            <ListItemText primary="Criar Cliente"  />
            
          <Collapse in={open3} timeout="auto" unmountOnExit >

            {profile === "1" ? 
            <div>
              <p>Para criar um novo cliente da plataforma, é necessário preencher TODOS os campos do formulário que sejam obrigatórios (vão estar marcados com um * ). Para criar um novo cliente, clique em "Meus Clientes", Selecione um fornecedor, clique em "Novo Cliente".</p>
              <p>Todos os campos de formulário obrigatórios estão marcados com um *</p>
            </div>
            
            :
            <div>
              <p>Para criar um novo cliente da plataforma, é necessário preencher TODOS os campos do formulário que sejam obrigatórios (vão estar marcados com um * ). Para criar um novo cliente, clique em "Novo Cliente".</p>
              <p>Todos os campos de formulário obrigatórios estão marcados com um *</p>
            </div>
            
            }
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

            <ListItemText primary="Editar Cliente"  />
            
          <Collapse in={open4} timeout="auto" unmountOnExit >
            {profile === "1" ? 
            <div>
              <p>Para editar um cliente da plataforma, é necessário acessar "Meus Clientes", selecionar o fornecedor que o cliente está cadastrado, buscar o cliente por "ID" ou "NOME DE USUÁRIO" e na coluna "Ações" clique no botão "EDITAR CLIENTE", após isso você será redirecionado para a aba de edição do cliente.</p>
              <p>Para editar um cliente não necessáriamente é obrigatório alterar todos os campos.</p>
            </div>
            :
            <div>
              <p>Para editar um cliente da plataforma, é necessário acessar "Meus Clientes", buscar o cliente por "ID" ou "NOME DE USUÁRIO" e na coluna "Ações" clique no botão "EDITAR CLIENTE", após isso você será redirecionado para a aba de edição do cliente.</p>
              <p>Para editar um cliente não necessáriamente é obrigatório alterar todos os campos.</p>
            </div>

            }

          </Collapse>
            </div>
            </div>
          </ListItem>

          <ListItem button onClick={handleClick5} className={classes.nested} >
          <div style={{display: 'flex',}}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <div style={{flexDirection: 'column'}}>

            <ListItemText primary="Pacotes Disponíveis"  />
            
          <Collapse in={open5} timeout="auto" unmountOnExit >
            <p>
              Para checar os pacotes disponíveis do fornecedor para um cliente específico, clique em "MEUS CLIENTES", selecione o fornecedor, busque um cliente pelo "ID" ou "NOME DE USUÁRIO", em "AÇÕES" selecione "PAINEL DO CLIENTE", dentro do painel do cliente irá estar disponível todos os pacotes que podem ser ativados para aquele cliente específico, basta clicar em "PACOTES DISPONÍVEIS FORNECEDOR".
            </p>
          </Collapse>
            </div>
            </div>
          </ListItem>

          <ListItem button onClick={handleClick6} className={classes.nested} >
          <div style={{display: 'flex',}}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <div style={{flexDirection: 'column'}}>

            <ListItemText primary="Ativar Pacote para Cliente"  />
            
          <Collapse in={open6} timeout="auto" unmountOnExit >
            <p>Para ativar um pacote específico para um cliente, clique em "MEUS CLIENTES", selecione o fornecedor, busque o cliente pelo "ID" ou pelo "NOME DE USUÁRIO", em "AÇÕES", selecione o "PAINEL DO USUÁRIO". No painel do usuário clique na opção "PACOTES DISPONÍVEIS FORNECEDOR" e ao escolher o pacote específico para aquele cliente, clique em "ADICIONAR PACOTE AO CLIENTE".</p>
          </Collapse>
            </div>
            </div>
          </ListItem>

          <ListItem button onClick={handleClick7} className={classes.nested} >
          <div style={{display: 'flex',}}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <div style={{flexDirection: 'column'}}>

            <ListItemText primary="Desativar Pacote do Cliente"  />
            
          <Collapse in={open7} timeout="auto" unmountOnExit >
            <p>Para desativar um pacote do cliente, clique em "MEUS CLIENTES", selecione o fornecedor, busque o cliente por "ID" ou "NOME DE USUÁRIO", em "AÇÕES", selecione o "PAINEL DO CLIENTE". No painel do cliente, clique em "INFORMAÇÕES DE PACOTES DO CLIENTE", lá irá detalhar todos os pacotes ativos daquele cliente. Para remover basta clicar em excluir pacote.</p>
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