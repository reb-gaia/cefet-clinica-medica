// requisições, regras de negocio

import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from "../../../services/api";

const EmployeeContext = createContext({});

function EmployeeProvider({children}) {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  

  const getEmployee = useCallback(
    async () => {
      try {
        const { data } = await api.get('/listarFuncionarios');
        setEmployees(data);
      } catch (error) {
        setError("Erro ao adquirir a lista de produtos");
      }
    
  }, []);
  
  const postEmployee = useCallback(
    async ({name, email, password, phone, cep, street, district, city, estado, isDoctor, doctorType, crm, startDate, salary}) => {
      let pessoa = {
        nome:name,
        email,
        telefone:phone,
        cep:cep,
        logradouro:street,
        bairro:district,
        cidade:city,
        estado
      };
      let funcionario = {
        pessoa,
        dataContrato:startDate,
        senhaHash:password,
        salario:salary,
      }
      try {
        if (crm) {
          await api.post('/cadastrarMedico', {
            funcionario,
            especialidade:doctorType,
            crm,
          });
        } else {
          await api.post('/cadastrarFuncionario', {
            ...funcionario,
          });
        }
      } catch (error) {
        setError("Erro ao postar um produto");
      }
  }, []);

  const putEmployee = useCallback(
    async ({id, name, email, password, phone, cep, street, district, city, estado, isDoctor, doctorType, crm, startDate, salary}) => {
      try {
        await api.put(`/employees/${id}`, {
          id,
          name, 
          email, 
          password,
          phone, 
          cep, 
          street, 
          district, 
          city, 
          estado,
          isDoctor,
          doctorType,
          crm,
          startDate, 
          salary
        });
      } catch (error) {
        setError("Erro ao editar o produto");
      }
  }, []);

  const deleteEmployee = useCallback(
    async ({id}) => {
      try {
        await api.delete(`/employees/${id}`);
        setEmployees(pState => pState.filter(
          state => state.id !== id
        ));
      } catch (error) {
        setError("Erro ao deletar o produto");
      }
  }, []);

  return (
    <EmployeeContext.Provider 
      value={{
        employees, 
        error,
        getEmployee,
        postEmployee,
        putEmployee,
        deleteEmployee        
    }}>
      {children}
    </EmployeeContext.Provider>
  );
}

function useEmployee() {
  const context = useContext(EmployeeContext);
  return context;
}

export { EmployeeProvider, useEmployee };