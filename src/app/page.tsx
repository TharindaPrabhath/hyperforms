'use client';

import { useState } from 'react';

import Image from 'next/image';

// Components
import { Button } from '@/components/ui/button';
import CreateFormModal, { CreateFormProps } from '@/components/create-form-modal';

export default function Home() {
  const [openCreateFormModal, setOpenCreateFormModal] = useState(false);

  const handleCreateForm = (props: CreateFormProps) => {
    console.log('Create form', props);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <Image src="/logo.png" alt="Logo" width={200} height={80} />
      <h1 className="text-5xl text-center font-semibold">Welcome to HyperForms</h1>
      <p className="text-lg text-center">A form builder for everyone.</p>
      <Button onClick={() => setOpenCreateFormModal(true)}>Create a new form</Button>
      <CreateFormModal open={openCreateFormModal} loading={false} onSubmit={handleCreateForm} onClose={() => setOpenCreateFormModal(false)} />
    </div>
  );
}
