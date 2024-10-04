'use client';

import Image from 'next/image';

// Components
import { Button } from '@/components/ui/button';
import CreateFormModal from '@/components/create-form-modal';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <Image src="/logo.png" alt="Logo" width={200} height={80} />
      <h1 className="text-5xl font-semibold">Welcome to HyperForms</h1>
      <p>A form builder for everyone.</p>
      <Button>Create a new form</Button>
      <CreateFormModal open={true} loading={false} onSubmit={() => {}} onClose={() => {}} />
    </div>
  );
}
