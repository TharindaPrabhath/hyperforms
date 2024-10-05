'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Components
import { Button } from '@/components/ui/button';
import CreateFormModal, { CreateFormProps } from '@/components/create-form-modal';

import useFormEditorStore from '@/hooks/use-form-editor-store';

export default function Home() {
  const router = useRouter();

  const [openCreateFormModal, setOpenCreateFormModal] = useState(false);

  const changeFormName = useFormEditorStore((state) => state.changeFormName);

  const handleCreateForm = (props: CreateFormProps) => {
    changeFormName(props.name);
    setOpenCreateFormModal(false);
    router.push('/form-builder');
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
