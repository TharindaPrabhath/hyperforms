import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Watermark from '@/components/watermark';

import useFormEditorStore from '@/hooks/use-form-editor-store';

import { QuestionStep as _QuestionStep } from '@/types/form.types';

function QuestionStep() {
  const [answer, setAnswer] = useState('');

  const activeStep = useFormEditorStore((state) => state.form.activeStep) as _QuestionStep;
  const form = useFormEditorStore((state) => state.form);
  const step = form.steps.find((step) => step.id === activeStep.id) as _QuestionStep;
  const setActiveStep = useFormEditorStore((state) => state.setActiveStep);

  const handleNext = () => {
    if (step.inputType === 'email') {
      // Add email validation
      const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
      const passed = regex.test(answer);
      if (!passed) {
        alert('Please enter a valid email address');
        return;
      }
      setAnswer('');
      setActiveStep(form.steps[step.index + 1]);
    }

    if (step.isRequired && !answer) {
      alert('Please enter your answer');
      return;
    }

    setAnswer('');
    setActiveStep(form.steps[step.index + 1]);
  };

  return (
    <div className={`relative flex flex-col lg:flex-row items-center justify-center gap-20 bg-slate-100 h-screen rounded-2xl p-4`}>
      <div className="flex-col items-start justify-center w-full max-w-3xl mx-auto">
        <h3 className="scroll-m-20 text-2xl font-bold tracking-tight">{step?.title}</h3>
        <p className="leading-7 text-lg">{step?.description}</p>
        <Input
          type={step.inputType}
          className="mt-4 border-y-0 border-x-0 outline-none shadow-none border-b-2 w-full focus:border-none focus:outline-none"
          placeholder="Type your answer here"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button className="rounded-full mt-4" onClick={handleNext}>
          Next
        </Button>
      </div>

      <Watermark />
    </div>
  );
}

export default QuestionStep;
