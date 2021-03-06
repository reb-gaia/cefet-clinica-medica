import React, { useMemo, useEffect, useState } from 'react';
import { useFormik,  } from 'formik';
import { Form, Button, Row, Col, FormControl } from 'react-bootstrap';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Container from '../../components/Container';
import { Styled } from './styles';
import { useEmployee } from '../../hooks/contexts/EmployeeProvider';
import { validationSchema } from './validation';
import Swal from 'sweetalert2';

function CreateEmployee() {
  const history = useHistory();
  const { id } = useParams()
  const { state } = useLocation()
  const { error, postEmployee, putEmployee } = useEmployee();
  const [cep, setCep] = useState([{}]);

  function handleTextChange(e) {
    if(e.target.value.length > 7) {
      e.preventDefault();
      fetch(`http://localhost:8080/buscarDadosCep?cep=${e.target.value}`)
      .then(res => res.json())
      .then(res => setCep(res));
    }
  }
  
  useEffect(() => {
  });

  const formik = useFormik({
    initialValues: {
      name: state ? state.employee.name : "",
      phone: state ? state.employee.phone : "",
      email: state ? state.employee.email : "",
      password: state ? state.employee.password : "",
      cep: state ? state.employee.cep : "",
      street: state ? state.employee.street : "",
      district: state ? state.employee.district : "",
      city: state ? state.employee.city : "",
      estado: state ? state.employee.estado : "",
      doctorType: state ? state.employee.doctorType : "",
      isDoctor: state ? state.employee.isDoctor : "",
      crm: state ? state.employee.crm : "",
      startDate: state ? state.employee.startDate : "",
      salary: state ? state.employee.salary : "",
    },
    validationSchema,
    onSubmit: async values => {
      if(!!id) {
        await putEmployee({
          id,
          name: values.name, 
          phone: values.phone,
          email: values.email, 
          password: values.password,
          cep: values.cep,
          street: values.street,
          district: values.district,
          city: values.city,
          estado: values.estado,
          isDoctor: values.isDoctor,
          doctorType: values.doctorType,
          crm: values.crm,
          startDate: values.startDate,
          salary: values.salary,
        });
        history.push("/");
        return
      }
      await postEmployee(values);
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Funcion??rio cadastrado',
        showConfirmButton: false,
        timer: 1500
      })
      history.push("/");
    }
  });

  const AppError = useMemo(
    () => <Styled.Error>{error}</Styled.Error>, [error]
  );

  const ValidationNameError = useMemo(
    () => <Styled.Error>{formik.errors.name}</Styled.Error>, [formik.errors.name]
  );

  const ValidationEmailError = useMemo(
    () => <Styled.Error>{formik.errors.email}</Styled.Error>, [formik.errors.email]
  );

  const ValidationPhoneError = useMemo(
    () => <Styled.Error>{formik.errors.phone}</Styled.Error>, [formik.errors.phone]
  );

  const ValidationCepError = useMemo(
    () => <Styled.Error>{formik.errors.cep}</Styled.Error>, [formik.errors.cep]
  );

  const ValidationStreetError = useMemo(
    () => <Styled.Error>{formik.errors.street}</Styled.Error>, [formik.errors.street]
  );

  const ValidationDistrictError = useMemo(
    () => <Styled.Error>{formik.errors.district}</Styled.Error>, [formik.errors.district]
  );

  const ValidationCityError = useMemo(
    () => <Styled.Error>{formik.errors.city}</Styled.Error>, [formik.errors.city]
  );

  const ValidationStateError = useMemo(
    () => <Styled.Error>{formik.errors.estado}</Styled.Error>, [formik.errors.estado]
  );

 

  const ValidationStartDateError = useMemo(
    () => <Styled.Error>{formik.errors.startDate}</Styled.Error>, [formik.errors.startDate]
  );

  const ValidationSalaryError = useMemo(
    () => <Styled.Error>{formik.errors.salary}</Styled.Error>, [formik.errors.salary]
  );

  const ValidationPasswordError = useMemo(
    () => <Styled.Error>{formik.errors.password}</Styled.Error>, [formik.errors.password]
  );

   
  return (
    <Container
      title="Cadastrar funcion??rio"
      size="form"
    >
      <Form onSubmit={formik.handleSubmit} style={{paddingRight: '15px',overflowY: "scroll"}}>
        <Form.Group className="mb-2">
          <Styled.ProfileLabel>Nome</Styled.ProfileLabel>
          <Form.Control
            id="name"
            name="name"
            placeholder="Digite seu nome"
            onChange={formik.handleChange}
            isValid={formik.touched.name && !formik.errors.name}
            isInvalid={formik.errors.name}
          />
          {ValidationNameError}
        </Form.Group>

        <Row>
          <Col xs={7}>
            <Form.Group className="mb-2">
              <Styled.ProfileLabel>Email</Styled.ProfileLabel>
              <Form.Control
                id="email"
                name="email"
                placeholder="Digite seu email"
                onChange={formik.handleChange}            
                isValid={formik.touched.email && !formik.errors.email}
                isInvalid={formik.errors.email}
              />
              {ValidationEmailError}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-2">
              <Styled.ProfileLabel>Telefone</Styled.ProfileLabel>
              <Form.Control
                id="phone"
                name="phone"
                placeholder="Digite seu telefone"
                onChange={formik.handleChange}            
                isValid={formik.touched.phone && !formik.errors.phone}
                isInvalid={formik.errors.phone}
              />
              {ValidationPhoneError}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Styled.ProfileLabel>Senha</Styled.ProfileLabel>
          <Form.Control
            id="password"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            onChange={formik.handleChange}
            isValid={formik.touched.password && !formik.errors.password}
            isInvalid={formik.errors.password}
          />
          {ValidationPasswordError}
        </Form.Group>

        <Form.Group className="mb-2">
          <Styled.ProfileLabel>CEP</Styled.ProfileLabel>
          <Form.Control
            id="cep"
            name="cep"
            placeholder="Digite seu CEP"
            onChange={e => { formik.handleChange(e); handleTextChange(e); }}
            isValid={formik.touched.cep && !formik.errors.cep}
            isInvalid={formik.errors.cep}
          />
          {ValidationCepError}
        </Form.Group>
        <Form.Group className="mb-2">
          <Styled.ProfileLabel>Logradouro</Styled.ProfileLabel>
          <Form.Control
            id="street"
            name="street"
            value={cep.logradouro}
            placeholder="Digite seu logradouro"
            onChange={formik.handleChange}            
            isValid={formik.touched.street && !formik.errors.street}
            isInvalid={formik.errors.street}
          />
          {ValidationStreetError}
        </Form.Group>
        <Form.Group className="mb-2">
          <Styled.ProfileLabel>Bairro</Styled.ProfileLabel>
          <Form.Control
            id="district"
            name="district"
            value={cep.bairro}
            placeholder="Digite seu bairro"
            onChange={formik.handleChange}            
            isValid={formik.touched.district && !formik.errors.district}
            isInvalid={formik.errors.district}
          />
          {ValidationDistrictError}
        </Form.Group>

        <Row>
          <Col xs={7}>
            <Form.Group className="mb-2">
              <Styled.ProfileLabel>Cidade</Styled.ProfileLabel>
              <Form.Control
                id="city"
                name="city"
                value={cep.cidade}
                placeholder="Digite sua cidade"
                onChange={formik.handleChange}            
                isValid={formik.touched.city && !formik.errors.city}
                isInvalid={formik.errors.city}
              />
              {ValidationCityError}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-2">
              <Styled.ProfileLabel>Estado</Styled.ProfileLabel>
              <Form.Control
                id="estado"
                name="estado"
                value={cep.estado}
                placeholder="Digite seu estado"
                onChange={formik.handleChange}            
                isValid={formik.touched.estado && !formik.errors.estado}
                isInvalid={formik.errors.estado}
              />
              {ValidationStateError}
            </Form.Group>
          </Col>
        </Row>
           
        <Row>
          <Col xs={6}>
            <Form.Group className="mb-2">
              <Styled.ProfileLabel>Data de inicio</Styled.ProfileLabel>
              <FormControl
                id="startDate"
                name="startDate"
                type="date"
                onChange={formik.handleChange}            
                isValid={formik.touched.startDate && !formik.errors.startDate}
                isInvalid={formik.errors.startDate} />
              {ValidationStartDateError}
            </Form.Group>
          </Col>
          <Col>
          <Form.Group className="mb-2">
              <Styled.ProfileLabel>Sal??rio</Styled.ProfileLabel>
              <Form.Control
                id="salary"
                name="salary"
                onChange={formik.handleChange}       
                placeholder="3.000,00"     
                isValid={formik.touched.salary && !formik.errors.salary}
                isInvalid={formik.errors.salary}/>
              {ValidationSalaryError}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-2">
          <Styled.ProfileLabel>?? m??dico?</Styled.ProfileLabel>
            <Form.Check type="checkbox" 
              style={{fontSize: '15px'}}
              label="Sim" 
              id="isDoctor"
              name="isDoctor"
              onChange={formik.handleChange} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Styled.ProfileLabel>Especialidade</Styled.ProfileLabel>
          <Styled.ProfileSelect
            id="doctorType"
            name="doctorType"
            onChange={formik.handleChange}            
            isValid={formik.touched.doctorType && !formik.errors.doctorType}
            isInvalid={formik.errors.doctorType}>
              <Styled.ProfileOption>Selecione sua especialidade</Styled.ProfileOption>
              <Styled.ProfileOption value="Cardiologia">Cardiologia</Styled.ProfileOption>
              <Styled.ProfileOption value="Dermatologia">Dermatologia</Styled.ProfileOption>
              <Styled.ProfileOption value="Gastroenterologia">Gastroenterologia</Styled.ProfileOption>
              <Styled.ProfileOption value="Geriatria">Geriatria</Styled.ProfileOption>
              <Styled.ProfileOption value="Ginecologia">Ginecologia e Obstetr??cia</Styled.ProfileOption>
              <Styled.ProfileOption value="Infectologia">Infectologia</Styled.ProfileOption>
              <Styled.ProfileOption value="Neurocirurgia">Neurocirurgia</Styled.ProfileOption>
              <Styled.ProfileOption value="Neurologia">Neurologia</Styled.ProfileOption>
              <Styled.ProfileOption value="Nutrologia">Nutrologia</Styled.ProfileOption>
              <Styled.ProfileOption value="Oftalmologia">Oftalmologia</Styled.ProfileOption>
              <Styled.ProfileOption value="Ortopedia">Ortopedia</Styled.ProfileOption>
              <Styled.ProfileOption value="Otorrinolaringologia">Otorrinolaringologia</Styled.ProfileOption>
              <Styled.ProfileOption value="Pediatria">Pediatria</Styled.ProfileOption>
              <Styled.ProfileOption value="Pneumologia">Pneumologia</Styled.ProfileOption>
              <Styled.ProfileOption value="Psiquiatria">Psiquiatria</Styled.ProfileOption>
              <Styled.ProfileOption value="Radiologia">Radiologia</Styled.ProfileOption>
              <Styled.ProfileOption value="Reumatologia">Reumatologia</Styled.ProfileOption>
              <Styled.ProfileOption value="Urologia">Urologia</Styled.ProfileOption>
          </Styled.ProfileSelect>
        </Form.Group>
        <Form.Group className="mb-2">
          <Styled.ProfileLabel>CRM</Styled.ProfileLabel>
          <Form.Control
            id="crm"
            name="crm"
            placeholder="Digite seu CRM"
            onChange={formik.handleChange}            
            isValid={formik.touched.crm && !formik.errors.crm}
            isInvalid={formik.errors.crm}
          />
        </Form.Group>
        {AppError}
        <Button style={{backgroundColor: '#272343'}} variant="primary" type="submit">
          Cadastrar funcion??rio
        </Button>
      </Form> 
    </Container>
  
  );
  
}


export default CreateEmployee;