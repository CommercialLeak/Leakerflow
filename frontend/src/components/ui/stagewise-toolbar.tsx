'use client';

import dynamic from 'next/dynamic';

// Importação dinâmica do StagewiseToolbar apenas em ambiente de desenvolvimento
const StagewiseComponent = dynamic(
  () => import('@stagewise/toolbar-next').then((mod) => mod.StagewiseToolbar),
  { ssr: false }
);

// Configuração básica para o Stagewise
const stagewiseConfig = {
  plugins: []
};

export function StagewiseToolbar() {
  // Renderizar apenas em ambiente de desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return <StagewiseComponent config={stagewiseConfig} />;
} 