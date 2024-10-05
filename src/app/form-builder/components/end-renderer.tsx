import Watermark from '@/components/watermark';
import { RendererInput } from '@/components/ui/renderer-input';

import useFormEditorStore from '@/hooks/use-form-editor-store';

import { Editable, EndStep } from '@/types/form.types';

function EndRenderer() {
  const activeStep = useFormEditorStore((state) => state.form.activeStep) as EndStep;
  const form = useFormEditorStore((state) => state.form);
  const step = form.steps.find((step) => step.id === activeStep.id) as EndStep;
  const editStep = useFormEditorStore((state) => state.editStep);

  const handleOnChange = (editable: Editable) => {
    editStep(activeStep.id, editable);
  };

  return (
    <div className={`relative shadow-lg flex flex-col lg:flex-row items-center justify-center gap-20 bg-slate-100 h-full rounded-2xl p-4`}>
      <div className="flex-col items-center justify-center">
        <RendererInput variant="h1" value={step.title} onChange={(e) => handleOnChange({ title: e.target.value })} />
        <RendererInput variant="p" value={step.description} onChange={(e) => handleOnChange({ description: e.target.value })} />
      </div>

      <Watermark />
    </div>
  );
}

export default EndRenderer;
