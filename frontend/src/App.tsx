import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Páginas
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <>
      <Helmet>
        <title>MãoNaMassa - Conectando Profissionais Autônomos</title>
        <meta name="description" content="Encontre profissionais qualificados ou ofereça seus serviços na plataforma MãoNaMassa" />
        <meta name="keywords" content="profissionais, autônomos, serviços, Catalão, Goiás" />
        <meta property="og:title" content="MãoNaMassa - Conectando Profissionais Autônomos" />
        <meta property="og:description" content="Encontre profissionais qualificados ou ofereça seus serviços na plataforma MãoNaMassa" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maonamassa.com" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MãoNaMassa - Conectando Profissionais Autônomos" />
        <meta name="twitter:description" content="Encontre profissionais qualificados ou ofereça seus serviços na plataforma MãoNaMassa" />
        <meta name="twitter:image" content="/og-image.jpg" />
      </Helmet>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </>
  );
}

export default App; 