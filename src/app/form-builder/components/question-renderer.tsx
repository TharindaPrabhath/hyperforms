import Watermark from '@/components/watermark';
import { Input } from '@/components/ui/input';
import { RendererInput } from '@/components/ui/renderer-input';

import useFormEditorStore from '@/hooks/use-form-editor-store';

import { Editable, QuestionStep } from '@/types/form.types';

function QuestionRenderer() {
  const activeStep = useFormEditorStore((state) => state.form.activeStep) as QuestionStep;
  const form = useFormEditorStore((state) => state.form);
  const step = form.steps.find((step) => step.id === activeStep.id) as QuestionStep;
  const editStep = useFormEditorStore((state) => state.editStep);

  const handleOnChange = (editable: Editable) => {
    editStep(activeStep.id, editable);
  };

  return (
    <div className={`relative shadow-lg flex flex-col items-start justify-center gap-20 bg-slate-100 h-full rounded-2xl p-4`}>
      <div className="flex-col items-start justify-center w-full max-w-3xl mx-auto">
        <RendererInput variant="h3" value={step?.title} onChange={(e) => handleOnChange({ title: e.target.value })} />
        <RendererInput variant="p" value={step?.description} onChange={(e) => handleOnChange({ description: e.target.value })} />
        <Input className="mt-4 border-y-0 border-x-0 outline-none shadow-none border-b-2 w-full focus:border-none focus:outline-none" placeholder="Type your answer here" />
      </div>

      <Watermark />
    </div>
  );
}

export default QuestionRenderer;
