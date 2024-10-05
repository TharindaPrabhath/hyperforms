'use client';

import WelcomeStep from './components/welcome-step';
import QuestionStep from './components/question-step';
import EndStep from './components/end-step';

import useFormEditorStore from '@/hooks/use-form-editor-store';

function Form() {
  const activeStep = useFormEditorStore((state) => state.form.activeStep);
  const form = useFormEditorStore((state) => state.form);
  let step = form.steps.find((step) => step.id === activeStep.id);
  if (!step) step = form.steps.find((step) => step.type === 'welcome');

  if (step?.type === 'welcome') return <WelcomeStep />;

  if (step?.type === 'question') return <QuestionStep />;

  if (step?.type === 'end') return <EndStep />;

  return <div></div>;
}

export default Form;
