import React from 'react';
import styled from 'styled-components';
import { Search, Users, Star, Shield } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0057d9 0%, #0041a3 100%);
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  
  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Hero = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  color: white;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 600px;
  opacity: 0.9;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  width: 100%;
  max-width: 500px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }
`;

const SearchButton = styled.button`
  padding: 1rem 2rem;
  background: #ff8c00;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #ff6b00;
    transform: translateY(-1px);
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Feature = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  backdrop-filter: blur(10px);
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1rem 0 0.5rem;
  }
  
  p {
    opacity: 0.9;
    line-height: 1.6;
  }
`;

const IconWrapper = styled.div`
  display: inline-flex;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-bottom: 1rem;
`;

export const HomePage: React.FC = () => {
  return (
    <Container>
      <Header>
        <Logo>🤝 MãoNaMassa</Logo>
        <Nav>
          <a href="/buscar">Buscar Profissionais</a>
          <a href="/auth/login">Entrar</a>
          <a href="/auth/cadastro">Cadastrar</a>
        </Nav>
      </Header>

      <Hero>
        <Title>Conectando Profissionais a Clientes</Title>
        <Subtitle>
          Encontre profissionais qualificados ou ofereça seus serviços na maior plataforma de Catalão-GO
        </Subtitle>

        <SearchContainer>
          <SearchInput 
            type="text" 
            placeholder="Buscar por serviço ou profissional..."
          />
          <SearchButton>
            <Search size={20} />
            Buscar
          </SearchButton>
        </SearchContainer>

        <Features>
          <Feature>
            <IconWrapper>
              <Search size={24} />
            </IconWrapper>
            <h3>Encontre Facilmente</h3>
            <p>Busque por categoria, localização ou avaliação. Nossa plataforma conecta você ao profissional ideal.</p>
          </Feature>

          <Feature>
            <IconWrapper>
              <Shield size={24} />
            </IconWrapper>
            <h3>Pagamento Seguro</h3>
            <p>Sistema de escrow protege tanto clientes quanto profissionais. Pagamento só é liberado após confirmação.</p>
          </Feature>

          <Feature>
            <IconWrapper>
              <Star size={24} />
            </IconWrapper>
            <h3>Avaliações Reais</h3>
            <p>Sistema de avaliações transparente ajuda você a escolher os melhores profissionais.</p>
          </Feature>

          <Feature>
            <IconWrapper>
              <Users size={24} />
            </IconWrapper>
            <h3>Comunidade Local</h3>
            <p>Focado em Catalão-GO, fortalecendo a economia local e criando conexões duradouras.</p>
          </Feature>
        </Features>
      </Hero>
    </Container>
  );
}; 