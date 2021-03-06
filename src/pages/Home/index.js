import React from 'react';
import Footer from '../../components/Footer';
import { Card, CardGroup, Button } from 'react-bootstrap';
import { Styled } from './styles';

function Home() {
  return (
    <div style={{overflowY: "scroll"}}>
      <Styled.Container>
        <Styled.Box>
          <Styled.Title>Clínica Hope</Styled.Title>
          <Styled.Description>Mais que oferecer assistência completa e segura, a Clínica Hope busca proporcionar conforto e comodidade aos seus clientes e acompanhantes. A Clinica Hope é um complexo de saúde onde você encontra consultórios e clínicas divididos nas diversas especialidades médicas.</Styled.Description>
        </Styled.Box>

        <CardGroup style={{margin: '90px 200px 0 200px'}}>
          <Card style={{padding: '40px', margin: '10px'}}>
            <Card.Body>
              <Card.Title>Missão</Card.Title>
              <Card.Text style={{textAlign: 'justify'}}>
              Atuar com excelência, em benefício da sociedade, na supervisão da ética profissional médica, por meio de ações regulamentadoras, educacionais, fiscalizadoras, judicantes, cartoriais e políticas.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{padding: '40px', margin: '10px'}}>
            <Card.Body>
              <Card.Title>Valores</Card.Title>
              <Card.Text style={{textAlign: 'justify'}}> 
                Ética, justiça, equidade, sustentabilidade, credibilidade, comprometimento com o cliente e interesse público.
              </Card.Text>              
            </Card.Body>
          </Card>
        </CardGroup>

        <div className="row justify-content-center">
          <Styled.Img className="col-10">
            <img 
              src="https://raw.githubusercontent.com/reb-gaia/cefet-clinica-medica/efdd4cf5f8639d03ef85f223b4dc058d4f5184b8/src/assets/undraw_medicine.svg" 
              alt="Icon" 
            />
          </Styled.Img>

          <Button className="col-2 align-self-center" variant="warning" href="/create-schedules">Agendar uma consulta</Button>{' '}
        </div>

      </Styled.Container>

      <Footer />
    </div>
  )
}

export default Home;