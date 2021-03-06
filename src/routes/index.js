// local que determina as rotas
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from "../pages/Login";
import Home from "../pages/Home";
import Galery from "../pages/Galery";

import CreateAddresses from "../pages/CreateAddresses";
import CreateSchedules from "../pages/CreateSchedules";
import CreateEmployee from "../pages/CreateEmployee";
import CreatePatients from "../pages/CreatePatients";

import Queries from "../pages/Queries";

import NotFound from "../pages/NotFound";
import NavBar from "../components/NavBar";

import { Styled } from './styles';
import { useAuth } from '../hooks/contexts/AuthProvider';

export default function Routes() {
  const { auth } = useAuth();
  return (
    <Styled.AppLayout>
      <NavBar />
      <Styled.PageLayout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/galery" component={Galery} />
          <Route path="/login" component={Login} />

          
          <Route path="/create-address" component={CreateAddresses} />
          <Route path="/edit-address/:id" component={CreateAddresses} />

          <Route path="/create-schedule" component={CreateSchedules} />
          <Route path="/edit-schedule/:id" component={CreateSchedules} />
        
          {auth && <Route path="/create-employee" component={CreateEmployee} />}
          {auth && <Route path="/edit-employee/:id" component={CreateEmployee} />}

          {auth && <Route path="/create-patient" component={CreatePatients} />}
          {auth && <Route path="/edit-patient/:id" component={CreatePatients} />}

          {auth && <Route path="/queries" component={Queries} />}

          {/* {auth && <Route path="/queries" component={Queries} />} */}
          <Route path="/queries" component={Queries} />
          
          <Redirect from="*" to={NotFound} />
        </Switch>
      </Styled.PageLayout>
    </Styled.AppLayout>
  )
}