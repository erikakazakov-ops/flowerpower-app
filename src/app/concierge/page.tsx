import type { Metadata } from 'next';
import ConciergeClient from './ConciergeClient';

export const metadata: Metadata = {
  title: 'Lillenõustaja – FlowerPower',
  description: 'Isikupärastatud lillekogemus, loodud just sulle.',
};

export default function ConciergePage() {
  return <ConciergeClient />;
}
