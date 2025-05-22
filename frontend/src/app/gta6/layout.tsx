import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grand Theft Auto VI - Fandom',
  description: 'Explore tudo sobre Grand Theft Auto VI - Leonida, Vice City, Lucia e Jason',
};

export default function GTA6Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-black/90">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none"></div>
      {children}
    </div>
  );
} 