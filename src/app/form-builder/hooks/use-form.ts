// Hooks
import useFormEditor from './use-form-editor';
import useFormEditorStore from './use-form-editor-store';

import { EndStep, InputType, QuestionStep, WelcomeStep } from '@/types/form.types';

function useForm() {
  const { setActiveStep } = useFormEditor();
  const form = useFormEditorStore((state) => state.form);
  // const setForm = useFormEditorStore((state) => state.setForm);
  // const addStep = useFormEditorStore((state) => state.addStep);

  const addStep = (inputType: InputType) => {
    console.log('field', inputType);
    // Add the new step to the form
  };

  const removeStep = (stepId: string) => {
    console.log('fieldId', stepId);
  };

  const editWelcomeStep = (step: Omit<WelcomeStep, 'type'>) => {
    //
  };

  const editStep = (stepId: string, step: Omit<QuestionStep, 'type'>) => {
    console.log('stepId', stepId, 'config', step);
  };

  const editEndStep = (step: Omit<EndStep, 'type'>) => {};

  const editConfig = (step: any) => {};

  return { form, addStep, removeStep, editConfig };
}

export default useForm;
