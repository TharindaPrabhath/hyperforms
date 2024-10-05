import Image from 'next/image';

import { Button } from '@/components/ui/button';

import useFormEditorStore from '@/hooks/use-form-editor-store';

import { WelcomeStep as _WelcomeStep } from '@/types/form.types';

function WelcomeStep() {
  const activeStep = useFormEditorStore((state) => state.form.activeStep) as _WelcomeStep;
  const form = useFormEditorStore((state) => state.form);
  const step = form.steps.find((step) => step.id === activeStep.id) as _WelcomeStep;
  const setActiveStep = useFormEditorStore((state) => state.setActiveStep);

  return (
    <div className={`flex flex-col lg:flex-row items-center justify-center gap-20 bg-slate-100 h-screen rounded-2xl p-4`}>
      <div className="max-w-xl flex-col items-center justify-center">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">{step?.title}</h1>
        <p className="leading-7 text-lg">{step?.description}</p>
        <Button
          className="mt-4 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            setActiveStep(form.steps[1]);
          }}
        >
          {step?.button?.text}
        </Button>
      </div>
      <div>
        <Image src={step.image?.url!} alt={step.title} width={500} height={500} />
      </div>
    </div>
  );
}

export default WelcomeStep;
