// requisições, regras de negocio

import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from "../../../services/api";

const PatientsContext = createContext({});

function PatientsProvider({children}) {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  

  const getPatients = useCallback(
    async () => {
      try {
        const { data } = await api.get('/listarPacientes');
        setPatients(data);
      } catch (error) {
        setError("Erro ao adquirir a lista de pacientes");
      }
    
  }, []);
  
  const postPatients = useCallback(
    async ({name, email, phone, cep, street, district, city, state, weight, height, bloodType}) => {
      try {
        let pessoa = {
          nome:name,
          email,
          telefone:phone,
          cep:cep,
          logradouro:street,
          bairro:district,
          cidade:city,
          estado:state
        };
        await api.post('/cadastrarPaciente', {
          pessoa,
          peso:weight, 
          altura:height, 
          tipoSanguineo:bloodType        
        });
      } catch (error) {
        setError("Erro ao postar um produto");
      }
  }, []);

  const putPatients = useCallback(
    async ({id, name, email, phone, cep, street, district, city, state, weight, height, bloodType}) => {
      try {
        await api.put(`/patients/${id}`, {
          name, 
          email, 
          phone, 
          cep, 
          street, 
          district, 
          city, 
          state, 
          weight, 
          height, 
          bloodType  
        });
      } catch (error) {
        setError("Erro ao editar o produto");
      }
  }, []);

  const deletePatients = useCallback(
    async ({id}) => {
      try {
        await api.delete(`/patients/${id}`);
        setPatients(pState => pState.filter(
          state => state.id !== id
        ));
      } catch (error) {
        setError("Erro ao deletar o produto");
      }
  }, []);

  return (
    <PatientsContext.Provider 
      value={{
        patients, 
        error,
        getPatients,
        postPatients,
        putPatients,
        deletePatients        
    }}>
      {children}
    </PatientsContext.Provider>
  );
}

function usePatients() {
  const context = useContext(PatientsContext);
  return context;
}

export { PatientsProvider, usePatients };