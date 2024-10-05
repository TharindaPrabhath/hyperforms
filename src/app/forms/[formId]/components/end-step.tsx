import Watermark from '@/components/watermark';
import { Button } from '@/components/ui/button';

import useFormEditorStore from '@/hooks/use-form-editor-store';

import { EndStep as _EndStep } from '@/types/form.types';

function EndStep() {
  const activeStep = useFormEditorStore((state) => state.form.activeStep) as _EndStep;
  const form = useFormEditorStore((state) => state.form);
  const step = form.steps.find((step) => step.id === activeStep.id) as _EndStep;
  const setActiveStep = useFormEditorStore((state) => state.setActiveStep);

  const handleSubmit = () => {
    alert('Form submitted!');
    setActiveStep(form.steps[0]);
  };

  return (
    <div className={`relative flex flex-col lg:flex-row items-center justify-center gap-20 bg-slate-100 h-screen rounded-2xl p-4`}>
      <div className="flex-col items-center justify-center">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">{step?.title}</h1>
        <p className="leading-7 text-lg">{step?.description}</p>
        <Button className="mt-4 rounded-full" onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      <Watermark />
    </div>
  );
}

export default EndStep;
