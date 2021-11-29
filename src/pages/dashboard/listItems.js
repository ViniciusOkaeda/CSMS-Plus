import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import Link from '@material-ui/core/Link';
import AssignmentIcon from '@material-ui/icons/Assignment';
import "./style.css";



//{window.location.reload(true)}




export const mainListItems = (
  <div>

      <ListItem button className='click' >
        <ListItemIcon >
          <DashboardIcon style={{ color: '#fff' }}/>
        </ListItemIcon >
      <Link href="/dashboard" >
        <ListItemText primary="Dashboard" style={{ color: '#fff' }}/>
      </Link>
      </ListItem>
  
      <ListItem button className='click'>
        <ListItemIcon>
          <LayersIcon style={{ color: '#fff' }}/>
        </ListItemIcon>
        <Link href="/motv" >
        <ListItemText primary="moTV" style={{ color: '#fff' }}/>
        </Link>
        
      </ListItem>
      <ListItem button className='click'>
        <ListItemIcon>
          <PeopleIcon style={{ color: '#fff' }}/>
        </ListItemIcon>
      <Link href="/users" >
        <ListItemText primary="Usuários" style={{ color: '#fff' }}/>
      </Link>
      </ListItem>
  
      <ListItem button className='click'>
        <ListItemIcon>
          <AssignmentIcon style={{ color: '#fff' }}/>
        </ListItemIcon>
        <Link href="/vendors" >
        <ListItemText primary="Vendors" style={{ color: '#fff' }}/>
        </Link>
      </ListItem>
      </div>
);

export const secondaryListItems = (
  <div>
          <ListItem button className='click'>
            <ListItemIcon >
              <DashboardIcon style={{ color: '#fff' }}/>
            </ListItemIcon >
            <Link href="/dashboard" >
            <ListItemText primary="Dashboard" style={{ color: '#fff' }}/>
            </Link>
          </ListItem>

          <ListItem button className='click'>
            <ListItemIcon>
              <LayersIcon style={{ color: '#fff' }}/>
            </ListItemIcon>
            <Link href="/motv" >
            <ListItemText primary="Motv" style={{ color: '#fff' }}/>
            </Link>
          </ListItem>
        </div>
);