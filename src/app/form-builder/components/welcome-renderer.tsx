'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { RendererInput } from '@/components/ui/renderer-input';

import useFormEditorStore from '../hooks/use-form-editor-store';

import { Editable, WelcomeStep } from '@/types/form.types';

function WelcomeRenderer() {
  const activeStep = useFormEditorStore((state) => state.form.activeStep) as WelcomeStep;
  const form = useFormEditorStore((state) => state.form);
  const step = form.steps.find((step) => step.id === activeStep.id) as WelcomeStep;
  const editStep = useFormEditorStore((state) => state.editStep);

  const handleOnChange = (editable: Editable) => {
    editStep(activeStep.id, editable);
  };

  console.log(step);

  return (
    <div className={`shadow-lg flex flex-col lg:flex-row items-center justify-center gap-20 bg-slate-100 h-full rounded-2xl p-4`}>
      <div className="max-w-xl flex-col items-center justify-center">
        <RendererInput variant="h1" value={step.title} onChange={(e) => handleOnChange({ title: e.target.value })} />
        <RendererInput variant="p" value={step.description} onChange={(e) => handleOnChange({ description: e.target.value })} />
        <Button className="mt-4 rounded-full">{step.button.text}</Button>
      </div>
      <div>
        <Image src={step.image?.url!} alt={step.title} width={500} height={500} />
      </div>
    </div>
  );
}

export default WelcomeRenderer;
