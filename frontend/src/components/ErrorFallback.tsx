import React from 'react';
import styled from 'styled-components';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background-color: #f8f9fa;
`;

const IconWrapper = styled.div`
  color: #dc3545;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 2rem;
  max-width: 500px;
  line-height: 1.6;
`;

const ErrorDetails = styled.details`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  border: 1px solid #e9ecef;
  text-align: left;
  max-width: 600px;
  
  summary {
    cursor: pointer;
    font-weight: 600;
    color: #495057;
    margin-bottom: 0.5rem;
  }
  
  pre {
    color: #dc3545;
    font-size: 0.875rem;
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

const RetryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #0057d9;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #0048b1;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  const handleRefresh = () => {
    resetErrorBoundary();
    window.location.reload();
  };

  return (
    <Container>
      <IconWrapper>
        <AlertTriangle size={64} />
      </IconWrapper>
      
      <Title>Ops! Algo deu errado</Title>
      
      <Description>
        Ocorreu um erro inesperado em nossa aplicação. Nossa equipe foi notificada 
        e está trabalhando para resolver o problema. Tente recarregar a página ou 
        entre em contato conosco se o problema persistir.
      </Description>
      
      <ErrorDetails>
        <summary>Detalhes técnicos do erro</summary>
        <pre>{error.message}</pre>
        {error.stack && (
          <pre>{error.stack}</pre>
        )}
      </ErrorDetails>
      
      <RetryButton onClick={handleRefresh}>
        <RefreshCw size={20} />
        Tentar novamente
      </RetryButton>
    </Container>
  );
}; 