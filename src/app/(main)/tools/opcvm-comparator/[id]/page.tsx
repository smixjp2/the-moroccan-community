import { notFound } from 'next/navigation';
import { opcvmData } from '@/lib/data';
import OpcvmDetailClient from './opcvm-detail-client';
import type { Opcvm } from '@/lib/types';

export function generateStaticParams() {
  return opcvmData.map((opcvm) => ({
    id: opcvm.id,
  }));
}

const getOpcvmData = (id: string): Opcvm | undefined => {
    return opcvmData.find((o) => o.id === id);
}

export default function OpcvmDetailPage({ params }: { params: { id: string } }) {
  const opcvm = getOpcvmData(params.id);

  if (!opcvm) {
    notFound();
  }

  return <OpcvmDetailClient opcvm={opcvm} />;
}
